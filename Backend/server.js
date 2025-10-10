const express = require ('express');
const {createClient} = require('redis');

const app = express();
app.use(express.json()); //Middleware to read json from the request

const redisClient = createClient();

redisClient.on('error', (err) => console.log('Redis Client Error', err));

(async () => {
    await redisClient.connect();
    console.log("Connected to Redis");
}
)

app.post ('/api/save-data', async (req,res) =>{
    try{ 
        const userData = req.body;

        if (!userData || Object.keys(useData).length === 0){
            return res.status(400).json({message :'No message be sent.'});
        }
        const key = `user-data:${Date.now()}`;

        const value = JSON.stringify(userData);

        const EXPIRATION_IN_SECONDS = 30*60;

        await redisClient.set(key,value,{
            EX:  EXPIRATION_IN_SECONDS
        });
        res.status(201).json({
            message: 'The note have saved and be deleted in 30 minutes.',
            accessKey: key
        });
    } catch (error){
        console.error(error);
        res.status(500).json({message: 'Error from server.'});
    }
});

app.get('/api/get-data/:key', async(req, res) => {
    try{
        const {key} = req.params;
        const value = await redisClient.get(key);

        if (value){
            res.status(200).json(JSON.parse(value));
        }else{
            res.status(404).json({message:'The note is expired.'});
        }
    } catch (error){
        console.error(error);
        res.status(500).json({message:'Error from server.'});
    }
});

const PORT = 3000;
app.listen(PORT,() =>{
    console.log(`Server running at http://localhist:${PORT}`);
});