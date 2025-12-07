package cmd

import (
	"encoding/json"
	"fmt"
	"net/http"
	"os"
	"time"

	"github.com/spf13/cobra"
)

var healthCmd = &cobra.Command{
	Use:   "health",
	Short: "Check the health of the API server",
	Long:  `Performs a health check by querying the /api/health endpoint.`,
	Run: func(cmd *cobra.Command, args []string) {
		port, _ := cmd.Flags().GetString("port")
		url := fmt.Sprintf("http://localhost:%s/api/health", port)

		client := &http.Client{
			Timeout: 5 * time.Second,
		}

		resp, err := client.Get(url)
		if err != nil {
			fmt.Printf("Health check failed: %v\n", err)
			os.Exit(1)
		}
		defer resp.Body.Close()

		if resp.StatusCode != http.StatusOK {
			fmt.Printf("Health check failed: HTTP %d\n", resp.StatusCode)
			os.Exit(1)
		}

		var result map[string]interface{}
		if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
			fmt.Printf("Failed to parse response: %v\n", err)
			os.Exit(1)
		}

		fmt.Println("Server is healthy!")
		fmt.Printf("Status: %v\n", result["status"])
		if serverTime, ok := result["time"].(string); ok {
			parsedTime, err := time.Parse(time.RFC3339Nano, serverTime)
			if err == nil {
				fmt.Printf("Server Time: %s\n", parsedTime.Format(time.RFC1123))
			} else {
				fmt.Printf("Server Time: %v\n", result["time"])
			}
		}
	},
}

func init() {
	healthCmd.Flags().StringP("port", "p", "8080", "Port where the server is running")
}
