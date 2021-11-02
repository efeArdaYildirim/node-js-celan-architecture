const express = require('express')

const app = express()
const PORT = process.env.PORT || 8080

module.exports = {
  start: () => {
    app.listen(PORT, () => {
      console.log('it is alive!!!')
    })
  }
}