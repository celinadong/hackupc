var express = require("express");
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var MongoClient = require('mongodb').MongoClient;8

app.options("/*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendStatus(200);
});

// app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, '/form.html'))
// })

app.post('/add_person', function (req, res) {
    console.log("Add Person request received");
    console.log("Adding name: " + req.body.Name);
  
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
      if (err) throw err;
  
      var dbo = db.db("testDB");
  
      if (dbo)
         console.log("DBO is not null")
  
      dbo.collection("person").insertOne(req.body, function (err, result) {
        if (err)
          console.log("Error is: " + JSON.stringify(err));
  
        console.log("Result is: " + JSON.stringify(result));
  
        res.header('Access-Control-Allow-Origin', '*');
        res.json(result);
        res.end();
        db.close();
      });
  
    });
  });

  app.post('/match_people', function(req, res) {
      console.log("Matching people of similar ages, dates of travel and same language preferences, same choice of destination");
      console.log("Entered name is " + req.body.Name);
      var url = "mongodb://localhost:27017/";

      MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
    
        var dbo = db.db("testDB");
    
        if (dbo)
          console.log("DBO is not null");
        
        dbo.collection("person").findOne({ Name: req.body.Name}, async function (err, result) {
            if (err)
              console.log("Error is: " + JSON.stringify(err));
            
            var compatible = [];
            var index = 0;

            var age = result.Age;
            var language = result.Language;
            var home = result.Home;
            var destination = result.Destination;
            var date = result.Date_;
            var availability = result.Availability;
            var form_id = result.Form_Id;
            
            data = await dbo.collection("person").find({Destination: destination}).toArray();
                people_collection = data;
                var startDate;
                var endDate;

                // the normal form was filled in
                for (var i = 0; i < people_collection.length; i++) {
                        var consider = people_collection[i];
                        var x1 = parseInt(date);
                        var x2 = parseInt(date) + parseInt(availability);

                        var y1 = parseInt(consider.Date_);
                        var y2 = parseInt(consider.Date_) + parseInt(consider.Availability);

                        var e = Math.max(x1,y1);
                        var f = Math.min(x2,y2);

                        // if they have the same language, their age difference is within 10 years and their dates of travel overlap with each other, they are compatible travel partners
                        if (consider.Form_Id !== form_id && consider.Language === language) {
                            if (Math.abs(age - consider.Age) < 10) {
                                if ( e <= f ) {
                                    console.log("range is: " + e + " to " + f);
                                    startDate = e;
                                    endDate = f;

                                    compatible[index] = consider;
                                    index++;
                                }
                            }
                        }
                    } 
                var param = {users: compatible, home: home, destination: destination, startDate: startDate, endDate: endDate};
                res.json(param);
                db.close();
            });
        });
        return res.redirect('flight_details.html'); 
    });  

    app.listen(5000, () => {
        console.log("Server running on port 5000");
    });