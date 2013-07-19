var http = require('http');
var url = require('url');

function start(route, handle){
    var server = http.createServer(
        function(req, res){
            
            var pathname = url.parse(req.url).pathname;
            var query = url.parse(req.url, true).query;
            
            route(handle,pathname,query,res);         
        }
    );
    server.listen(8000);
}

exports.start = start;
