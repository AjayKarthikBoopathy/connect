
import { MongoClient } from "mongodb";




const MongoURL = "mongodb+srv://ajay1997:ajay1997@cluster0.c76i2k0.mongodb.net/?retryWrites=true&w=majority"

      //async function createConnection(){
          const client = new MongoClient(MongoURL);   
          //  





//query based search////
const search = async (req, res, next) => {
  try {
    await client.connect() 
  // const filtered_data = await client.db("scrape").collection("amazon").find({}).toArray();
  //       console.log(result);
  //       db.close();
          
      const query = req.query.q; 
      const product = await client.db("scrape").collection("amazon").find({
        category: { $regex: query, $options: "i" }, 
      }).limit(10).toArray();
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
};

export {search};
