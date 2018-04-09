const mongoose = require("mongoose");
const db = require("../models");
mongoose.Promise = global.Promise;

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/nytreactreadinglist" || "mongodb://nytimereactuser:xkK-M6B-eSW-rBc@ds231229.mlab.com:31229/heroku_dmtzgnk6",
  {
    useMongoClient: true
  }
);

const articleSeed = [
  {
    headline: "Secrets of Keeping Aging's Effects at Bay",
    publishedDate: "2001-05-29T00:00:00Z",
    url: "https://www.nytimes.com/2001/05/29/health/personal-health-secrets-of-keeping-aging-s-effects-at-bay.html",
    date: new Date(Date.now())
  },
  {
    headline: "A Public Realm on Private Property; New study identifies and rates hundreds of spaces that earned zoning bonuses.",
    publishedDate: "2000-10-15T00:00:00Z",
    url: "https://www.nytimes.com/2000/10/15/realestate/public-realm-private-property-new-study-identifies-rates-hundreds-spaces-that.html",
    date: new Date(Date.now())
  },
  {
    headline: "What Presence! What Prices!",
    publishedDate: "1995-09-28T00:00:00Z",
    url: "https://www.nytimes.com/1995/09/28/garden/what-presence-what-prices.html",
    date: new Date(Date.now())
  },
  {
    headline: "Teaching Children To Be Afraid",
    publishedDate: "1999-06-25T00:00:00Z",
    url: "https://www.nytimes.com/1999/06/25/opinion/teaching-children-to-be-afraid.html",
    date: new Date(Date.now())
  },
  {
    headline: "Cuisine Art",
    publishedDate: "2001-06-22T04:00:00+0000",
    url: "https://learning.blogs.nytimes.com/2001/06/22/cuisine-art/",
    date: new Date(Date.now())
  },
];

db.Article
  .remove({})
  .then(() => db.Article.collection.insertMany(articleSeed))
  .then(data => {
    console.log(data.insertedIds.length + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });