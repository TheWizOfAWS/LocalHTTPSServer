var fs = require('fs'); 
var https = require('https'); 
var options = { 
    key: fs.readFileSync('server-key.pem'), 
    cert: fs.readFileSync('server-crt.pem'), 
    ca: fs.readFileSync('ca-crt.pem'), 
};
https.createServer(options, function (req, res) { 
    console.log(new Date()+' '+ 
        req.connection.remoteAddress+' '+ 
        req.method+' '+req.url); 
    res.writeHead(200);
    if(req.url == '/'){
        try{
            var htmlFile = String(fs.readFileSync('www' + req.url + 'index.html'));
            res.end(htmlFile);
        } catch(e){
            res.end("404 File not found");
        }
    } else {
        var requestURL = String(req.url).split('?');
        if(requestURL[0].slice(-1) == '/'){
            try{
                var htmlFile = String(fs.readFileSync('www' + requestURL[0] + 'index.html'));
                res.end(htmlFile);
            } catch(e){
                res.end("404 File not found");
            }
        } else {
            try{
                var htmlFile = String(fs.readFileSync('www' + requestURL[0]));
                res.end(htmlFile);
            } catch(e){
                res.end("404 File not found");
            }
        }
    }
}).listen(3000, 'localhost');