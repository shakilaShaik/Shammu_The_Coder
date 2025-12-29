const http = require('http')
// const eventEmmitter = require('events')

// const server = http.createServer((req, res) => {
//     res.end("created a server")

// })
// server.listen(3000, () => {
//     console.log("server is listening on port 3000")
// })

// emmitter= new eventEmmitter()
// emmitter.on('call',()=>{
//     console.log("event is executed")

// })
// emmitter.emit('call') // trigger the event 

const fs = require('fs');

// Create a readable stream
const stream = fs.createReadStream('shammu.txt', { encoding: 'utf8' });

// Listen for data chunks
stream.on('data', (chunk) => {
    console.log('Received chunk:', chunk);
});

// Listen for end of file
stream.on('end', () => {
    console.log('No more data.');
});



// Watch a file for changes
fs.watch('shammu.txt', (eventType, filename) => {
    if (filename) {
        console.log(`File ${filename} changed, Event type: ${eventType}`);
    }
});
