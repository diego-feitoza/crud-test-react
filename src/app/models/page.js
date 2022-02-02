const mongoose = require('../../database')

const PageSchema = new mongoose.Schema({
  pageId: {
    type: String
  },
  description: {
    type: String
  },
  headerPage: {},
  articles: [
    {}
  ]
})

const Page = mongoose.model('Page', PageSchema)

module.exports = Page