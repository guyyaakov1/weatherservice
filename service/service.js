
const csv = require('csv-parser');
const fs = require('fs');
const mongoose = require('mongoose');
const Weather = require('../model/weather');
const db = process.env.MONGODB_URL;

const results = [];


//Get All The Files To An Array And Insert If Needed


function getFiles(params) {

  console.log('Start Inserting')
  fs.createReadStream(params)
    .pipe(csv())
    .on('data', async (data) => {
      let obj = {}
      if (data['Precipitation Rate mm/hr']) {
        obj['Precipitation'] = parseFloat(data['Precipitation Rate mm/hr'] * 25.40).toFixed(1);
      } else {
        obj['Precipitation'] = parseFloat(data['Precipitation Rate in/hr'] * 25.40).toFixed(1);
      }
      obj['Longitude'] = parseFloat(data['Longitude']).toFixed(1)
      obj['Latitude'] = parseFloat(data['Latitude']).toFixed(1)
      obj['Temperature'] = parseFloat(data['Temperature Celsius']).toFixed(1)
      obj['forecast_time'] = data.forecast_time
      results.push(obj);

    })
    .on('end', () => {

      WeatherModel.collection.insertMany(results)
        .then(res => console.log(res))
        .catch(err => console.log(err))

    })


}
const csvFiles = './csv/';


//Connect To MongoDb

mongoose.connect( db , { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => console.log('Connection Succses'))
  .then(async result => {

    const weathers = await Weather.exists()
    if (!weathers) {

      console.log('truuuee')
      fs.readdirSync(csvFiles).forEach((file) => {

        getFiles(csvFiles + file)

      });
    }
    else {
      console.log('found')
    }
  })
  .then(() => console.log('start up completed'))
  .catch((err) => console.log(err))








let returnData = async (params) => {


  let lon = new String(params.lon);
  let lat = new String(params.lat);



  try {
    const searchRes = await Weather.find({ Longitude: lon, Latitude: lat })
    console.log("Found : ", searchRes.length);
    return searchRes;
  } catch (error) {
    console.log(error)
  }


}


let returnSummarize = (params) => {
 return returnData(params)
}

module.exports = { returnData, returnSummarize };





