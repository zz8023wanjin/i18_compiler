import fs from 'fs'
import path from 'path'

class i18Translater {
  constructor(config) {
    this.config = config || {}
    this.translates = {}
  }

  translate(data) {
    const keys = Object.keys(data)
    keys.forEach((key) => {
      if (key !== this.config.key) {
        this.translates[key] = this.translates[key] || {}
        this.translates[key][data[this.config.key]] = data[key]
      }
    })
  }

  write() {
    const output = path.resolve(process.cwd(), this.config.output)

    if (!fs.existsSync(output)) {
      fs.mkdirSync(output)
    }

    const keys = Object.keys(this.translates)
    keys.forEach((key) => {
      const data = this.translates[key]
      const content = JSON.stringify(data, null, 2)
      fs.writeFile(`${output}/${key}.json`, content, (err) => {
        if (err) {
          console.log(err)
        }
      })
    })
  }
}

export default i18Translater
