import { error } from 'console'
import express from 'express'
import { Worker } from 'worker_threads'
// import {w}
const app = express()
const threads_count = 8


function createWorker() {
  return new Promise((res,rej)=> {
    const worker = new Worker("./worker.js", {
      workerData: { thread_count: threads_count }
      
    })
    worker.on("message", (data) => {
      res(data)
    })
    worker.on("error", (error) => {
      rej(error)
    })

 })
}

app.get("/", async (req, res) => {
  const workerPromises = []
  for (let i = 0; i < threads_count; i++){
    workerPromises.push(createWorker())
  }
  
  const threadRes = await Promise.all(workerPromises);
  const total = threadRes[0] + threadRes[1] + threadRes[2] + threadRes[3]
  
 
res.json({msg:`the count is ${total}`})
})
app.listen(3000, () => {
  console.log("the app is listening")
})