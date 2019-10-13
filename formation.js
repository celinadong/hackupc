
//TO RUN:
// run the server -> node formation.js
// then run the local tunnel tool -> lt -p 3000 -s eric
// both of those must be running for the application to work.


//Require libs
var MongoClient = require('mongodb').MongoClient;
const express = require('express')
const bodyParser = require('body-parser')


//Set constants
var mongoURI = "mongodb://localhost:27017/formation";
// var responsesCollection =  'responses';
var peopleCollection = 'person';

var dbConnection = null;

//Begin by opening a connection to MongoDB
MongoClient.connect(mongoURI, function(err, db){
	if(err || !db){
		console.log(err, db);
		return process.exit();
	}
	dbConnection = db;

	// start the server
	const app = express()
	app.use(bodyParser.json())
	const port = 3000

	app.get('/', (req, res) => res.send('Hello World!'))
	
	// post request to webhook. As soon as a submition happens, the req will be the payload in json format
	// used the local tunnel tool to stantarised my local host into (https://eric.localtunnel.me) a website so the web hook would work
	// provided the address https://eric.localtunnel.me/mywebHook into the webhook option in my typeform account, under my chosen form

	app.post('/mywebHook',(req, res) => {
		//update my database with the response
		updateMongo(req.body, console.log )
		res.status(200).send()	} ) // payload is in the request


	app.listen(port, () => console.log(`Example app listening on port ${port}!`))

	
});


var updateMongo = function(typeformData, callback){
	var answers = typeformData.answers;
	console.log(answers)
	// var name = answers[0].text;
	// var age = answers[1].number;
	// var language = answers[2].choice.label;
	// var home = answers[3].text;
	// var destination = answers[4].choice.label;
	// var date = answers[5].date;
	// var availability = answers[6].number;
	// var form_id = typeformData.form_response.form_id;

	// var param = {Name: name, Age: age, Language: language, Destination: destination, Date_: date, Availability: availability, Form_Id: form_id};
	
	// dbConnection.collection("responses").insertOne(param, function (err, result) {
    //     if (err)
    //       console.log("Error is: " + JSON.stringify(err));
  
    //     console.log("Result is: " + JSON.stringify(result));
  
    //     res.header('Access-Control-Allow-Origin', '*');
    //     res.json(result);
    //     res.end();
    //     db.close();
    // });
	
	//create an object for the response. This will be the format of my records in the database
	// var responses = { "answers": typeformData.form_response.answers,
	// 					"form_id": typeformData.form_response.form_id ,
	// 					"timestamp": typeformData.form_response.submitted_at};*/


	// insertResponses(responses, function(err, result){
	// 	if(err){callback(err)}
	// });
}

var insertResponses = function(responses, callback){
	
	// insert record in the collection.
	dbConnection.collection(responsesCollection).insertOne(responses, function(err, result){
		if(err){return callback(err);}
		callback(null, result);
	});
}









