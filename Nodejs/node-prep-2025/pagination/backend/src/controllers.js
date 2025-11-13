import { User } from "./Model.js";
export  const getUsers= async()=>{
    
    try {
        const userList=await User.find()
        console.log("the user list is", userList);
        return userList
    } catch (error) {
        console.log(error);
        return error
    }
    
     }
    