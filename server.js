var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
  var parsedUrl = url.parse(request.url);

  /*
    Your request handler should send listingData in the JSON format as a response if a GET request 
    is sent to the '/listings' path. Otherwise, it should send a 404 error. 

  */
  if (request.method === "GET" && parsedUrl.path === "/listings") {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write(listingData);
    //console.log('200');
    //response.end();
  } else {
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write('Bad gateway error');
    //console.log('404');
    //response.end();
  }
  response.end();
};

fs.readFile('listings.json', 'utf8', function(err, data) {

  //Check for errors
  if(err) { throw err };

  //Save the sate in the listingData variable already defined
  listingData = JSON.parse(data);
  //console.log(listingData);
  //Creates the server
  var server = http.createServer(requestHandler);
  //Start the server
  server.listen(port, function() {
    console.log('Server listening on: http://localhost:' + port);
  });

});



