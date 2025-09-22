from pydantic import BaseModel
class ToDo(BaseModel):
    todo:str
    completed:bool
   

    
