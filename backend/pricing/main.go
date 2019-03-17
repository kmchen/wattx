package pricing

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"sort"
	"strings"
	"time"

	pb "github.com/wattx/backend/proto"
	"google.golang.org/grpc"
)

const (
	address      = "localhost:50051"
	topAssetsUrl = "https://min-api.cryptocompare.com/data/top/volumes?tsym=USD&limit=500"
	currencyUrl  = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=%s"

	assetUpdateTime = 60 * time.Second
	batchSize       = 20
)

var headers = map[string]string{
	"X-CMC_PRO_API_KEY": "101f8864-41d9-4223-9f32-effa9b886491",
}

var DefaultClient = &http.Client{}

func httpGet(url string, headers map[string]string) ([]byte, error) {
	// Init new request
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		fmt.Printf("Fail to create request, %v\n", err)
		return nil, err
	}
	// Add header
	if headers != nil {
		for k, v := range headers {
			req.Header.Add(k, v)
		}
	}
	// Send out request
	resp, err := DefaultClient.Do(req)
	if err != nil {
		fmt.Printf("Fail to send request %v\n", err)
		return nil, err
	}
	defer resp.Body.Close()
	// Read response body
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	return body, err
}

func getTopAssets(topAssetsChan chan []string) {
	ticker := time.NewTicker(assetUpdateTime)
	t := time.Time{}
	for ; true; t = <-ticker.C {
		// Fetching top 500
		fmt.Printf("Fetching top 200 assets %v\n", t)
		resp, err := httpGet(topAssetsUrl, nil)
		if err != nil {
			fmt.Printf("Fail to fetch top asset: %v\n", err)
		}
		// Unmarshal Asset data
		crypto := Crypto{}
		if err := json.Unmarshal(resp, &crypto); err != nil {
			fmt.Printf("Fail to unmarshal assets: %v\n", err)
		}

		// Sort by volume
		sort.Slice(crypto.Data,
			func(i, j int) bool {
				return crypto.Data[j].Volume24hourto < crypto.Data[i].Volume24hourto
			},
		)
		var topAssets = make([]string, 200)
		var j = 0
		for i := 0; i < len(crypto.Data) && j < len(topAssets); i += 1 {
			if isWhiteListed(crypto.Data[i].Symbol) {
				topAssets[j] = crypto.Data[i].Symbol
				j += 1
			}
		}
		fmt.Printf("Top assets size: %v\n", topAssets)
		topAssetsChan <- topAssets
	}
}

func getAssetValue(topAssetsChan chan []string, assetDoneChan chan Conversion) {
	for topAssets := range topAssetsChan {
		for i := 0; i < len(topAssets); i += batchSize {
			assets := topAssets[i : i+batchSize]
			assetsStr := strings.Join(assets, ",")
			fmt.Printf("url: %s\n", assetsStr, batchSize)
			go func(symbols string, done chan Conversion) {
				var url = fmt.Sprintf(currencyUrl, symbols)
				var resp, err = httpGet(url, headers)
				if err != nil {
					fmt.Println("error:", err)
					return
				}
				conversion, err := UnmarshalConversion(resp)
				if err != nil {
					return
				}
				done <- conversion
			}(assetsStr, assetDoneChan)
		}
	}
}

func main() {
	topAssetsChan := make(chan []string)
	assetValueDoneChan := make(chan Conversion)
	go getAssetValue(topAssetsChan, assetValueDoneChan)
	go getTopAssets(topAssetsChan)

	// Set up a connection to the server.
	conn, err := grpc.Dial(address, grpc.WithInsecure())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()
	c := pb.NewGreeterClient(conn)

	for value := range assetValueDoneChan {
		ctx, cancel := context.WithTimeout(context.Background(), time.Second)
		pbData := toProtoConversion(value)
		r, err := c.UpdateAsset(ctx, &pbData)
		if err != nil {
			log.Fatalf("could not greet: %v", err)
		}
		log.Printf("Greeting: %s", r.Status)
		cancel()
	}
}
