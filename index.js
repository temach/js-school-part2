const http = require('http');
const names = require('./names');

let count = 10;

function generateNewitem() {
    return names[Math.trunc(Math.random() * names.length)];
}

http.createServer(function (req, res) {
    if (req.url === '/get-data') {        
        const data = [];
        for (let i = 0; i < count; i++) {
            data.push({
                name: generateNewitem(),
                house: Math.trunc(Math.random() * names.length * 2),
            });
        }
        count *= 2;
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(data));
        return;
    }    
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end();
}).listen(3000);