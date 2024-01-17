//instancia
import WebSocket from "ws";
import mysql from 'mysql2/promise';
import 'dotenv/config';

var conexion = "";

// URL Websocket


const _request_session = JSON.stringify({"command":"request_session","params":{"language":"spa","site_id":"279","afec":"gplxCQaJr2v_YT15LKBZkdwEJWcc0uOkZH-8"},"rid":"request_session797634429654312"});
const _get_notifications = JSON.stringify({"command":"get","params":{"source":"notifications","what":{"partner_streams":[]},"subscribe":true},"rid":"subscribeCmd918005206533135"});

const _get_suggested_bets = JSON.stringify({"command":"get_suggested_bets","params":{},"rid":"command166385203895024"});
const _get_boosted_selections = JSON.stringify({ "command": "get_boosted_selections", "params": {}, "rid": "command716077706010082" });
const _get_partner_config = JSON.stringify({"command":"get","params":{"source":"partner.config","what":{"partner":[]}},"rid":"command942272351177665"});
const _store_user_identification_token = JSON.stringify({"command":"store_user_identification_token","params":{"identification_info":{"userIdentifier":"gplxCQaJr2v_YT15LKBZkdwEJWcc0uOkZH-8","userGeoData":{},"collectedInfo":{"deviceType":"desktop","model":null,"os":"Windows 10 64-bit","architecture":64,"browser":"Chrome","browserBuildNumber":"116.0.0.0","languages":"es-ES,es","time":"Wed Sep 06 2023 19:05:18 GMT-0500 (hora estándar de Perú)","videoCardInfo":"ANGLE (Intel, Intel(R) UHD Graphics Direct3D11 vs_5_0 ps_5_0, D3D11)","coreNumbers":16,"ramMemory":8,"pointingMethod":"mouse","userAgent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36","orientation":"Landscape","resolution":"1032 X 1920","devicePixelRatio":1,"colorDepth":24}}},"rid":"command62680172217713"});
const _get_sport_bonus_rules = JSON.stringify({"command":"get_sport_bonus_rules","params":{},"rid":"command640830347800190"});


async function conexionWS() {

  const ws = new WebSocket("wss://eu-swarm-springre.betconstruct.com");
  //const events = ;
  ws.onerror = (event) => {
    //console.log()
  };

  ws.onopen = (event) => {
    ws.send(_request_session);
    ws.send(_get_notifications);
    ws.send(_get_suggested_bets);
    ws.send(_get_boosted_selections);
    ws.send(_get_partner_config);
    ws.send(_store_user_identification_token);
    ws.send(_get_sport_bonus_rules);
  };

  ws.onmessage = (event) => {
    //console.log();
    traverse(event.data)
  };

  ws.onclose = (event) => { };

  ws.on("error", console.error);

  ws.on("open", function open() { });

  ws.on("close", function close() {
    console.log("disconnected");
  });
}

async function eventsData() {
  const events = [23798055, 23900762, 23900760, 23900761, 23900772, 23900784, 23901774, 23900742, 23900780, 23900753, 23900774, 23798055, 23868153, 23868154, 23889606];

  console.log(
    "----------------------------------------------------------------------------- envio de events-----------------------------------------------------------------------------------------"
  );

  events.forEach((event) => {
    setTimeout(() => {
      ws.send(JSON.stringify(
        { "command": "get", "params": { "source": "betting", "what": { "sport": ["id", "name", "alias"], "region": ["id", "alias", "name"], "competition": ["id", "name"], "game": ["id", "markets_count", "start_ts", "is_started", "is_blocked", "team1_id", "team2_id", "game_number", "text_info", "is_stat_available", "match_length", "type", "info", "stats", "team1_name", "team2_name", "tv_info", "add_info_name", "showInfo", "live_events", "last_event", "add_info"], "market": ["name", "type", "id", "base", "order", "group_name", "cashout", "group_id", "col_count", "point_sequence", "extra_info", "express_id", "is_new"], "event": ["id", "order", "type_1", "name", "price", "base", "ew_allowed"] }, "where": { "game": { "id": event }, "sport": { "alias": "Soccer" } }, "subscribe": true }, "rid": "subscribeCmd856684182010134" }
      ))
    }, 6000);
  });

}

async function traverse(resp) {
  console.log(resp)
}

async function conectionBD() {
  try {
    conexion = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
    });
    console.log('conected database')
  } catch (error) {
    console.error('error conected database');
  }
}


await conectionBD();
await conexionWS();
//await eventsData();

//console.log(process.env.PORT)


/*  

{"command":"get","params":{"source":"betting","what":{"sport":["id","name","alias"],"region":["id","alias","name"],"competition":["id","name"],"game":["id","markets_count","start_ts","is_started","is_blocked","team1_id","team2_id","game_number","text_info","is_stat_available","match_length","type","info","stats","team1_name","team2_name","tv_info","add_info_name","showInfo","live_events","last_event","add_info"],"market":["name","type","id","base","order","group_name","cashout","group_id","col_count","point_sequence","extra_info","express_id","is_new"],"event":["id","order","type_1","name","price","base","ew_allowed"]},"where":{"game":{"id": {"@in":[23798055,23900762,23900760,23900761,23900772,23900784,23901774,23900742,23900780,23900753,23900774,23798055,23868153,23868154,23889606]}},"sport":{"alias":"Soccer"}},"subscribe":true},"rid":"subscribeCmd856684182010134"}

*/