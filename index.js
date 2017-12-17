const http = require('http');
const names = require('./names');

let count = 10;
let click = 0;

function generateNewitem() {
    return names[Math.trunc(Math.random() * names.length)];
}

http.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	res.setHeader('Access-Control-Allow-Headers', '*');
    if (req.url === '/reset') {        
        count = 10;
        click = 0;
    }
    if (req.url === '/get-data') {   
        click++;     
        const data = [];
        for (let i = 0; i < count; i++) {
            data.push({
                name: generateNewitem(),
                house: Math.trunc(Math.random() * names.length * 2),
            });
        }        
        if (click <= 10) {
            count *= 4;
            if (click === 10) {
                count = count * 10;
            }
        }
        res.writeHead(200, {'Content-Type': 'application/json'});        
        res.end(JSON.stringify(data));
        return;
    }    
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end();
}).listen(3000);