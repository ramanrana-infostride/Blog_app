import mongoose from "mongoose"

  const Connection = async(DB_URL) => {

    mongoose.set("strictQuery", false);
  
    try {
       await mongoose.connect(`${DB_URL }`,{ useNewUrlParser: true});
       console.log("Connected to Database");
    } catch (error) {
        console.log(`Error Connecting to database ${error}`);
        
    }
}   

export default Connection;