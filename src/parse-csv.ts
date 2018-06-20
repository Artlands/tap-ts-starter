/*Parse CSV files using csvjson https://www.npmjs.com/package/csvjson */

import * as tapTypes from './singer/tap-types'
let csvjson = require('csvjson')
let options = {
  // delimiter: ',', // optional
  // quote: '"' // optional
}

export function parseItem(csvfile: Buffer) {
  return csvjson.toObject(csvfile.toString(), options, function(csvObj: object) {
    let rec = new tapTypes.streamRecord()
    rec.stream = 'csv'
    rec.time_extracted = new Date()
    rec.record = csvObj
    return rec
    /*
    commit test
    */
  })
}
