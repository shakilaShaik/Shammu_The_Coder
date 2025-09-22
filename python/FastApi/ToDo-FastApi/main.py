from fastapi import FastAPI
from requests import request,Response
from to_do_Model import ToDo



app=FastAPI()

my_todos=[]

@app.get("/")
def name():
    return 'Hii'
@app.post("/add")
def add_Todo(todo:ToDo):
    my_todos.append(todo)
    return {"msg":"todo added successfully"}
    

@app.get("/todos")
def get_todos():
    return my_todos

@app.post("/delete")
def delete_todo(index:int):
    deleted=my_todos.remove(my_todos[index])
    return {"msg":"deleted successfully"}

@app.put("/update")
def update_todo(index:int, todo:ToDo):
    my_todos[index]=todo
    return {"msg": "todo is updated"}


    


    