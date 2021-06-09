const app = require('../app')
const axios = require('axios')

async function loopResturant(resturant) {
    console.log(`arg was => ${resturant}`);
    const response = await axios.get(`https://restaurant-api.wolt.com/v3/venues/slug/${resturant}`)
    const online = response.results[0].online
    console.log(online);
    if (online) {
        const r = await axios.post("https://api.pushover.net/1/messages.json", data = {
            "token": "ahckimerwqwhickwcku8a14qa1tfys",
            "user": "uiefspi2oys2pgo2pfhh7h31dvpb6t",
            "message": `Resturant ${resturant} is back online!!`
        })
        console.log(r.data);
        return
    }
    setTimeout(loopResturant, 5000, resturant)

  }
  

app.get('/api/wolt', async (req, res) => {
    const rest = req.query.resturant
    const response = await axios.get(`https://restaurant-api.wolt.com/v3/venues/slug/${rest}`)
    if (response.status == "ERR") {
        return res.status(400).send({"message": `failed to set for resturant: ${rest}`})
    }
    setTimeout(loopResturant, 1000, rest)
    return res.status(200).send({ "resturant": rest, "message": "Watcher setted"})
})

module.exports = app
