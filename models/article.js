const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  headline: { type: String, required: true },
  publishedDate: { type: String, required: true },
  url: { type: String, required: true },
  note: {type: String, required: false},
  date: { type: Date, default: Date.now }
});

const Article = mongoose.model("Articles", articleSchema);

module.exports = Article;