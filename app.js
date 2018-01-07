
/**
 * Copyright 2017-present, Facebook, Inc. All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * Messenger Platform Quick Start Tutorial
 *
 * This is the completed code for the Messenger Platform quick start tutorial
 *
 * https://developers.facebook.com/docs/messenger-platform/getting-started/quick-start/
 *
 * To run this code, you must do the following:
 *
 * 1. Deploy this code to a server running Node.js
 * 2. Run `npm install`
 * 3. Update the VERIFY_TOKEN
 * 4. Add your PAGE_ACCESS_TOKEN to your environment vars
 *
 */

'use strict';
const PAGE_ACCESS_TOKEN = "EAAFZAZCRBWYw4BAKDCE7Xw7dnBVd5xKTEP0bUZCDmdzU1BniZA0ZAVkrwIsFqfumpLHnxEVmXZAS4ClB8Mzt0GoIBsyoLzoEtcI69YrFkuVXIfkCwbkUMEMPmaeLuCDV6gRc4VojsGPuJnVkDTPDI5haBA9EUcOSaOUjgRnOaeFMl5A3KFsZCUx";
// Imports dependencies and set up http server
const 
  request = require('request'),
  express = require('express'),
  body_parser = require('body-parser'),
  app = express().use(body_parser.json()); // creates express http server

// Sets server port and logs message on success
app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));
app.get('/', function (req,res) {
    res.send('Hellowww');

})

// Accepts POST requests at /webhook endpoint
app.post('/webhook', (req, res) => {  

  // Parse the request body from the POST
  let body = req.body;

  // Check the webhook event is from a Page subscription
  if (body.object === 'page') {

    body.entry.forEach(function(entry) {

      // Gets the body of the webhook event
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);


      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log('Sender ID: ' + sender_psid);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
        handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
        
        PostbackTimLop(sender_psid, webhook_event.postback);
      }
    });
    // Return a '200 OK' response to all events
    res.status(200).send('EVENT_RECEIVED');

  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }

});
var data = {}

// Accepts GET requests at the /webhook endpoint
app.get('/webhook', (req, res) => {
  
  /** UPDATE YOUR VERIFY TOKEN **/
  const VERIFY_TOKEN = "<Lanheihei>";
  
  // Parse params from the webhook verification request
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
    
  // Check if a token and mode were sent
  if (mode && token) {
  
    // Check the mode and token sent are correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      
      // Respond with 200 OK and challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);
    
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);      
    }
  }
});


function handleMessage(sender_psid, received_message) {
    var userData = openDatabase([sender_psid]) || []
  let response;
  // Checks if the message contains text
  if (received_message.text) {
    // Create the payload for a basic text message, which
    // will be added to the body of our request to the Send API
    var response_findclass = {"text": "Tìm lịch học bằng cách nhập tên môn học?"}
    console.log(!userData.response_findclass);
      if(!userData.response_findclass){
          userData.response_findclass = true;
          callSendAPI(sender_psid, response_findclass);
          console.log(userData);
          console.log(received_message.text);
          console.log(userData.response_findclass);
          console.log(!userData.response_findclass);

      }

      else if (userData.response_findclass && !userData.tim_ten_hoc_phan){
        timthp(received_message.text);
        console.log(userData);
          userData.tim_ten_hoc_phan = true
        }
  }
  else if (received_message.attachments) {
    response = {"text": "Hãy nhập tên môn học"}
      callSendAPI(sender_psid, response);   }
}

// function handlePostback(sender_psid, received_postback) {
//   console.log('ok')
//    let response;
//   // Get the payload for the postback
//   let payload = received_postback.payload;
//
//   // Set the response based on the postback payload
//   if (payload === 'yes') {
//     response = { "text": "Thanks!" }
//   } else if (payload === 'no') {
//     response = { "text": "Oops, try sending another image." }
//   }
//   // Send the message to acknowledge the postback
//   callSendAPI(sender_psid, response);
// }

function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

  // Send the HTTP request to the Messenger Platform
  request({
    "url": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": PAGE_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  }); 
}


var fs = require("fs");
var content = fs.readFileSync('tkb.json');
var obj = JSON.parse(content);

const vietnameseDecode = (str) => {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'| |\"|\&|\#|\[|\]|~|$|_/g, "-");
    /* tìm và thay thế các kí tự đặc biệt trong chuỗi sang kí tự - */
    str = str.replace(/-+-/g, "-"); //thay thế 2- thành 1-
    str = str.replace(/^\-+|\-+$/g, "");
//cắt bỏ ký tự - ở đầu và cuối chuỗi
    return str;
}

app.get('/test', function(req,res){
    res.send(timthp(req.query.id));
})

var result = [];

function timthp(received_message) {

    var thp = [];
    var button = [];
    var j = 0;
    j++;
    let tim_ten_hoc_phan;
    console.log(received_message);

    for (var i in obj) {
        var a = vietnameseDecode(obj[i].THP);
        // console.log(a);
        var b = vietnameseDecode(received_message);
        if (a.match(b)) {
            result.push(obj[i]);
            if (obj[i].THP != obj[--i].THP) {
                thp.push(obj[++i].THP);
            }
        }
    }
    console.log(JSON.stringify(thp[0]));
    console.log(thp[0]);

    return (result);

    if (thp.length<=3) {
        for (j in thp) {
            button.push(
                {
                    "content_type": "text",
                    "title": JSON.stringify(thp[j]),
                    "payload": JSON.stringify(thp[j])
                }
            )
        }
        tim_ten_hoc_phan = {
            "text": "Ý của bạn có phải là: ",
            "quick_replies": button}
    }
     else {tim_ten_hoc_phan =  { "text": "Hãy điền cụ thể tên môn học!"};
        callSendAPI(sender_psid, tim_ten_hoc_phan);
        }}

//Kết quả trẻ về danh sách tên lớp tín chỉ!!!

function PostbackTimLop(sender_psid, received_postback) {
    console.log('ok');
    var quickreply = [];
    let response_postback_tim_lop;
    // Get the payload for the postback
    let payload = received_postback.payload;

    // Set the response based on the postback payload
    if (userData.response_findclass && userData.tim_ten_hoc_phan && !userData.response_postback_tim_lop ) {
        for (var k in result) {
            if (payload == result[k].THP) {
                quickreply.push(
                    {
                        "content_type": "text",
                        "title": JSON.stringify(result[i].TLTC),
                        "payload": JSON.stringify(result[i].TLTC)
                    }
                )
            }
        }
        response_postback_tim_lop = {
            "text": "Chọn lớp cụ thể để biết thêm chi tiết!",
            "quick_replies": JSON.stringify(quickreply)
        }
        callSendAPI(sender_psid, response_postback_tim_lop);
        userData.response_postback_tim_lop = true
    }
    else if (userData.response_findclass && userData.tim_ten_hoc_phan && userData.response_postback_tim_lop && !userData.response_postback_lich_hoc){
        PostbackLichHoc (received_postback);
        userData.response_postback_lich_hoc = true;
    }
    else if (userData.response_findclass && userData.tim_ten_hoc_phan && userData.response_postback_tim_lop && userData.response_postback_lich_hoc && !userData.response_tim_lich_hoc_khac){
        let response_tim_lich_hoc_khac;
        response_tim_lich_hoc_khac = {
            "text": "Bạn có muốn tìm lịch học môn khác?",
            "quick_replies":[
            {
                "content_type":"text",
                "title":"Có",
                "payload":"có"
            },
                {
                    "content_type":"text",
                    "title":"Không",
                    "payload":"không"
                }
        ]
        }
        callSendAPI(sender_psid, response_tim_lich_hoc_khac);
        userData.response_tim_lich_hoc_khac = true
    }
    // else if (userData.response_findclass && userData.tim_ten_hoc_phan && userData.response_postback_tim_lop && userData.response_postback_lich_hoc && userData.response_tim_lich_hoc_khac && !userData.response_tim_lai_tu_dau){
    //     let response_tim_lai_tu_dau;
    //     // Get the payload for the postback
    //     let payload = received_postback.payload;
    //     if (payload === "có"){
    //
    //     }
    //     else  if (payload === "không"){
    //
    //     }
    // }
}

function PostbackLichHoc(sender_psid, received_postback) {
    console.log('ok');
    var lichhoc = [];
    let response_postback_lich_hoc;
    // Get the payload for the postback
    let payload = received_postback.payload;

    // Set the response based on the postback payload
    for (var m in result) {
        if (payload == result[m].TLTC) {
          lichhoc.push(result[m].LICHHOC)
        }
    }
    response_postback_lich_hoc = {"text": 'Lịch học: ' + '<br/>' + 'Giai đoạn: ' + JSON.stringify(result[m].GD) + '<br/>' + 'Lịch học: ' + JSON.stringify(lichhoc) }

    // Send the message to acknowledge the postback
    callSendAPI(sender_psid, response_postback_lich_hoc);
}