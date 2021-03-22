const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const weatherSchema = new Schema({
    'Longitude': String,
    'Latitude': String,
    'forecast_time': String,
    'Temperature': mongoose.Types.Decimal128,
    Precipitation: mongoose.Types.Decimal128,
})

const Weather = mongoose.model('cvs-data', weatherSchema);
module.exports = Weather;