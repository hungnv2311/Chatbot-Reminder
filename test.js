var express = require('express');
var app = express();
app.set('title','Hung');
var title = app.get('title');

console.log('title: ' + title);

