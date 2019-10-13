var https = require('https');
var MongoClient = require('mongodb').MongoClient;
// var async = require("async")


//Set constants
var mongoURI = "mongodb://localhost:27017/formation_audio";
var responsesCollection =  'responses';



var dbConnection = null;

//Begin by opening a connection to MongoDB
MongoClient.connect(mongoURI, function(err, db){
	if(err || !db){
		console.log(err, db);
		return process.exit();
    }
    
    dbConnection = db;
    
var options2 = {
    'method': 'GET',
    'hostname': 'api.videoask.it',
    'path': '/forms/0247e57c-0aea-472d-9151-d9e693279db4',
    'headers': {
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1UTkJRamhFUmpZd05VRXlRakpFUkRGRk5rSXpPRGc0T0RZMlFqWTNSamd3TURoRVFUVTROZyJ9.eyJpc3MiOiJodHRwczovL2F1dGgudmlkZW9hc2suaXQvIiwic3ViIjoib2F1dGgyfHR5cGVmb3JtfGlyb2RvdG9zdGVycGl6aXNAZ21haWwuY29tIiwiYXVkIjpbImh0dHBzOi8vYXBpLnZpZGVvYXNrLml0LyIsImh0dHBzOi8vdmlkZW9hc2suZXUuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTU3MDkxNjkxOSwiZXhwIjoxNTcwOTI0MTE5LCJhenAiOiJwM01tMzhqUmlkZWhTTU1PQTk3bFR2SjI3UENubkdKaCIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgb2ZmbGluZV9hY2Nlc3MifQ.XnkSq4NVyxsqzEPvkl_tgE3uAx9tTSQ4D3tdmPg11coDQDXNhRHEgbKF-rCsNKYkXRqfEXYZe1hZqsZqILxPhBWvcYF6qMkejWzt6905u8aga7R-tpNQ651xa-jsLxCWkJKu7ZN0CE1wsqgEKlOC5q8sGqqvCRj7Rdr0CHVgM3mFpp9gNYTpPn1lqHEe4vQurHSP2gVVCy4MhcZ2FVKqLaVW_DVvsH2ECyQOOsWVNGmncMlCYblIYCCqHAy3bWtJ24vm6xQJi-tdQiSa_JniUe5dfy_agMm5ChBP7ph3GZKfBKt5FWNBKlNIB1tcSTqw1Dbp1DzZJk5WjN9WCPpo7Q',
      'Content-Type': '<string>'
    }
  };

  var qids = []
  var formID = '';
  // get the question id's so that we can get the responses to each question.
  var req = https.request(options2, function (res) {
    var chunks = [];
   
  
    res.on("data", function (chunk) {
      chunks.push(chunk);
    });
  
    res.on("end", function (chunk) {
      var body = Buffer.concat(chunks);
      var j =  JSON.parse(body)
      console.log("first query activated")
    // console.log(j)
    
    //get the question ids for the 3 video questions so that we can request their responses
      qids.push(j.questions[0].question_id,j.questions[1].question_id,j.questions[2].question_id)
      formID = j.questions[0].form_id;
    //   console.log(qids)
    //   console.log(j.questions)
   
    // async.waterfall([
	// 	qids.forEach(getResponse),
    //     createRecord(dict_users)
		
	// ],
	// function(err, finalResult){
	// 	if(err){ console.log(err) }
	// 	process.exit();
    // });
    qids.forEach(getResponse)

    // const delay = ms => new Promise(_ => setTimeout(_, ms));

    // // usage:
    // function sayWoof() {
    // delay(500).then(() => console.log("Woof"));
    // }

    // setTimeout(createRecord(dict_users), 500)
    // createRecord(dict_users)

    //delay functio

    //create record function

      
    //   console.log(dict_users)
            

    });
  
    res.on("error", function (error) {
      console.error(error);
    });
  });
  
  req.end();

// qids.forEach(getResponse);

var dict_users = {};

function getResponse(id){
    console.log("response activated for id"+ id)
   
    var qid = id;
    var options = {
        'method': 'GET',
        'hostname': 'api.videoask.it',
        'path': '/questions/'+ qid + '/answers',
        'headers': {
          'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1UTkJRamhFUmpZd05VRXlRakpFUkRGRk5rSXpPRGc0T0RZMlFqWTNSamd3TURoRVFUVTROZyJ9.eyJpc3MiOiJodHRwczovL2F1dGgudmlkZW9hc2suaXQvIiwic3ViIjoib2F1dGgyfHR5cGVmb3JtfGlyb2RvdG9zdGVycGl6aXNAZ21haWwuY29tIiwiYXVkIjpbImh0dHBzOi8vYXBpLnZpZGVvYXNrLml0LyIsImh0dHBzOi8vdmlkZW9hc2suZXUuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTU3MDkxNjkxOSwiZXhwIjoxNTcwOTI0MTE5LCJhenAiOiJwM01tMzhqUmlkZWhTTU1PQTk3bFR2SjI3UENubkdKaCIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwgb2ZmbGluZV9hY2Nlc3MifQ.XnkSq4NVyxsqzEPvkl_tgE3uAx9tTSQ4D3tdmPg11coDQDXNhRHEgbKF-rCsNKYkXRqfEXYZe1hZqsZqILxPhBWvcYF6qMkejWzt6905u8aga7R-tpNQ651xa-jsLxCWkJKu7ZN0CE1wsqgEKlOC5q8sGqqvCRj7Rdr0CHVgM3mFpp9gNYTpPn1lqHEe4vQurHSP2gVVCy4MhcZ2FVKqLaVW_DVvsH2ECyQOOsWVNGmncMlCYblIYCCqHAy3bWtJ24vm6xQJi-tdQiSa_JniUe5dfy_agMm5ChBP7ph3GZKfBKt5FWNBKlNIB1tcSTqw1Dbp1DzZJk5WjN9WCPpo7Q'
        }
      };
    
    var req = https.request(options, function (res) {
        var chunks = [];
        
        
        res.on("data", function (chunk) {
            chunks.push(chunk);
        });
        
        res.on("end", function (chunk) {
            var body = Buffer.concat(chunks);
            

            j = JSON.parse(body)
        
            // console.log(j)
            // console.log(j[0].transcription)
            // console.log(j[1].transcription)
            var i;
            for (i = 0; i < j.length; i++) {
                var cont_id = j[i].contact_id
                var transcription = j[i].transcription
            //   console.log(cont_id);
                console.log(transcription);

                var temp = []
                temp.push(dict_users[cont_id])
                temp.push(transcription)
                dict_users[cont_id] = temp
                console.log("dict record for " + cont_id+ "is " + temp)
            
            }        

        });
        
        res.on("error", function (error) {
            console.error(error);
    });
 });
    
//   updateMongo(req.body, console.log )
    
    req.end();
}

// get request to videoAsk server to provide the response of the video form

   
});
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

// this will give me all the responses every time so we will have duplicates, we need to know what records 
// we already have. use form id for this, and set offset and limit attributes in the query.

var createRecord = function(dict){
    console.log("record creation")

    console.log(Object.keys(dict));

    if (isEmpty(dict)) {
        console.log("dict empty")
        return;

    }

    Object.keys(dict).forEach(function(key) {

        var ans1 = dict[key][0].split(" ");

        var name = ans1[2];
        var age = ans1[4];
        var language = ans1[6];
        console.log(name,age,language)
        
        var ans2 = dict[key][1].split(" ");
        var city = ans2[2];
        console.log(city)

        var ans3 = dict[key][2].split(" ");
        var date = ans3[2];
        var month  = ans3[4]
        switch(month){
            case "January": b = 1;
                break;
            case "February": b = 2;
                break;
            case "March": b = 3;
                break;
            case "April": b = 4;
                break;
            case "May": b = 5;
                break;
            case "June": b =6;
                break;
            case "July": b =7;
                break;
            case "August": b = 8;
                break;
            case "September": b = 9;
                break;
            case "October": b = 10;
                break;
            case "November": b = 11;
                break;
            case "December": b =12;
                break;
        }
         month = b;
        var days = ans1[6];

        console.log(date,month,days)
        var d  = new Date(2019, month, date);
        var response = {
            "name":name,
            "age":age,
            "language":language,
            "city":city,
            "date":d,
            "days_available":days,
            "form_id":formID
        }
        //MISSING THE TIME STAMP!!!!!!!!!!!
        console.log("record created")

        console.log(response);

        updateMongo(response);

        // console.log(key, dictionary[key]);
    });

    
}
var updateMongo = function(typeformData, callback){
    console.log("updateMongo activated")
    var response = typeformData;
	//create an object for the response. This will be the format of my records in the database
	// var responses = { "answers": typeformData.form_response.answers,
	// 					"form_id": typeformData.form_response.form_id ,
	// 					"timestamp": typeformData.form_response.submitted_at};


	insertResponses(responses, function(err, result){
		if(err){callback(err)}
	});
}

var insertResponses = function(responses, callback){
	console.log("insertResponse activate")
	// insert record in the collection.
	dbConnection.collection(responsesCollection).insertOne(responses, function(err, result){
		if(err){return callback(err);}
		callback(null, result);
	});
}



