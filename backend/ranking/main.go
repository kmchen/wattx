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
	Quote map[string]Price `json: "quote"`
}

type Price struct {
	Price float32 `json: "price"`
}

const top200AssetsUrl = "https://min-api.cryptocompare.com/data/top/volumes?tsym=USD&limit=210"

func main() {
	resp, _ := httpGet(top200AssetsUrl)
	crypto := Crypto{}
	err := json.Unmarshal(resp, &crypto)
	if err != nil {
		fmt.Println("error:", err)
	}

	sort.Slice(crypto.Data, func(i, j int) bool { return crypto.Data[j].Volume24hourto < crypto.Data[i].Volume24hourto })

	//var done = make(chan bool, 210)
	for _, v := range crypto.Data {
		const currencyUrl = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=%s"
		var url = fmt.Sprintf(currencyUrl, v.Symbol)
		var DefaultClient = &http.Client{}
		req, _ := http.NewRequest("GET", url, nil)
		req.Header.Add("X-CMC_PRO_API_KEY", "101f8864-41d9-4223-9f32-effa9b886491")
		resp2, _ := DefaultClient.Do(req)
		defer resp2.Body.Close()
		body, _ := ioutil.ReadAll(resp2.Body)
		conversion := Conversion{}
		err := json.Unmarshal(body, &conversion)
		if err != nil {
			fmt.Println("error:", err)
		}
		fmt.Printf("%v", conversion)
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
