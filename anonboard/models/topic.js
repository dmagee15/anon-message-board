'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Topic = new Schema({
	title: String,
	id: Number,
	numposts: Number,
	lastpost: String,
    posts: [],
    users: []
});

module.exports = mongoose.model('Topic', Topic);