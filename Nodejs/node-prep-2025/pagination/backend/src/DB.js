import mongoose from "mongoose";
export const connctDB=async()=>{
    try {
        

        await mongoose.connect("mongodb+srv://test:test@paginationdb.q9jpxdc.mongodb.net/?appName=PaginationDB")
        console.log("the Db is connected");
    } catch (error) {

        console.error(error)
    }
}
connctDB()