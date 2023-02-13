const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors({ origin: '*' }))

app.get('/price_data', async (req, res) => {
  try {
    const formattedDate = req.query.date.split('-').reverse().join('-')
    const url = `https://www.nordpoolgroup.com/api/marketdata/page/10?endDate=${formattedDate}`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const reponse_ = await response.json()

    let data = reponse_

    // filter out rows with data for Min, Max, etc.
    const namesToFilterOut = ['Min', 'Max', 'Average', 'Peak', 'Off-peak 1', 'Off-peak 2']
    data = data.data.Rows.filter(row => !namesToFilterOut.includes(row.Name))

    // filter out LTU data only
    data = data.map(row => (
      {
        value: parseFloat(row.Columns.filter(col => col.Name == 'LT')[0].Value.replace(',', '.')),
        date: new Date(row.StartTime).getHours(),
      }
    ))
    res.json(data)
  } catch (err) {
    res.status(500).send(err.message)
  }
})


const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
