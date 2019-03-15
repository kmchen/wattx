package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"sort"
	"strings"
	"time"
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
const topAssetCachingTime = 120 * time.Second
const converstionRateLimit = 60 * time.Second

func isWhiteListed(asset string) bool {
	for _, v := range whiteList {
		if v == asset {
			return true
		}
	}
	return false
}

func getTopAssets(topAssetsChan chan []string) {
	ticker := time.NewTicker(topAssetCachingTime)
	for {
		select {
		case t := <-ticker.C:
			fmt.Printf("Fetching top 200 assets %v", t)
			resp, err := httpGet(topAssetsUrl)
			if err != nil {
				fmt.Printf("Fail to fetch top asset: %v", err)
			}
			crypto := Crypto{}
			if err := json.Unmarshal(resp, &crypto); err != nil {
				fmt.Printf("Fail to unmarshal assets: %v", err)
			}

			sort.Slice(crypto.Data,
				func(i, j int) bool {
					return crypto.Data[j].Volume24hourto < crypto.Data[i].Volume24hourto
				},
			)
			var topAssets = make([]string, 200)
			for k, _ := range topAssets {
				if isWhiteListed(crypto.Data[k].Symbol) {
					topAssets[k] = crypto.Data[k].Symbol
				}
			}
			fmt.Printf("Top assets size: %v", len(topAssets))
			topAssetsChan <- topAssets
		}
	}
}

func getAssetValue(topAssetsChan chan []string) {
	ticker := time.NewTicker(converstionRateLimit)
	done := make(chan Conversion, 10)
	batchSize := 9
	for {
		select {
		case result := <-done:
			fmt.Printf("Successful query currency: %v\n", result)
		case <-ticker.C:
			topAssets := <-topAssetsChan
			for i := 0; i < len(topAssets); i += batchSize {
				assets := topAssets[i : i+batchSize]
				assetsStr := strings.Join(assets, ",")
				go func(symbols string, done chan Conversion) {
					var url = fmt.Sprintf(currencyUrl, symbols)
					var DefaultClient = &http.Client{}
					req, err := http.NewRequest("GET", url, nil)
					if err != nil {
						fmt.Printf("Fail to create currency request, %v", err)
						return
					}
					req.Header.Add("X-CMC_PRO_API_KEY", "101f8864-41d9-4223-9f32-effa9b886491")
					resp, err := DefaultClient.Do(req)
					if err != nil {
						fmt.Printf("Fail to get Currency %v", err)
						return
					}
					defer resp.Body.Close()
					body, err := ioutil.ReadAll(resp.Body)
					if err != nil {
						fmt.Printf("Fail to read response %v", err)
					}
					conversion := Conversion{}
					err = json.Unmarshal(body, &conversion)
					if err != nil {
						fmt.Println("error:", err)
					}
					fmt.Printf("%s, %+v\n", symbols, conversion)
					done <- conversion
				}(assetsStr, done)
			}
		}
	}
}

func main() {

	//for _, v := range crypto.Data {
	//go func(symbol string, done chan Conversion) {
	//const currencyUrl = "http://localhost:8082?symbol=%s"
	//var url = fmt.Sprintf(currencyUrl, symbol)
	//var DefaultClient = &http.Client{}
	//req, _ := http.NewRequest("GET", url, nil)
	//resp2, _ := DefaultClient.Do(req)
	//defer resp2.Body.Close()
	//body, _ := ioutil.ReadAll(resp2.Body)
	//if err != nil {
	//fmt.Println("error: ioutil")
	//}
	//conversion := Conversion{}
	//err := json.Unmarshal(body, &conversion)
	//if err != nil {
	//fmt.Println("error:", err)
	//}
	//fmt.Printf("%s, %+v\n", symbol, conversion)
	//done <- conversion
	//}(v.Symbol, done)
	//}
}

func httpGet(url string) ([]byte, error) {
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	return body, err
}

//var acc = 0
//ticker := time.NewTicker(60 * time.Second)
//done := make(chan Conversion, 10)
//for {
//select {
//case <-done:
//fmt.Printf("%v: %+v\n", acc)
//acc = acc + 1
//if acc == 210 {
//ticker.Stop()
//return
//}
//case <-ticker.C:
//for _, v := range crypto.Data[acc : acc+9] {
//go func(symbol string, done chan Conversion) {
//const currencyUrl = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=%s"
//var url = fmt.Sprintf(currencyUrl, symbol)
//var DefaultClient = &http.Client{}
//req, _ := http.NewRequest("GET", url, nil)
//req.Header.Add("X-CMC_PRO_API_KEY", "101f8864-41d9-4223-9f32-effa9b886491")
//resp2, _ := DefaultClient.Do(req)
//defer resp2.Body.Close()
//body, _ := ioutil.ReadAll(resp2.Body)
//if err != nil {
//fmt.Println("error: ioutil")
//}
//conversion := Conversion{}
//err := json.Unmarshal(body, &conversion)
//if err != nil {
//fmt.Println("error:", err)
//}
//fmt.Printf("%s, %+v\n", symbol, conversion)
//done <- conversion
//}(v.Symbol, done)
//}
//}
//fmt.Printf("%v sent", acc)
//}

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
