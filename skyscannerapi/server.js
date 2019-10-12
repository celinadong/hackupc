function browseRoutes(originCountry, origin, destination, outDate, inDate) {
    var url = new URL("https://www.skyscanner.net/g/chiron/api/v1/flights/browse/browseroutes/v1.0"),
    url = url + '/' + originCountry + '/EUR/en-GB/' + origin + '/' + destination + '/' + outDate + '/' + inDate;
    document.write("browse url: " + url);
    params = {country: originCountry,
              currency: "EUR",
              locale: "en-GB",
              originPlace: origin,
              destinationPlace: destination,
              outboundPartialDate: outDate,
              inboundPartialDate: inDate}
    url.search = new URLSearchParams(params)
    return fetch(url, {
        method: 'GET',
        headers: {
            'api-key': 'skyscanner-hackupc2019',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With'
        }
        
    }).then(res => res.json())
      .then(response => {
          var data = JSON.parse((JSON.stringify(response)));

          var lowest_price = data["Quotes"][0].MinPrice;
          for (i = 1; i < data["Quotes"].length; i++) {
              if (data["Quotes"][i].MinPrice < lowest_price) {
                  lowest_price = data["Quotes"][i].MinPrice;
                  var outbound_dt = data["Quotes"][i].OutboundLeg.DepartureDate;
                  var out_id = data["Quotes"][i].OutboundLeg.CarrierIds[0];
                  var inbound_dt = data["Quotes"][i].InboundLeg.DepartureDate;
                  var in_id = data["Quotes"][i].InboundLeg.CarrierIds[0];
                  var direct = data["Quotes"][i].Direct;
              }
          }

          for (i = 0; i < data["Carriers"].length; i++) {
            if (data["Carriers"][i].CarrierId == out_id) {
                var out_airline = data["Carriers"][i].Name;
            }
          }

          for (i = 0; i < data["Carriers"].length; i++) {
            if (data["Carriers"][i].CarrierId == in_id) {
                var in_airline = data["Carriers"][i].Name;
            }
          }
          
          document.write('<h1 align="center"><font size="20">' + "<b>Flight Details<b><br>" + '</font></h1>');
          document.write('<font face="Verdana" size="20"><center><table width="50%" height="75%" border="1" bgcolor="#888888">');
          document.write('<tr align="center"><td>' + "<b>Flight</b>" + '</td><td>' + origin + " - " + destination + '</td></tr>');
          document.write('<tr align="center"><td>' + "<b>Price</b>" + '</td><td>' + lowest_price + "€" + '</td></tr>');
          document.write('<tr align="center"><td>' + "<b>Direct Flight?</b>" + '</td><td>' + direct + '</td></tr>');
          document.write('<tr align="center"><td>' + "<b>Outbound</b><br><br>Date and Time<br><br>Airline" + '</td><td>' + origin + " - " + destination + "<br><br>" + outbound_dt + "<br><br>" + out_airline + '</td></tr>');
          document.write('<tr align="center"><td>' + "<b>Inbound</b><br><br>Date and Time<br><br>Airline" + '</td><td>' + destination + " - " + origin + "<br><br>" + inbound_dt + "<br><br>" + in_airline + '</td></tr>');
          document.write('</table></center></font>');


        //   document.write("Flight " + origin + "-" + destination + "<br>");
        //   document.write("Price " + lowest_price + "€<br>");
        //   document.write("Direct? " + direct + "<br>");
        //   document.write("Outbound " + origin + "-" + destination + ":<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp");
        //   document.write("Date and Time " + outbound_dt + "<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp");
        //   for (i = 0; i < data["Carriers"].length; i++) {
        //       if (data["Carriers"][i].CarrierId == out_id) {
        //           document.write("Airline " + data["Carriers"][i].Name + "<br>");
        //       }
        //   }
        //   document.write("Inbound " + destination + "-" + origin + ":<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp");
        //   document.write("Date and Time " + inbound_dt + "<br>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp");
        //   for (i = 0; i < data["Carriers"].length; i++) {
        //       if (data["Carriers"][i].CarrierId == in_id) {
        //           document.write("Airline " + data["Carriers"][i].Name + "<br>");
        //       }
        //   }

      }).catch(error => console.error('Error:', error));
}
