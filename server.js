// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const requestIp=require('request-ip');
const LanguageDetect=require('languagedetect');
const language=new LanguageDetect();
const useragent=require('useragent');
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get('/api/det',function(req,res,next){
  var ip=requestIp.getClientIp(req);
  var agent = useragent.lookup(req.headers['user-agent']);
  res.send({'ip': ip,'language':req.headers["accept-language"],'system-info':agent});
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
