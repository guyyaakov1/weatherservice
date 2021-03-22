const express = require('express');
let router = express.Router();

const service = require('../service/service')


router.route('/').get(async (req, res) => {
    let objArray = [];
    let parameter = req.query;

    if (parameter != undefined) {

        try {
            const feedback = await service.returnData(parameter)
            await feedback.forEach(element => {
                
                let newObj = {};
                newObj["Temperature"] = parseFloat(element["Temperature"]);
                newObj["Precipitation"] = parseFloat(element["Precipitation"])
                objArray.push(newObj)
            });
        } catch (error) {
            console.log(error)
        }
        res.send(getMavMinAvg(objArray))
    }
    else {
        res.json('summarize')
    }
})


let getMavMinAvg = (array) => {
    let max = {};
    let min = {};
    let avg = {};
    let temps = [];
    let Precipitations = [];

    array.forEach(element => {
        temps.push(element.Temperature.toFixed())
        Precipitations.push(element.Precipitation.toFixed())
    })

    max.Temperature = Math.max(...temps);
    max.Precipitation = Math.max(...Precipitations);
    min.Precipitation = Math.min(...Precipitations);
    min.Temperature = Math.min(...temps);
    avg.Temperature = temps.reduce((a, b) => parseInt(a) + parseInt(b), 0) / temps.length
    avg.Precipitation = parseFloat((Precipitations.reduce((a, b) => parseInt(a) + parseInt(b), 0) / Precipitations.length).toFixed(1))

    return { max, min, avg };

}

module.exports = router;