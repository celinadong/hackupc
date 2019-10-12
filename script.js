// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', 'https://www.skyscanner.net/g/chiron/', true)

// Access data
request.onload = function() {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response)
  
    if (request.status >= 200 && request.status < 400) {
      data.forEach(movie => {
        console.log(movie.title)
      })
    } else {
      console.log('error')
    }
  }
  // Send request when done 
  request.send()

  //var params = {form_id: "NTney3"};



  
// function callTypeForm() {
//   return fetch('https://api.typeform.com/forms/NTney3/responses', {
//         method: 'GET',
//         //body: JSON.stringify(params),
//         headers: {
//             'Authorization': 'Bearer T6ixwKxJtoEqXDzZdSL5np5sHeDdwCqKPVEn1pqpzj4',
//             'Content-Type': 'application/json',
//             'Access-Control-Allow-Origin': '*',
//             'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
//             'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With'
//         }
//     }).then(res => res.json())
//         .then(response => console.log(JSON.stringify(response)))
//         .catch(error => console.error('Error:', error));
// }

// //GetWebAPI("https://api.typeform.com/forms/NTney3/responses", params, callBack);



