var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '111111',
  database : 'db1'
});
 
connection.connect();


exports.selectAllByLimit = async function selectAllByLimit(tableName, start, size){
	var sql = `select * from ${tableName} limit ${start},${size}`;
	var sql1 = `select count(1) as count from ${tableName}`;

	var ret = {};

	const f1 = await new Promise(function(resolve,reject){
		connection.query(sql1, function(err, results, fields){
			if(err)reject(err);
			resolve(results[0].count);
			
		})
	})
	const f2 = await new Promise(function(resolve,reject){
		connection.query(sql,function(err, results, fields){
			if(err)reject(err);
			resolve(results);
		})
	})
	// Promise.all(new ArrayList(f1,f2)).then(function(values){
	// 	console.log(values)
	// })
	// console.log(f1,f2)
	return {data:f2,count:f1,pageTotal:Math.ceil(f1/size)};
}

// exports.selectAllByLimit("table_name",0,2).then(function(ret){
// 	console.log(ret)
// })