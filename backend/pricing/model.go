package main

import (
	"encoding/json"
	"fmt"

	pb "github.com/wattx/backend/proto"
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

func UnmarshalConversion(resp []byte) (Conversion, error) {
	conversion := Conversion{}
	err := json.Unmarshal(resp, &conversion)
	if err != nil {
		fmt.Println("Error:", err)
	}
	return conversion, err
}

func toProtoConversion(conversion Conversion) pb.Conversion {
	var pbData = map[string]*pb.Currency{}
	for currencyName, currency := range conversion.Data {
		pbQuote := map[string]*pb.Price{}
		for priceName, Price := range currency.Quote {
			pbPrice := pb.Price{
				Price: Price.Price,
			}
			pbQuote[priceName] = &pbPrice
		}
		pbCurrency := pb.Currency{
			Symbol: currency.Symbol,
			Quote:  pbQuote,
		}
		pbData[currencyName] = &pbCurrency
	}
	pbConversion := pb.Conversion{
		Data: pbData,
	}
	return pbConversion
}
