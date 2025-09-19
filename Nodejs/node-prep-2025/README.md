#Node js
2009 - ran dal (the developer)
It is built on the v8 engine which is in the chrome browser.(c++)
we can say that node js is the run time environment for the javascript out of the browser.
local storage, dom apis are not available in the node js.
Asynchronous non blocking i/o model - becuase of the web apis help for the timers , fetch , file readings - node js leaves these tasks to the web apis.
signle thread can manage multiple threads - by event loop
The call back queue is created for all the sychronous tasks and the queue is checked by event loop every time for the functions executions and then
if any task found it adds to the call stack. 
call stack executes the function and pop out from it.

