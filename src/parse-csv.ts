/*Parse CSV files using csvjson https://www.npmjs.com/package/csvjson */

import * as tapTypes from './singer/tap-types'
let csvjson = require('csvjson')
let options = {
  delimiter: ',', // optional
  quote: '"' // optional
}

export async function parseItem(csvfile: Buffer) {
  let jsonobj = csvjson.toObject(csvfile.toString())
  let rec = new tapTypes.streamRecord()
  rec.stream = 'csv'
  rec.time_extracted = new Date()
  rec.record = jsonobj
  return rec
}
