const redis = require('redis');
const client = redis.createClient();

client.on("connect",() => {
    console.log("Redis are Connected")
})

client.on("ready",() => {
    console.log("redis are ready to use");
})

client.on("error", (error) => {
  console.error(error);
});

client.on("end",() => {
    console.log("redis are disconnected")
})

module.exports = client