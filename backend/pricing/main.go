package main

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

type Data struct {
	Symbol         string  `json:"symbol"`
	Volume24hourto float32 `json:"Volume24hourto"`
}

type Crypto struct {
	Data []Data
}

type Conversion struct {
	Data map[string]Currency
}

type Currency struct {
	Quote  map[string]Price `json: "quote"`
	Symbol string           `json: "symbol"`
}

type Price struct {
	Price float32 `json: "price"`
}

const topAssetsUrl = "https://min-api.cryptocompare.com/data/top/volumes?tsym=USD&limit=500"
const currencyUrl = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=%s"

var headers = map[string]string{
	"X-CMC_PRO_API_KEY": "101f8864-41d9-4223-9f32-effa9b886491",
}

const assetUpdateTime = 60 * time.Second
const batchSize = 10

func isWhiteListed(asset string) bool {
	for _, v := range whiteList {
		if v == asset {
			return true
		}
	}
	return false
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
				conversion := Conversion{}
				err = json.Unmarshal(resp, &conversion)
				if err != nil {
					fmt.Println("error:", err)
					return
				}
				done <- conversion
			}(assetsStr, assetDoneChan)
		}
	}
}

const (
	address     = "localhost:50051"
	defaultName = "world"
)

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
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()

	for value := range assetValueDoneChan {
		fmt.Printf("%v\n", value)
		pbPrice := pb.Price{
			Price: float32(1.1),
		}
		pbQuote := map[string]*pb.Price{
			"USD": &pbPrice,
		}
		pbCurrency := pb.Currency{
			Quote:  pbQuote,
			Symbol: "hello",
		}
		pbData := map[string]*pb.Currency{
			"hello": &pbCurrency,
		}
		pbConversion := pb.Conversion{
			Data: pbData,
		}
		r, err := c.UpdateAsset(ctx, &pbConversion)
		if err != nil {
			log.Fatalf("could not greet: %v", err)
		}
		log.Printf("Greeting: %s", r.Status)
	}
}

var whiteList = []string{
	"LTC",
	"XRP",
	"EOS",
	"BCH",
	"ETH",
	"BTC",
	"TX",
	"EL",
	"HB",
	"XBTC21",
	"CLOAK",
	"LINDA",
	"YOYOW",
	"SPANK",
	"SNGLS",
	"WAVES",
	"TRUMP",
	"USNBT",
	"WOMEN",
	"XSPEC",
	"STORJ",
	"VOISE",
	"UCASH",
	"THETA",
	"UNIFY",
	"VIDZ",
	"TELL",
	"TOKC",
	"TIME",
	"UNIT",
	"VERI",
	"VEC2",
	"UTNP",
	"UBTC",
	"VOLT",
	"VPRC",
	"WINK",
	"WISH",
	"XCXT",
	"XAUR",
	"QBIC",
	"DEEX",
	"ZENI",
	"XSTC",
	"XPTX",
	"ZEIT",
	"ZIPT",
	"NOAH",
	"MSCN",
	"BRIA",
	"HTML",
	"CMCT",
	"PLBT",
	"PIRL",
	"BTCZ",
	"EURS",
	"USDC",
	"TRST",
	"TUBE",
	"AION",
	"DASC",
	"BCPT",
	"ELEC",
	"NEXO",
	"CTXC",
	"QASH",
	"CCRB",
	"MANA",
	"IOST",
	"DATA",
	"GUSD",
	"ECTE",
	"TUSD",
	"MITH",
	"DOGE",
	"DGTX",
	"USDT",
	"DASH",
	"QTUM",
	"XLM",
	"BTG",
	"NEO",
	"ETC",
	"ZEC",
	"XMR",
	"ZRX",
	"REP",
	"B2G",
	"BSV",
	"DAI",
	"ADA",
	"OMG",
	"TRX",
	"ETP",
	"BTW",
	"MGO",
	"EDO",
	"ORS",
	"BNB",
	"XTZ",
	"NIO",
	"ADK",
	"PZM",
	"VEE",
	"BCA",
	"XEM",
	"SAN",
	"GNT",
	"INT",
	"LSK",
	"FUN",
	"VEX",
	"VET",
	"RIF",
	"GAS",
	"ODE",
	"ENJ",
	"WAX",
	"PAX",
	"GNO",
	"EDG",
	"BTT",
	"CPC",
	"BAT",
	"AGI",
	"MNX",
	"MKR",
	"BCI",
	"RLC",
	"TDS",
	"EMC",
	"CCL",
	"KNC",
	"DIG",
	"AVT",
	"DGX",
	"XVG",
	"AUC",
	"RCN",
	"BCD",
	"ATB",
	"INK",
	"ELF",
	"ZIL",
	"LKK",
	"LEO",
	"AID",
	"DXT",
	"DIM",
	"DTH",
	"DGB",
	"STQ",
	"TNB",
	"MNC",
	"HBZ",
	"VRS",
	"SNT",
	"TRF",
	"YOC",
	"AC3",
	"CHX",
	"HOT",
	"NVC",
	"PXG",
	"MLN",
	"ANT",
	"CND",
	"BFT",
	"EKO",
	"NEU",
	"CNN",
	"MCO",
	"WIZ",
	"IPL",
	"GRS",
	"KRB",
	"CVC",
	"DOR",
	"NTK",
	"UQC",
	"PAY",
	"SVD",
	"OXY",
	"NIM",
	"REC",
	"PUT",
	"TKA",
	"AMB",
	"ZYD",
	"NYC",
	"XPD",
	"SPF",
	"HWC",
	"ZNY",
	"ZSC",
	"ZRC",
	"ZUR",
	"ZPT",
	"ZET",
	"ZCN",
	"ZAP",
	"XZC",
	"XUC",
	"XRA",
	"XQN",
	"XPY",
	"XPC",
	"XOT",
	"XMO",
	"XMG",
	"XJO",
	"XIN",
	"XHI",
	"XFC",
	"XDN",
	"XCO",
	"XBY",
	"XCT",
	"XBP",
	"WRC",
	"WPR",
	"WTC",
	"WIN",
	"WGR",
	"WIC",
	"WGO",
	"WCT",
	"WCO",
	"WBB",
	"VTA",
	"VSX",
	"VTC",
	"VLT",
	"VIB",
	"VIT",
	"VIA",
	"UTT",
	"UTK",
	"USC",
	"UNO",
	"UNI",
	"UIS",
	"UFR",
	"UKG",
	"TTC",
	"TSC",
	"TRC",
	"TOA",
	"TNT",
	"TKN",
	"TIT",
	"TIE",
	"TFL",
	"TEK",
	"TCN",
}
