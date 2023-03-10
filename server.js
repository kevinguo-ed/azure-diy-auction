const express = require('express');
const { WebPubSubServiceClient } = require('@azure/web-pubsub');
const app = express();

const port = 8888;
let maxBid = 18000;
app.use(express.static('public'));
app.listen(port, () => console.log(`Open http://localhost:${port}/index.html`));
let serviceClient = new WebPubSubServiceClient(process.env.ConnectionString, "auction");
app.get("/negotiate", async (req, res) => {
    let token = await serviceClient.getClientAccessToken();
    res.status(200).send(token.url);
});
app.post('/bid', async (req, res) => {
    const bidQuery = req.query.bid;
    try{
        const bid = parseInt(bidQuery);
        if (maxBid < bid) {
            maxBid = bid;
            await serviceClient.sendToAll({currentBid: maxBid});
        }
        res.status(200).send(maxBid);
    } catch (err){
        console.log(err);
        res.status(400).send(err);
    }
});