const express = require('express');
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());


//user: dbuser2
//pass: TKMniEMRsVKGMpzD


//todays uri jeita kaj kore na
// const uri = "mongodb+srv://dbuser2:TKMniEMRsVKGMpzD@cluster0.axoxgat.mongodb.net/?retryWrites=true&w=majority";


//goto kalker uri jeita 1st din e create kora
// const uri = "mongodb+srv://fahim1:VJwOtbCP5xIdfxUr@cluster0.axoxgat.mongodb.net/?retryWrites=true&w=majority";





//finally eita thik thak kaj kore
//user: fahim2
//pass: iTazy3GgBWl397QD
const uri = "mongodb+srv://fahim2:iTazy3GgBWl397QD@cluster0.axoxgat.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });





async function run () {
    try{
        const userCollection = client.db('nodeMongoCrud').collection('users');

        // const user ={
        //     name: 'dancing dj',
        //     email: 'dancingdj@gmail.com'
        // }
        // const result = await userCollection.insertOne(user);
        // console.log(result);

        
        
        //get user from database (CRUD er Read Operation)
        app.get('/users', async(req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        })
        
        
        //send user to database (CRUD er Create Operation)
        app.post('/users', async (req, res) => {
            const user = req.body;
            console.log(user);
            const result = await userCollection.insertOne(user);
            res.send(result)
            console.log(result);
        })



        //update user to database (CRUD er Update Operation)
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const user = await userCollection.findOne(query);
            res.send(user);
        })

        app.put('/users/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id)};
            const user = req.body;
            const option = {upsert: true};

            const updatedUser =  {
                $set: {
                    name: user.name,
                    address: user.address,
                    email: user.email
                }
            }

            const result = await userCollection.updateOne(filter, updatedUser, option);
            res.send(result)

            console.log(user);

        })



        //delete user to database (CRUD er Delete Operation)
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            console.log("Trying to dlete id", id)
            const query = {_id: ObjectId(id)};
            const result = await userCollection.deleteOne(query);
            res.send(result);
            console.log(result);
        })



    }

    finally{

    }
}
run().catch(error => console.log(error));


app.get('/', (req, res) => {
    res.send('Node Mongodb CRUD server is running');
});

app.listen(port, () => {
    console.log('Server is running on port: ', port);
})