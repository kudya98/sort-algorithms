const express = require("express");
const bodyParser = require("body-parser");
const API_PORT = 3001;
const app = express();
const router = express.Router();
const algorithms = require("./algorithms");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

function refresh(arr_size){
    const arr=[];
    for (let i=0;i<arr_size;i++){
        arr.push(Math.random()*100)
    }
    return arr;
}
console.log(algorithms);
app.use("/api", router);
router.get('/sort',(req,res) => {
    const type = req.query.type;
    const max_array_size = req.query.size;
    const min_array_size = 2**10;
    const iterations = 30;
    //const delta = (max_array_size**(1/iterations)) / (min_array_size**(1/iterations));
    const delta = (max_array_size-min_array_size)/iterations;
    const stats=[];
        for (let arr_size=min_array_size;arr_size<max_array_size;arr_size+=delta){
            arr_size=Math.round(arr_size);
            let result = {array_size:arr_size,time:algorithms[`${type}`](refresh(arr_size))};
            stats.push(result);
        }
        res.json(stats);

});


app.listen(API_PORT, () => console.log(`APP LISTENING ON PORT ${API_PORT}`));