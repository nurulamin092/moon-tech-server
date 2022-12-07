const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

const cors = require('cors');
require('dotenv').config(); 
const port = process.env.PORT || 4000;
 
const app = express ();  
//dbuser1
//7KcRgVrvNuLNOHuL
// middle user(corse());

app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://dbuser1:7KcRgVrvNuLNOHuL@cluster0.yoijtmg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, 
    { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 
    });
// client.connect(err => {
//   const collection = client.db("moontech").collection("productxx");
//   console.log('db connected');
//   // perform actions on the collection object
//   client.close();
// });

async function run () {
    try {
        await client.connect();
      
        const productCollection =client.db("moontech").collection("user");
        const user = {name:'Abdullah',email:'abdullah@gmail.com'}
          const result = productCollection.insertOne(user);
          console.log(`Product inserted with id: ${(await result).insertedId}`);

    } finally {
        // await client.close()
    }
}
run().catch(console.dir)



 app.get('/',(req,res)=> {
    res.send('Running Moon Tech Server....')
 })
 app.listen(port,()=>{
    console.log('Listening to port',port);
 })