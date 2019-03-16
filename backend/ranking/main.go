package main

import (
	"context"
	"log"
	"net"

	pb "github.com/wattx/backend/proto"
	"google.golang.org/grpc"
)

const (
	port = ":50051"
)

// server is used to implement helloworld.GreeterServer.
type server struct{}

func (s *server) UpdateAsset(ctx context.Context, in *pb.Conversion) (*pb.Reply, error) {
	log.Printf("Received: %v", in.Data)
	return &pb.Reply{Status: "OK "}, nil
}

func main() {
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
