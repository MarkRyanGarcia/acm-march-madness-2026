package main

import (
	"bytes"
	"cmp"
	"encoding/json"
	"flag"
	"fmt"
	"log"
	"net/http"
	"os"
	"slices"
	"strconv"
	"strings"
	"time"

	"github.com/joho/godotenv"
)

type Embed struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	URL         string `json:"url"`
	Color       int    `json:"color"`
}

type WebhookPayload struct {
	Content string  `json:"content"`
	Embeds  []Embed `json:"embeds"`
}

type ProblemInfo struct {
	Title       string
	Description string
}

// getProblem makes a request to the /problem/:day endpoint and returns the
// content of the problem as a string. Only Part 1 is available for
// unauthenticated users.
func getProblem(apiURL string, day int) (string, error) {
	resp, err := http.Get(apiURL + "/problems/" + strconv.Itoa(day))
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	type ProblemResponse struct {
		Problem string `json:"part1"`
	}

	problemResponse := ProblemResponse{}
	if err := json.NewDecoder(resp.Body).Decode(&problemResponse); err != nil {
		return "", err
	}

	return problemResponse.Problem, nil
}

// parseProblem parses the title and description of a problem if successful.
func parseProblem(problem string) (string, string) {
	titleLine, _, _ := strings.Cut(problem, "\n\n")
	title := strings.TrimPrefix(titleLine, "# ")
	_, description, _ := strings.Cut(problem, "## Part One\n\n")
	return title, description
}

type TeamPointsEntry struct {
	TeamName    string  `json:"team_name"`
	TotalPoints float64 `json:"total_points"`
}

// getLeaderboard makes a request to the /leaderboard endpoint and returns the
// result, sorted based on team points first, and the team name second.
func getLeaderboard(apiURL string) ([]TeamPointsEntry, error) {
	resp, err := http.Get(apiURL + "/leaderboard")
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	leaderboard := []TeamPointsEntry{}

	if err := json.NewDecoder(resp.Body).Decode(&leaderboard); err != nil {
		return nil, err
	}

	slices.SortFunc(leaderboard, func(a, b TeamPointsEntry) int {
		if c := cmp.Compare(b.TotalPoints, a.TotalPoints); c != 0 {
			return c
		}
		return cmp.Compare(a.TeamName, b.TeamName)
	})

	return leaderboard, nil
}

// generateLeaderboardString generates a string from the leaderboard data
// that will be rendered as Markdown in the Discord Embed message
func generateLeaderboardString(leaderboard []TeamPointsEntry) string {
	maxTeams, maxWidth := 10, 20
	for i, t := range leaderboard {
		if i == maxTeams {
			break
		}
		maxWidth = max(maxWidth, len(t.TeamName))
	}

	var builder strings.Builder
	builder.WriteString("### Leaderboard\n```\n")

	medals := []string{"🥇", "🥈", "🥉"}
	for i, team := range leaderboard {
		if i == maxTeams { // Only show the top 10 teams
			break
		}
		if i < 3 {
			builder.WriteString(medals[i] + " ")
		}
		fmt.Fprintf(&builder, "%-*s %.2f\n", maxWidth+2, team.TeamName, team.TotalPoints)
	}
	builder.WriteString("```\n[Sign in and create/join a team to participate!](<https://madness.acmcsuf.com/>)\n")

	return builder.String()
}

func main() {
	dayFlag := flag.Int("day", -1, "Override the challenge day (within the range 0 - 5)")
	reminder := flag.Bool("reminder", false, "Send the reminder message")
	flag.Parse()

	day := *dayFlag
	if day == -1 {
		day = int(time.Now().Weekday())
	}

	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Unabled to load .env: %v", err)
	}
	webhookURL := os.Getenv("WEBHOOK_URL")
	apiURL := os.Getenv("API_URL")

	payload := WebhookPayload{
		Content: "The new daily challenge will be releasing soon. Please stay tuned!",
	}

	if !*reminder {
		problem, err := getProblem(apiURL, day)
		if err != nil {
			log.Fatalf("Problem request failed: %v", err)
		}
		leaderboard, err := getLeaderboard(apiURL)
		if err != nil {
			log.Fatalf("Leaderboard request failed: %v", err)
		}

		title, description := parseProblem(problem)
		leaderboardStr := generateLeaderboardString(leaderboard)

		payload = WebhookPayload{
			Embeds: []Embed{
				{
					Title:       title,
					Description: description + "---\n" + leaderboardStr,
					URL:         fmt.Sprintf("https://madness.acmcsuf.com/problems/%d", day),
					Color:       0xB0F2B4,
				},
			},
		}
	}

	jsonPayload, _ := json.Marshal(payload)

	req, err := http.NewRequest("POST", webhookURL, bytes.NewBuffer(jsonPayload))
	if err != nil {
		log.Fatalf("Unabled to create webhook request: %v", req)
	}

	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)

	if err != nil {
		log.Fatalf("Failed to send webhook message: %v", err)
	}
	defer resp.Body.Close()

	log.Println("Successfully sent Discord Webhook message")
}
