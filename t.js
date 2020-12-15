var mysql = require('mysql');

var SQLOptions={
    host: localhost,//",//192.168.0.101
    port:  "3306",
    database:"customer",
    user:"clientlocal",// "root",
    password:"GrapeTreeTown120103__R"//"GrapetreeTown306__R"// "Grapetreetown306"
  };
//---------------------------------------------------
var dbMysql = mysql.createConnection( SQLOptions);
dbMysql.connect(function(err) {  
  if (err) throw err;  
  console.log("mysql Connected!");  
});

