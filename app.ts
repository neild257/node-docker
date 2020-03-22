import express from 'express';
import redis from 'redis';

const app = express();

const PORT = process.env.PORT || 3000;

// conneting to redis server
// because of docker-compose createClient will try
// find the redis container create by compose yml file.
const redisClient = redis.createClient({
    host: 'redis-image',
    port: 6379
});
redisClient.set('visits', 0);

app.get('/', (req, res) => {
    redisClient.get('visits', (err, visits) => {
        if(!err) {
            res.send(`Number of visits is/are ${visits}`);
            redisClient.set('visits', parseInt(visits) + 1);
        }
    });
});

app.listen(PORT, () => {
    console.log(`The app has started on ${PORT}`);
});
