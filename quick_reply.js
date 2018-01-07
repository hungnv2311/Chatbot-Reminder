curl -X POST -H "Content-Type: application/json" -d '{
"recipient":{
    "id":"<PSID>"
},
"message":{
    "text": "Here's a quick reply!",
        "quick_replies":[
        {
            "content_type":"text",
            "title":"Search",
            "payload":"<POSTBACK_PAYLOAD>",
            "image_url":"http://example.com/img/red.png"
        },
        {
            "content_type":"location"
        },
        {
            "content_type":"text",
            "title":"Something Else",
            "payload":"<POSTBACK_PAYLOAD>"
        }
    ]
}
}' "https://graph.facebook.com/v2.6/me/messages?access_token=<PAGE_ACCESS_TOKEN>"