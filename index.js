require("dotenv").config();
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

const cors = require('cors');

const port = process.env.PORT || 4000;
 
const app = express ();  
//dbuser1
//7KcRgVrvNuLNOHuL
// middle user(corse());

app.use(cors());
app.use(express.json());

 const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.yoijtmg.mongodb.net/?retryWrites=true&w=majority`;

    const client = new MongoClient(uri, 
    { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 
    });



async function run () {
    try {
        await client.connect();
      
        const productCollection =client.db("moontech").collection("product");
        
        app.get("/products", async (req, res) => {
            const cursor = productCollection.find({});
            const product = await cursor.toArray();
    
            res.send({ status: true, data: product });
        });

        app.post("/product", async (req, res) => {
            const product = req.body;
      
            const result = await productCollection.insertOne(product);
      
            res.send(result);
          });
      
          app.delete("/product/:id", async (req, res) => {
            const id = req.params.id;
      
            const result = await productCollection.deleteOne({ _id: ObjectId(id) });
            res.send(result);
          });


    } finally {
        // await client.close()
    }
}

run().catch((err) => console.log(err));



 app.get('/',(req,res)=> {
    res.send('Running Moon Tech Server....')
 })
 app.listen(port,()=>{
    console.log('Listening to port',port);
 })