package main

import (
	"context"
	"encoding/json"
	"log"
	"net"
	"net/http"
	"sort"

	pricing "github.com/wattx/backend/pricing"
	pb "github.com/wattx/backend/proto"
	"google.golang.org/grpc"
)

const (
	port = ":50051"
)

// server is used to implement helloworld.GreeterServer.
type server struct{}

var ranking = map[string]pricing.AssetValue{}

func (s *server) UpdateAsset(ctx context.Context, data *pb.Data) (*pb.Reply, error) {
	log.Printf("Received: %v", data.Data)
	for _, value := range data.Data {
		ranking[value.Key] = pricing.AssetValue{
			Key:   value.Key,
			Value: value.Value,
		}
	}
	return &pb.Reply{Status: "OK"}, nil
}

func handler(w http.ResponseWriter, r *http.Request) {
	assetValues := make([]pricing.AssetValue, len(ranking))
	for _, value := range ranking {
		assetValues = append(assetValues, value)
	}
	sort.Slice(assetValues,
		func(i, j int) bool {
			return assetValues[j].Value < assetValues[i].Value
		},
	)

	rankingJson, err := json.MarshalIndent(assetValues[:200], "", " ")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(rankingJson)
}

func main() {

	http.HandleFunc("/data", handler)
	go http.ListenAndServe(":8888", nil)

	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterGreeterServer(s, &server{})
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
