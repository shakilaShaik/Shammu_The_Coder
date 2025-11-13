const http = require('http')

const server = http.createServer( (req, res) => {
    res.writeHead(200, { 'content-type': 'text/html' })

    res.end(
        ("<h1>Hello , I am servr created by shammu by node</h1>")
    )
})
server.listen(3000, () => {
    console.log("server is listeing")
})

const http = require('http');

const server = http.createServer((req, res) => {


    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end("<h1>Welcome to Home Page</h1>");
    } else if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end("<h1>About Page: I am Shammus Node.js server</h1>");
    } else if (req.url === '/contact') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end("<h1>Contact Page: You can reach me at shammu@example.com</h1>");
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end("<h1>404 Page Not Found</h1>");
    }
});

server.listen(3000, () => {
    console.log("Server is listening on http://localhost:3000");
});
