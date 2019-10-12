// Create a request variable and assign a new XMLHttpRequest object to it.
var request = new XMLHttpRequest()

// Open a new connection, using the GET request on the URL endpoint
request.open('GET', "https://www.skyscanner.net/g/chiron/api/v1/flights/browse/browsequotes/v1.0/ES/EUR/en-US/BCN/EDI/2019-10-15/2019-10-18", true)

"https://www.skyscanner.net/g/chiron/api/v1/flights/browse/browseroutes/v1.0/ES/EUR/en-US/BCN/BIO/2019-10-15/2019-10-18?"
request.onload = function() {
    // Begin accessing JSON data here
    var quote = JSON.parse(this.response)

    quote.forEach(place => {
    // Log each movie's title
    console.log(place.Places)
    })
}

// Send request
request.send()