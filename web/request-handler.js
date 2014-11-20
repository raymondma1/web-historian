var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers.js');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  var filePath = path.join(__dirname, '../archives/sites.txt');
  httpHelpers.headers['Content-Type'] = "text/html";
  var statusCode = 200;
  if(req.method === "GET"){
    if(req.url === "/"){
      var filePath = path.join(__dirname, './public/index.html');
      fs.readFile(filePath,{encoding:"utf8"}, function (err, data) {
        if (err) {
          throw err;
        }
        res.writeHead(statusCode, httpHelpers.headers);
        res.end(data);
      });
      console.log("I got here after I appended");
    }
     else {

      res.writeHead(statusCode, httpHelpers.headers);
      console.log(req.url);
      fs.readFile(filePath, function (err, data) {
        if (err) throw err;
        console.log(data);
        res.end(data);
      });
    }
  }
    var urlText = "";
    if(req.method === "POST") {
      req.on('data', function(chunk){
        urlText += chunk;
        console.log(urlText)
      });
      req.on('end', function() {
        fs.appendFile(archive.paths.list, urlText + "\n", function (err,data) {
          if (err) throw err;
          console.log('It\'s saved!');
          statusCode = 302;
          res.writeHead(statusCode, httpHelpers.headers);
          console.log(data);
          res.end(data);
          //console.log(req._postData.url);
       });
      });

      // fs.appendFile('./archives/sites.txt', req._postData.url + "\n", function (err,data) {
      //   if (err) throw err;
      //   console.log('It\'s saved!');
      //   console.log(req._postData.url);
      // });
    }

};

