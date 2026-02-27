package main

import (
	"bytes"
	"encoding/json"
	"log"
	"net/http"
	"os"

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

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Unabled to load .env: %v", err)
	}
	webhookURL := os.Getenv("WEBHOOK_URL")

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
