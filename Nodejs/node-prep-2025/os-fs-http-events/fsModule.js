const fs = require('fs')


fs.writeFile('shammu.txt',"Hey i am from file shammu.txt",(err)=>{
    console.log("completed writing a file ")

})

fs.readFile('shammu.txt', 'utf8',(err,data)=>{
    console.log("completed file reading", data)
    console.log("errors is ", err)
})

const a = fs.writeFileSync("shammu.txt", "I am chaning text")


const b = fs.readFileSync("shammu.txt", 'utf-8'
)
console.log(b)

fs.appendFile("shammu.txt", "I am appending something to the existing file")
fs.unlink("shammu.txt", (err)=>{
    console.log(err)
})