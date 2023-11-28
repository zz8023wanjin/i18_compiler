#!/usr/bin/env node

import fs from 'fs'
import csv from 'csv-parser'
import iconv from 'iconv-lite'
import path from 'path'
import config from './config.js'
import i18Translater from './translate.js'

const translater = new i18Translater(config)

fs.createReadStream(path.resolve(process.cwd(), config.input))
  .pipe(iconv.decodeStream('GBK'))
  .pipe(csv())
  .on('data', (data) => {
    translater.translate(data)
  })
  .on('end', () => {
    translater.write()
  })
