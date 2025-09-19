const os= require('os')

console.log(os.freemem())  // to get the whole memory in our system

console.log("the host name",os.hostname())
console.log("The architecture of the system is",os.arch())
console.log(os.getPriority())
console.log(os.type())
console.log(os.version())
console.log(os.uptime())
console.log(os.homedir())