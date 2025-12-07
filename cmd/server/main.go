package main

import (
	"fmt"
	"go-react-demo/internal/server"
	"os"

	"github.com/spf13/cobra"
)

var rootCmd = &cobra.Command{
	Use:   "go-react-demo",
	Short: "Go React Demo Application",
	Long:  `A full-stack demo application with Go backend and React frontend.`,
}

var serveCmd = &cobra.Command{
	Use:   "serve",
	Short: "Start the API server",
	Long:  `Start the HTTP server with the API and frontend.`,
	Run: func(cmd *cobra.Command, args []string) {
		port, _ := cmd.Flags().GetString("port")
		server.Start(port)
	},
}

func init() {
	serveCmd.Flags().StringP("port", "p", "8080", "Port to run the server on")
	rootCmd.AddCommand(serveCmd)
}

func main() {
	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}