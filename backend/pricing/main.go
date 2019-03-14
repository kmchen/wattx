package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"sort"
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

const top200AssetsUrl = "https://min-api.cryptocompare.com/data/top/volumes?tsym=USD&limit=300"

func main() {
	resp, _ := httpGet(top200AssetsUrl)
	crypto := Crypto{}
	err := json.Unmarshal(resp, &crypto)
	if err != nil {
		fmt.Println("error:", err)
	}

	sort.Slice(crypto.Data, func(i, j int) bool { return crypto.Data[j].Volume24hourto < crypto.Data[i].Volume24hourto })

	for _, v := range crypto.Data {
		go func(symbol string, done chan Conversion) {
			const currencyUrl = "http://localhost:8082?symbol=%s"
			var url = fmt.Sprintf(currencyUrl, symbol)
			var DefaultClient = &http.Client{}
			req, _ := http.NewRequest("GET", url, nil)
			resp2, _ := DefaultClient.Do(req)
			defer resp2.Body.Close()
			body, _ := ioutil.ReadAll(resp2.Body)
			if err != nil {
				fmt.Println("error: ioutil")
			}
			conversion := Conversion{}
			err := json.Unmarshal(body, &conversion)
			if err != nil {
				fmt.Println("error:", err)
			}
			fmt.Printf("%s, %+v\n", symbol, conversion)
			done <- conversion
		}(v.Symbol, done)
	}
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
