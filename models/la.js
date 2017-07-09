// The Post model

var mongoose = require('mongoose')
    ,Schema = mongoose.Schema
    ,ObjectId = Schema.ObjectId;

var postSchema = new Schema({
    postId: ObjectId,
    href:String,
    title:String,
    image:String,
    alt:String,
    desc:String,
    date: {type: Date, default: Date.now}
},{collection: 'la'});

module.exports = mongoose.model('La', postSchema);