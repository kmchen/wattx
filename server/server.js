'use strict';

const express = require('express');
const axios = require('axios');

const PORT = 8082;
const HOST = 'localhost';

const app = express();
app.get('/', async (req, res) => {
  console.log(data[req.query.symbol])
  res.json(data[req.query.symbol]);
  //const instance = axios.create({
    //baseURL: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    //timeout: 1000,
    //headers: {'X-CMC_PRO_API_KEY': '101f8864-41d9-4223-9f32-effa9b886491'}
  //});
  //try {
    //const resp = await instance.get();
    //const data = resp.data.data.reduce((acc, curr) => {
      //const { price, volume_24h, percent_change_24h, market_cap }  = curr.quote.USD;
      //acc.push({
        //name: curr.name,
        //rank: curr.cmc_rank,
        //price,
        //volume: volume_24h,
        //priceChange: percent_change_24h,
        //marketCap: market_cap
      //});
      //return acc; 
    //}, []).sort((a, b) => a.rank - b.rank)
    //res.json(data);
  //} catch(err) {
    //console.err('Fail to get cryptocurrency data') 
  //}
});

app.listen(PORT, HOST);

const data = {
  USDT: {Data:{USDT:{Quote:{USD:{Price:1.0100104}}, Symbol:'USDT'}}},
  LTC: {Data:{LTC:{Quote:{USD:{Price:55.643288}}, Symbol: 'LTC'}}},
  XBTUSD: {Data:{}},
  ETH: {Data:{ETH:{Quote:{USD:{Price:132.95866}}, Symbol:'ETH'}}},
  XLM: {Data:{XLM:{Quote:{USD:{Price:0.108318545}}, Symbol:'XLM'}}}
  EOS: {Data:{EOS:{Quote:{USD:{Price:3.59853}}, Symbol:'EOS'}]},
  XRP: {Data:{XRP:{Quote:{USD:{Price:0.31384584}}, Symbol:'XRP'}}},
  BTC: {Data:{BTC:{Quote:{USD:{Price:3901.1355}}, Symbol:'BTC'}}},
  DASH: {Data:{DASH:{Quote:{USD:{Price:90.931625}} Symbol:'DASH'}}},
  IOT, {Data:map[]},
  ZECD, {Data:map[]},
  YOG, {Data:map[]},
  ZLQ, {Data:map[]},
  ZBC, {Data:map[]},
  ZBC*, {Data:map[]},
  YYW, {Data:map[]},
  ZBCN, {Data:map[]},
  ZXT, {Data:map[]},
  ZONTO, {Data:map[]},
  ZOOM, {Data:map[]},
  ZGC, {Data:map[]},
  ZET2, {Data:map[]},
  ZMC, {Data:map[]},
  YBC, {Data:map[]},
  WLK, {Data:map[]},
  ZIRK, {Data:map[]},
  GPC, {Data:map[]},
  ZNE, {Data:map[]},
  XBTUSD: {Data:map[]},
  IOT, {Data:map[]},
  EUR, {Data:map[]},
  BTCUS, {Data:map[]},
  ARC**, {Data:map[]},
  SPC*, {Data:map[]},
  SBD*, {Data:map[]},
  TLC, {Data:map[]},
  PAI*, {Data:map[]},
  XAU, {Data:map[]},
  MAN*, {Data:map[]},
  BBN*, {Data:map[]},
  SKRP, {Data:map[]},
  EDR*, {Data:map[]},
  wETT, {Data:map[]},
  ARC**, {Data:map[]},
  SMT*, {Data:map[]},
  wETT, {Data:map[]},
  ARC**, {Data:map[]},
  ACT*, {Data:map[]},
  ZRX: {Data:{ZRX:{Quote:{USD:{Price:0.26751006}], Symbol:'ZRX'}}},
//{Data:map[BSV:{Quote:map[USD:{Price:64.911865}] Symbol:BSV}]}
//{Data:map[ZEC:{Quote:map[USD:{Price:51.813313}] Symbol:ZEC}]}
//{Data:map[XMR:{Quote:map[USD:{Price:51.74917}] Symbol:XMR}]}
//{Data:map[BCH:{Quote:map[USD:{Price:128.7823}] Symbol:BCH}]}
//{Data:map[ETC:{Quote:map[USD:{Price:4.261398}] Symbol:ETC}]}
//{Data:map[OMG:{Quote:map[USD:{Price:1.427205}] Symbol:OMG}]}
//{Data:map[NEO:{Quote:map[USD:{Price:8.962657}] Symbol:NEO}]}
//{Data:map[BTG:{Quote:map[USD:{Price:12.779644}] Symbol:BTG}]}
//{Data:map[MGO:{Quote:map[USD:{Price:0.111769356}] Symbol:MGO}]}
//{Data:map[QTUM:{Quote:map[USD:{Price:2.1414402}] Symbol:QTUM}]}
//{Data:map[ADA:{Quote:map[USD:{Price:0.04649354}] Symbol:ADA}]}
//{Data:map[ETP:{Quote:map[USD:{Price:0.69136435}] Symbol:ETP}]}
//{Data:map[DAI:{Quote:map[USD:{Price:0.99490947}] Symbol:DAI}]}
//{Data:map[B2G:{Quote:map[USD:{Price:0.25416997}] Symbol:B2G}]}
//{Data:map[REP:{Quote:map[USD:{Price:13.747565}] Symbol:REP}]}
//{Data:map[TRX:{Quote:map[USD:{Price:0.022469481}] Symbol:TRX}]}
//{Data:map[BNB:{Quote:map[USD:{Price:15.1616125}] Symbol:BNB}]}
//{Data:map[BTW:{Quote:map[USD:{Price:0.004636069}] Symbol:BTW}]}
//{Data:map[VET:{Quote:map[USD:{Price:0.0051667457}] Symbol:VET}]}
//{Data:map[DOGE:{Quote:map[USD:{Price:0.0020223164}] Symbol:DOGE}]}
//{Data:map[MITH:{Quote:map[USD:{Price:0.046812817}] Symbol:MITH}]}
//{Data:map[WAVES:{Quote:map[USD:{Price:2.7109838}] Symbol:WAVES}]}
//{Data:map[XTZ:{Quote:map[USD:{Price:0.45452842}] Symbol:XTZ}]}
//{Data:map[DGTX:{Quote:map[USD:{Price:0.07527058}] Symbol:DGTX}]}
//{Data:map[XEM:{Quote:map[USD:{Price:0.04598667}] Symbol:XEM}]}
//{Data:map[TUSD:{Quote:map[USD:{Price:1.0141857}] Symbol:TUSD}]}
//{Data:map[INT:{Quote:map[USD:{Price:0.015906226}] Symbol:INT}]}
//{Data:map[NIO:{Quote:map[USD:{Price:0.0087051615}] Symbol:NIO}]}
//{Data:map[VEE:{Quote:map[USD:{Price:0.0048855245}] Symbol:VEE}]}
//{Data:map[PAX:{Quote:map[USD:{Price:1.0141554}] Symbol:PAX}]}
//{Data:map[ADK:{Quote:map[USD:{Price:2.178236}] Symbol:ADK}]}
//{Data:map[BCA:{Quote:map[USD:{Price:0.13043031}] Symbol:BCA}]}
//{Data:map[PZM:{Quote:map[USD:{Price:0.35082778}] Symbol:PZM}]}
//{Data:map[ODE:{Quote:map[USD:{Price:0.188245}] Symbol:ODE}]}
//{Data:map[BAT:{Quote:map[USD:{Price:0.19112521}] Symbol:BAT}]}
//{Data:map[SAN:{Quote:map[USD:{Price:0.4608882}] Symbol:SAN}]}
//{Data:map[CPC:{Quote:map[USD:{Price:0.020740762}] Symbol:CPC}]}
//{Data:map[SNGLS:{Quote:map[USD:{Price:0.017002232}] Symbol:SNGLS}]}
//{Data:map[GNO:{Quote:map[USD:{Price:13.026117}] Symbol:GNO}]}
//{Data:map[EDO:{Quote:map[USD:{Price:0.8087941}] Symbol:EDO}]}
//{Data:map[VEX:{Quote:map[USD:{Price:0.004206267}] Symbol:VEX}]}
//{Data:map[WAX:{Quote:map[USD:{Price:0.05718287}] Symbol:WAX}]}
//{Data:map[LSK:{Quote:map[USD:{Price:1.3819499}] Symbol:LSK}]}
//{Data:map[MNX:{Quote:map[USD:{Price:0.32535732}] Symbol:MNX}]}
//{Data:map[RLC:{Quote:map[USD:{Price:0.42564982}] Symbol:RLC}]}
//{Data:map[ENJ:{Quote:map[USD:{Price:0.17458263}] Symbol:ENJ}]}
//{Data:map[FUN:{Quote:map[USD:{Price:0.004470422}] Symbol:FUN}]}
//{Data:map[GAS:{Quote:map[USD:{Price:2.79225}] Symbol:GAS}]}
//{Data:map[TDS:{Quote:map[USD:{Price:0.0037124963}] Symbol:TDS}]}
//{Data:map[YOYOW:{Quote:map[USD:{Price:0.018724844}] Symbol:YOYOW}]}
//{Data:map[ELF:{Quote:map[USD:{Price:0.1713991}] Symbol:ELF}]}
//{Data:map[BTT:{Quote:map[USD:{Price:0.00074858}] Symbol:BTT}]}
//{Data:map[AUC:{Quote:map[USD:{Price:0.013688595}] Symbol:AUC}]}
//{Data:map[EDG:{Quote:map[USD:{Price:0.13276815}] Symbol:EDG}]}
//{Data:map[GUSD:{Quote:map[USD:{Price:1.0181714}] Symbol:GUSD}]}
//{Data:map[RIF:{Quote:map[USD:{Price:0.074371055}] Symbol:RIF}]}
//{Data:map[GNT:{Quote:map[USD:{Price:0.07442571}] Symbol:GNT}]}
//{Data:map[ECTE:{Quote:map[USD:{Price:0.09498828}] Symbol:ECTE}]}
//{Data:map[AID:{Quote:map[USD:{Price:0.0469431}] Symbol:AID}]}
//{Data:map[SNT:{Quote:map[USD:{Price:0.022342006}] Symbol:SNT}]}
//{Data:map[ZIL:{Quote:map[USD:{Price:0.018180601}] Symbol:ZIL}]}
//{Data:map[CCRB:{Quote:map[USD:{Price:0.013683908}] Symbol:CCRB}]}
//{Data:map[EMC:{Quote:map[USD:{Price:0.29349917}] Symbol:EMC}]}
//{Data:map[DATA:{Quote:map[USD:{Price:0.019876873}] Symbol:DATA}]}
//{Data:map[MKR:{Quote:map[USD:{Price:642.7491}] Symbol:MKR}]}
//{Data:map[TKN:{Quote:map[USD:{Price:0.6350745}] Symbol:TKN}]}
//{Data:map[IOST:{Quote:map[USD:{Price:0.007479138}] Symbol:IOST}]}
//{Data:map[RCN:{Quote:map[USD:{Price:0.022543237}] Symbol:RCN}]}
//{Data:map[BCD:{Quote:map[USD:{Price:0.8950436}] Symbol:BCD}]}
//{Data:map[QASH:{Quote:map[USD:{Price:0.16268036}] Symbol:QASH}]}
//LEO, {Data:map[LEO:{Quote:map[USD:{Price:0.08135565}] Symbol:LEO}]}
//{Data:map[DIG:{Quote:map[USD:{Price:0.0028990584}] Symbol:DIG}]}
//{Data:map[NEXO:{Quote:map[USD:{Price:0.08653788}] Symbol:NEXO}]}
//{Data:map[DGX:{Quote:map[USD:{Price:41.62358}] Symbol:DGX}]}
//{Data:map[LKK:{Quote:map[USD:{Price:0.023455571}] Symbol:LKK}]}
//{Data:map[MNC:{Quote:map[USD:{Price:0.00016427528}] Symbol:MNC}]}
//{Data:map[SPANK:{Quote:map[USD:{Price:0.008041816}] Symbol:SPANK}]}
//{Data:map[INK:{Quote:map[USD:{Price:0.0072811577}] Symbol:INK}]}
//{Data:map[WPR:{Quote:map[USD:{Price:0.0123015}] Symbol:WPR}]}
//{Data:map[HBZ:{Quote:map[USD:{Price:0.00060638174}] Symbol:HBZ}]}
//{Data:map[AC3:{Quote:map[USD:{Price:0.0065168636}] Symbol:AC3}]}
//{Data:map[AVT:{Quote:map[USD:{Price:0.14687121}] Symbol:AVT}]}
//{Data:map[ATB:{Quote:map[USD:{Price:0.009170891}] Symbol:ATB}]}
//{Data:map[STQ:{Quote:map[USD:{Price:0.00027917628}] Symbol:STQ}]}
//{Data:map[BCI:{Quote:map[USD:{Price:0.09240582}] Symbol:BCI}]}
//{Data:map[FTO:{Quote:map[USD:{Price:3.0783284}] Symbol:FTO}]}
//{Data:map[DXT:{Quote:map[USD:{Price:0.0016970856}] Symbol:DXT}]}
//{Data:map[XVG:{Quote:map[USD:{Price:0.0065627634}] Symbol:XVG}]}
//{Data:map[YOC:{Quote:map[USD:{Price:0.0022558272}] Symbol:YOC}]}
//{Data:map[TNB:{Quote:map[USD:{Price:0.003284073}] Symbol:TNB}]}
//{Data:map[TRF:{Quote:map[USD:{Price:0.0023672988}] Symbol:TRF}]}
//{Data:map[CNN:{Quote:map[USD:{Price:0.0001290485}] Symbol:CNN}]}
//{Data:map[LYM:{Quote:map[USD:{Price:0.0060254284}] Symbol:LYM}]}
//{Data:map[LINDA:{Quote:map[USD:{Price:0.0002937082}] Symbol:LINDA}]}
//{Data:map[ELEC:{Quote:map[USD:{Price:0.0019636524}] Symbol:ELEC}]}
//{Data:map[CTXC:{Quote:map[USD:{Price:0.14707878}] Symbol:CTXC}]}
//{Data:map[KNC:{Quote:map[USD:{Price:0.24801558}] Symbol:KNC}]}
//{Data:map[AGI:{Quote:map[USD:{Price:0.04959972}] Symbol:AGI}]}
//{Data:map[CCL:{Quote:map[USD:{Price:0.0004099933}] Symbol:CCL}]}
//{Data:map[VRS:{Quote:map[USD:{Price:0.006848565}] Symbol:VRS}]}
//{Data:map[DIM:{Quote:map[USD:{Price:0.0016418967}] Symbol:DIM}]}
//{Data:map[HB:{Quote:map[USD:{Price:0.009906577}] Symbol:HB}]}
//{Data:map[CHX:{Quote:map[USD:{Price:0.18500002}] Symbol:CHX}]}
//{Data:map[ORS:{Quote:map[USD:{Price:0.0040178117}] Symbol:ORS}]}
//{Data:map[DGB:{Quote:map[USD:{Price:0.013862695}] Symbol:DGB}]}
//{Data:map[TRST:{Quote:map[USD:{Price:0.00684732}] Symbol:TRST}]}
//{Data:map[MANA:{Quote:map[USD:{Price:0.04756219}] Symbol:MANA}]}
//{Data:map[DASC:{Quote:map[USD:{Price:0.022769425}] Symbol:DASC}]}
//{Data:map[BCPT:{Quote:map[USD:{Price:0.04653192}] Symbol:BCPT}]}
//{Data:map[UTNP:{Quote:map[USD:{Price:0.004237239}] Symbol:UTNP}]}
//{Data:map[DTH:{Quote:map[USD:{Price:0.0075583598}] Symbol:DTH}]}
//{Data:map[TUBE:{Quote:map[USD:{Price:0.02896146}] Symbol:TUBE}]}
//{Data:map[IQ:{Quote:map[USD:{Price:0.003042073}] Symbol:IQ}]}
//{Data:map[BOX:{Quote:map[USD:{Price:0.0315669}] Symbol:BOX}]}
//{Data:map[DOR:{Quote:map[USD:{Price:0.00018012879}] Symbol:DOR}]}
//{Data:map[NEU:{Quote:map[USD:{Price:0.1712532}] Symbol:NEU}]}
//{Data:map[PLBT:{Quote:map[USD:{Price:1.2278123}] Symbol:PLBT}]}
//{Data:map[NVC:{Quote:map[USD:{Price:0.38734072}] Symbol:NVC}]}
//{Data:map[HOT:{Quote:map[USD:{Price:0.0010503439}] Symbol:HOT}]}
//{Data:map[EL:{Quote:map[USD:{Price:0.026190124}] Symbol:EL}]}
//{Data:map[BTCZ:{Quote:map[USD:{Price:0.00020076374}] Symbol:BTCZ}]}
//{Data:map[EURS:{Quote:map[USD:{Price:1.1021334}] Symbol:EURS}]}
//{Data:map[IPL:{Quote:map[USD:{Price:0.0041020317}] Symbol:IPL}]}
//{Data:map[SLR:{Quote:map[USD:{Price:0.046789046}] Symbol:SLR}]}
//{Data:map[QBIC:{Quote:map[USD:{Price:0.004601679}] Symbol:QBIC}]}
//{Data:map[VOISE:{Quote:map[USD:{Price:0.0005792739}] Symbol:VOISE}]}
//{Data:map[PIRL:{Quote:map[USD:{Price:0.028514534}] Symbol:PIRL}]}
//{Data:map[WIZ:{Quote:map[USD:{Price:0.013681335}] Symbol:WIZ}]}
//{Data:map[IPL:{Quote:map[USD:{Price:0.0041020205}] Symbol:IPL}]}
//{Data:map[QBIC:{Quote:map[USD:{Price:0.0041413503}] Symbol:QBIC}]}
//{Data:map[SLR:{Quote:map[USD:{Price:0.046809338}] Symbol:SLR}]}
//{Data:map[CMCT:{Quote:map[USD:{Price:0.0014462012}] Symbol:CMCT}]}
//159 sentBRIA, {Data:map[BRIA:{Quote:map[USD:{Price:0.08}] Symbol:BRIA}]}
//{Data:map[WIZ:{Quote:map[USD:{Price:0.013681249}] Symbol:WIZ}]}
//{Data:map[VOISE:{Quote:map[USD:{Price:0.00057927385}] Symbol:VOISE}]}
//{Data:map[BRIA:{Quote:map[USD:{Price:0.08}] Symbol:BRIA}]}
//{Data:map[QBIC:{Quote:map[USD:{Price:0.004149651}] Symbol:QBIC}]}
//{Data:map[CMCT:{Quote:map[USD:{Price:0.0014508928}] Symbol:CMCT}]}
//{Data:map[SLR:{Quote:map[USD:{Price:0.04582141}] Symbol:SLR}]}
//{Data:map[HTML:{Quote:map[USD:{Price:6.857204e-05}] Symbol:HTML}]}
//{Data:map[WCT:{Quote:map[USD:{Price:0.52790505}] Symbol:WCT}]}
//{Data:map[OXY:{Quote:map[USD:{Price:0.0017487549}] Symbol:OXY}]}
//{Data:map[ZYD:{Quote:map[USD:{Price:0.0020362248}] Symbol:ZYD}]}
//{Data:map[EKO:{Quote:map[USD:{Price:0.0038366339}] Symbol:EKO}]}
//{Data:map[TKA:{Quote:map[USD:{Price:0.001593227}] Symbol:TKA}]}
//{Data:map[DEEX:{Quote:map[USD:{Price:0.015677083}] Symbol:DEEX}]}
//{Data:map[NYC:{Quote:map[USD:{Price:7.591979e-06}] Symbol:NYC}]}
//{Data:map[NTK:{Quote:map[USD:{Price:0.02064689}] Symbol:NTK}]}
//{Data:map[ZPT:{Quote:map[USD:{Price:0.0056019765}] Symbol:ZPT}]}
//{Data:map[ZUR:{Quote:map[USD:{Price:0.00047234053}] Symbol:ZUR}]}
//{Data:map[ZSC:{Quote:map[USD:{Price:0.0012524148}] Symbol:ZSC}]}
//{Data:map[ZNY:{Quote:map[USD:{Price:0.0035583028}] Symbol:ZNY}]}
//{Data:map[ZRC:{Quote:map[USD:{Price:1.8562337}] Symbol:ZRC}]}
//{Data:map[ZIPT:{Quote:map[USD:{Price:0.0015324065}] Symbol:ZIPT}]}
//{Data:map[ZET:{Quote:map[USD:{Price:0.0015364527}] Symbol:ZET}]}
//{Data:map[ZENI:{Quote:map[USD:{Price:0.00015638195}] Symbol:ZENI}]}
//{Data:map[ZCN:{Quote:map[USD:{Price:0.0956031}] Symbol:ZCN}]}
//{Data:map[ZAP:{Quote:map[USD:{Price:0.011802319}] Symbol:ZAP}]}
}
