#Node js
2009 - ran dal (the developer)
```It is built on the v8 engine which is in the chrome browser.(c++)
we can say that node js is the run time environment for the javascript out of the browser.
local storage, dom apis are not available in the node js.
Asynchronous non blocking i/o model - becuase of the web apis help for the timers , fetch , file readings - node js leaves these tasks to the web apis.
signle thread can manage multiple threads - by event loop
The call back queue is created for all the sychronous tasks and the queue is checked by event loop every time for the functions executions and then
if any task found it adds to the call stack. 
call stack executes the function and pop out from it.```


The node js runs on the event driven architecture and its responsible for the events and thats y its used in live streaming , chat applications,
It listens for the events to happen and then executes the call back according to it.
The node js works on the principle of non blocking i/o model - it works with the help of libUV

```const fs = require('fs');

fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
```







JS calls fs.readFile.

Node.js delegates the request to libuv.

libuv offloads the file read to the thread pool (since most file I/O is not async at the OS level).

When done, libuv pushes the callback into the event loop’s queue.

The event loop executes the callback when the call stack is free.

