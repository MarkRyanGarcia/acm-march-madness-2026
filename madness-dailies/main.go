package main

import (
	"bytes"
	"cmp"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"slices"
	"strconv"

	"github.com/joho/godotenv"
)

type Embed struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	URL         string `json:"url"`
	Color       int    `json:"color"`
}

type WebhookPayload struct {
	Embeds []Embed `json:"embeds"`
}

type ProblemInfo struct {
	Title       string
	Description string
}

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

type TeamPointsEntry struct {
	TeamName    string  `json:"team_name"`
	TotalPoints float64 `json:"total_points"`
}

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

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Unabled to load .env: %v", err)
	}
	webhookURL := os.Getenv("WEBHOOK_URL")
	apiURL := os.Getenv("API_URL")

	problem, err := getProblem(apiURL, 0)
	if err != nil {
		log.Fatalf("Problem request failed: %v", err)
	}
	leaderboard, err := getLeaderboard(apiURL)
	if err != nil {
		log.Fatalf("Leaderboard request failed: %v", err)
	}

	log.Println(problem, leaderboard)

	payload := WebhookPayload{
		Embeds: []Embed{
			{
				Title: "New Daily Challenge",
				Description: "New March Madness daily challenge dropped bro\n" +
					"```This is a code block?```",
				URL:   "https://chom.vercel.app",
				Color: 0xB0F2B4,
			},
		},
	}
	jsonPayload, _ := json.Marshal(payload)
	log.Printf("%s\n", jsonPayload)

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

	log.Println("Status:", resp.Status)
}
