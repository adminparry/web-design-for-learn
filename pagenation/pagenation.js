var http = require("http");
var url = require('url');
var util = require('util');
var fs = require('fs');
var querystring = require('querystring');
// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();

var db = require('./mysql/mysql');


http.createServer((req, res) => {

	if("/favicon.ico" == req.url)return;
	console.log(req.url);

	var objUrl = url.parse(req.url,true);

	if(objUrl.pathname == "/pagenation"){
		var pageNo = objUrl.query.pageNo,
			pageSize = objUrl.query.pageSize,
			from = (pageNo - 1)*pageSize;

		db.selectAllByLimit("human",from,pageSize).then((json)=>{
			// var ret = util.inspect(json);

			res.end(JSON.stringify(json));
		});
			
	}else if(objUrl.pathname == "/"){
		fs.createReadStream("./index.html").pipe(res);
	}else{
		res.end("404");
	}

	// res.end("404")
}).listen(8080,function(){
	console.log(8080)
})