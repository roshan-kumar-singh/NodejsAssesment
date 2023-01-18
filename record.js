const express = require('express')
const app = express()
const data = require('./data.json');
app.post("/records",(req, res) => {
    const len = data.length;
    const page = Number.parseInt(req.query.page);
    if(page-1 * 10 > len ) page = 0;
    const temp = data.slice(page * 10, (page+1) * 10);
    res.json(temp);
})

app.listen(3001,() => {console.log("record started")})