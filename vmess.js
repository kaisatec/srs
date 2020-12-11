//const clipboardy = require('clipboardy');

var fs = require('fs');
var exec = require('child_process').exec;
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var https = require('https');
var path = require('path');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');
const _ = require('lodash');

//------------------------------------------------------

var vmessListString='';
var bak='';

var isRun=false;
 
//var execProcess = require("./exec_process.js");

 
var execProcess = function(command, cb){
    var child = exec(command, function(err, stdout, stderr){
        if(err != null){
            return cb(new Error(err), null);
        }else if(typeof(stderr) != "string"){
            return cb(new Error(stderr), null);
        }else{
            return cb(null, stdout);
        }
    });
}

//----------------------------------------------------
var optionsArray = [];
var options0 = {
	index:0,
	host :  'github.com',
	port : 443,
	path : '/Alvin9999/new-pac/wiki/v2ray%E5%85%8D%E8%B4%B9%E8%B4%A6%E5%8F%B7',
	method : 'GET'
}
var options1 = {
	index :1,
	host :  'awesomeopensource.com',
	port : 443,
	path : '/project/iwxf/free-v2ray?categoryPage=11',///project/iwxf/free-v2ray?categoryPage=11',
	method : 'GET'
}
var options2 = {
	index :2,
	host :  'github.com',
	port : 443,
	path : '/selierlin/Share-SSR-V2ray/blob/master/1-share-ssr-v2ray.md',///project/iwxf/free-v2ray?categoryPage=11',
	method : 'GET'
}

var options3 = {
	index :3,
	host :  'github.com',
	port : 443,
	path : '/iwxf/free-v2ray',///project/iwxf/free-v2ray?categoryPage=11',
	method : 'GET'
}
  
//----------------------------------------------------
optionsArray.push(options0);
optionsArray.push(options1);
optionsArray.push(options2);
optionsArray.push(options3);

function decodeHTML(index, htmlString){
	console.log("! "+index);
	switch(index){
		case 0:{//host : 'github.com',
                //port : 443,
                //path : '/Alvin9999/new-pac/wiki/v2ray%E5%85%8D%E8%B4%B9%E8%B4%A6%E5%8F%B7',
			var tems='';
			var s=htmlString;
			var exitNumber=false;
			var errorNumber=false;
			console.log("1");
			do{
				var x=s.indexOf('vmess://');
				if (x==-1){
		
					exitNumber=true;
			 
					break;
				}
				var l=s.length; 
				var sub=s.substring(x,l);
			 
				var l1=sub.length;
				var x1=sub.indexOf('</p');
				 
				if(x1==-1){
					errorNumber=true;
				 
					break;
				}
				console.log("4");
				var ts=sub.substring(0,x1) ;
				console.log("5");
				tems=tems+ts +'\r\n'; 
				s=sub.substring( x1, l1-x1 );
		
			}while (exitNumber==false);
			console.log(tems); 
			if(errorNumber==false){
				vmessListString=vmessListString+tems;
			 
			} 
			break;
		}
		case 1:{

			var tems='';
			var s=htmlString;
			var exitNumber=false;
			var errorNumber=false;
			console.log("1");
			var n=0;
			do{
				var x=s.indexOf('vmess://');
				if (x==-1){
					exitNumber=true;
					break;
				}
				var l=s.length; 
				var sub=s.substring(x,l );
				//console.log(sub);
				var x1=sub.indexOf('</code>');
				if(x1==-1){
					errorNumber=true;
					break;
				}
				var tems=sub.substring(0,x1) ;
				console.log(tems);
				break;

			}while (exitNumber==false);
		 
			//console.log(tems); 
			if(errorNumber==false){
				vmessListString=vmessListString+tems;
			 
			} 
		
			break;
		}

		case 2:{

			var tems='';
			var s=htmlString;
			var exitNumber=false;
			var errorNumber=false;
			console.log("1");
			do{
				var x=s.indexOf('vmess://');
				if (x==-1){
		
					exitNumber=true;
			 
					break;
				}
				var l=s.length; 
				var sub=s.substring(x,l);
			 
				var l1=sub.length;
				var x1=sub.indexOf('</p>');
				 
				if(x1==-1){
					errorNumber=true;
				 
					break;
				}
				console.log("4");
				var ts=sub.substring(0,x1) ;
				console.log("5");
				tems=tems+ts +'\r\n'; 
				s=sub.substring( x1, l1-x1 );
		
			}while (exitNumber==false);
			console.log(tems); 
			if(errorNumber==false){
				vmessListString=vmessListString+tems;
			 
			} 
			break;
		}

		case 3:{

			var tems='';
			var s=htmlString;
			var exitNumber=false;
			var errorNumber=false;
			console.log("1");
			var n=0;
			do{
				var x=s.indexOf('vmess://');
				if (x==-1){
					exitNumber=true;
					break;
				}
				var l=s.length; 
				var sub=s.substring(x,l );
				//console.log(sub);
				var x1=sub.indexOf('</code>');
				if(x1==-1){
					errorNumber=true;
					break;
				}
				var tems=sub.substring(0,x1) ;
				console.log(tems);
				break;

			}while (exitNumber==false);
		 
			//console.log(tems); 
			if(errorNumber==false){
				vmessListString=vmessListString+tems;
			 
			} 
		
			break;
		}


	}


 }

    
	
function getCall(index, isWriteToFile, callbackFunction) {

	var options=optionsArray[index];
 
	console.log("--- "+options.host);
    //initialize options values, the value of the method can be changed to POST to make https post calls
    //var userAccessToken = 'CAAKoIMGu5SAyfOyVhugi7cZAaZA1kHzjrdLvtPlndoKzMJ8xZBtR3YV2iX39FSnhxK1lvtfYXO5FvcbK4MVGJphxeYDZC7HJ5FCmhOr2Ys8ZBG9qYNRSfFGuzoeRgwZBdliKvoW6YPl41b8i3dfrTpR98gFAm6qag9vYM2yD0aEv47fnWQWF1SoXRs6PFFrFu5XOe';
    //var appAccessToken = '24562343562751562|hPEXIpDl0CXt0tNJ';
 
	var str = '';
	var decodeString='';
	//making the https get call
	 
    var getReq = https.request(options, function(res) {
        res.on('data', function(data) {
			str += data;
		});
		res.on("end", function() {
			//decodeHTML_Alvin9999(str);
			decodeHTML(index, str);
			console.clear;

			if(isWriteToFile){

				/*
				fs.writeFile('url.txt', vmessListString, function (err) {
					console.log(vmessListString);
					if (err){
						
						console.log(err);
						return callbackFunction();
					}  
					console.log('ok');
				 
				 
					return callbackFunction();

				  });


				  */
				fs.writeFile('url.txt', vmessListString, function (err) {

					if (err) {
						console.log(err);
						return callbackFunction();
					}
					//execProcess.result
					execProcess("sh command1.sh", function(err, response){// 
					//execProcess("command1.bat", function(err, response){//sh command1.sh
						if(!err){
							console.log(response);
							return callbackFunction();
						}else {
							console.log(err);
							return callbackFunction();
						}
					});

				  });
			 
				 


			}else{

				return callbackFunction();
			}
			/*
			if(isWriteToFile){

				if (bak=='') { 
					fs.writeFile('url.txt', vmessListString, function (err) {
						//console.log(vmessListString);
						if (err){
							
							console.log(err);
							return callbackFunction();
						}  
						console.log('ok');
						bak=vmessListString; 
					 
					//	execProcess.result("command1.bat", function(err, response){//sh command1.sh
						//	if(!err){
						//		console.log(response);
						//		return callbackFunction();
						//	}else {
						//		console.log(err);
						//		return callbackFunction();
						//	}
					//	});
					 
						return callbackFunction();
	
					  });
	
				}
					
				else{
	
					if(vmessListString!=bak){
				 
						var today = new Date();
						var time = today.getFullYear()+'/'+today.getMonth()+'/'+today.getDay()+' '+ today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
						
						console.log('change on time:'+time.toString());
						fs.writeFile('url.txt', vmessListString, function (err) {
							if (err) {
								console.log(err);
								return callbackFunction();
							}
							 console.log('ok');
							bak=vmessListString; 
							execProcess.result("command1.bat", function(err, response){//sh command1.sh
								if(!err){
									console.log(response);
									return callbackFunction();
								}else {
									console.log(err);
									return callbackFunction();
								}
							});
	
						  });

					}else{
						var today = new Date();
						var time = today.getFullYear()+'/'+today.getMonth()+'/'+today.getDay()+' '+ today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
						console.log('same:'+time.toString());
						return callbackFunction();
					 
					}
					 
	
				}
				 


			}else{

				return callbackFunction();
			}



			*/
 
			//return callbackFunction;    

			 
			//clipboardy.writeSync(vmessListString);
			 
			//clipboardy.readSync();
        });
	 
    });
 

	 
	//end the request
 
 
	getReq.end();
	 
    getReq.on('error', function(err){
		console.log("Error: ", err);

         
	}); 

 
}
//----------------------------------------------------------------------
 
var today = new Date();
var time = today.getFullYear()+'/'+today.getMonth()+'/'+today.getDay()+' '+ today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
					 
console.log('change on time:'+time.toString());

function startToRun(){

	vmessListString='';

	isRun=true;

	getCall(0, false,function(){
	 
		getCall(1,false,function(){
			getCall(2,false,function(){
			
				getCall(3,true,function(){
			
					//process.exit(1);

					const timeoutObj = setTimeout(() => {

						if(isRun) startToRun();

					  }, 7200);

				});
			});
		});
	});
}
startToRun();

//-----------------------------------------
 
 
// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

//add other middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'));
//---------------------------------------------------------------
 
app.get('/stop/', async (req, res) => {
	
	 

	isRun=false;
	res.send({
		status: false,
		message: 'stop'
	});

});
app.get('/github/', async (req, res) => {
	
	        //execProcess.result
			execProcess("command1.bat", function(err, response ){//sh command1.sh
				if(!err){
					console.log(response );
				//	return callbackFunction();
				}else {
					console.log(err);
				//	return callbackFunction();
				}

				 

				 
			});

			res.send({
				status: false,
				message: 'git'
			});

		});
app.post('/upload/', async (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {

			 
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
			let a = req.files.file;
			console.log(req.files);
			/*
			for(var i=0;i<req.files.length-1;i++){

				console.log(req.files[i]);

			}
		 
			*/
			
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
			a.mv('./' + a.name);
			console.log("1");
			console.log(a);
			 
			console.log("2");
		 
			/*
			setInterval(function() {
				execProcess.result("command1.bat", function(err, response ){//sh command1.sh
					if(!err){
						console.log(response );
					//	return callbackFunction();
					}else {
						console.log(err);
					//	return callbackFunction();
					}
	  
				});
			  }, 100);

			  */
			 
 
			res.send({
				status: false,
				message: 'git'
			});

			/*

			res.send({
				status: true,
				message: 'File is uploaded',
				data: {
					name: a.name,
					mimetype: a.mimetype,
					size: a.size
				}
			});
			*/

             
        }
    } catch (err) {
        res.status(500).send(err);
    }
});
 
//---------------------------------------------------------------app
// default route
app.get("/", function (req, res) {
	return res.send({ e: "f", i: "." });
  });

app.get("/Grapetreetown306/", function (req, res) {

	let user_id = req.params.id;
    res.sendFile(path.join(__dirname, '/',  "url.txt"));
	 
});
  
app.listen(process.env.PORT || 3002, function () {
	console.log("Node app is running on port 3002");
  });
  
  
/*
 
//var interval = setInterval(getCall(0), 60*1000);
 
//  clearInterval(interval);

 
 
  var http=require('http');
  http.get('https://github.com/Alvin9999/new-pac/wiki/v2ray%E5%85%8D%E8%B4%B9%E8%B4%A6%E5%8F%B7', function(res){
	   var str = '';
	   console.log('Response is '+res.statusCode);

	   res.on('data', function (chunk) {
			  str += chunk;
		});

	   res.on('end', function () {
			console.log(str);
	   });

 })
*/