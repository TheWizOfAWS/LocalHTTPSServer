var fs = require('fs');
var https = require('https');
var options = {
    key: fs.readFileSync('server-key.pem'),
    cert: fs.readFileSync('server-crt.pem'),
    ca: fs.readFileSync('ca-crt.pem'),
};
https.createServer(options, function (req, res) {
    console.log(new Date() + ' ' +
        req.connection.remoteAddress + ' ' +
        req.method + ' ' + req.url);

    if (req.url.indexOf('/') > -1 && req.url.slice(-4).toLowerCase() != '.jpg' && req.url.slice(-4).toLowerCase() != '.gif' && req.url.slice(-4).toLowerCase() != '.png') {
        //Not an image, load as text.
        if (req.url == '/') {
            try {
                res.writeHead(200);
                var htmlFile = String(fs.readFileSync('www' + req.url + 'index.html'));
                res.end(htmlFile);
            } catch (e) {
                res.end("404 File not found");
            }
        } else {
            var requestURL = String(req.url).split('?');
            if (requestURL[0].slice(-1) == '/') {
                try {
                    res.writeHead(200);
                    var htmlFile = String(fs.readFileSync('www' + requestURL[0] + 'index.html'));
                    res.end(htmlFile);

                } catch (e) {
                    res.end("404 File not found");
                }
            } else {
                try {
                    res.writeHead(200);
                    var htmlFile = String(fs.readFileSync('www' + requestURL[0]));
                    res.end(htmlFile);

                } catch (e) {
                    res.end("404 File not found");
                }
            }
        }
    } else {
        var requestURL = String(req.url).split('?');
        if (requestURL[0].slice(1) != '/') {
            requestURL[0] = '/' + requestURL[0];
        }
        fs.readFile('www' + requestURL[0], function (err, content) {
            if (err) {
                res.writeHead(400, { 'Content-type': 'text/html' })
                console.log(err);
                res.end("No such image");
            } else {
                //specify the content type in the response will be an image
                if (requestURL[0].slice(-4) == '.jpg') {
                    res.writeHead(200, { 'Content-type': 'image/jpg' });
                } else if (requestURL[0].slice(-4) == '.png') {
                    res.writeHead(200, { 'Content-type': 'image/png' });
                } else if (requestURL[0].slice(-4) == '.gif') {
                    res.writeHead(200, { 'Content-type': 'image/gif' });
                }

                res.end(content);
            }
        });
    }
}).listen(3000, 'localhost');
