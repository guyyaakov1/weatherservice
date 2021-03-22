const express = require('express');
let router = express.Router();

const service = require('../service/service')



//- Returns The Weather Forecast In A Specific Location

router.route('/').get(async (req, res) => {
    let objArray = [];
    let parameter = req.query;

    if (parameter != undefined) {

        try {
            const feedback = await service.returnData(parameter)
            await feedback.forEach(element => {

                let newObj = {};

                newObj["forecastTime"] = element.forecast_time;
                newObj["Temperature"] = parseFloat(element["Temperature"]);
                newObj["Precipitation"] = parseFloat(element["Precipitation"])
                console.log("new", newObj)
                objArray.push(newObj)
            });
        } catch (error) {
            console.log(error)
        }
        res.send(objArray)
    }
    else {
        res.send('data')
    }
})

module.exports = router;