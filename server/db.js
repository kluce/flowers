var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/flowers');


//Schema
var flowersSchema = mongoose.Schema({
    name: String,
    season: String,
    meaning: String

});

//model
var flower = mongoose.model('flower', flowersSchema);

module.exports = flower;
