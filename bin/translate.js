import fs from 'fs'
import path, { normalize } from 'path'
import chalk from 'chalk'

class i18Translater {
  constructor(config) {
    this.config = config || {}
    this.translates = {}
  }

  translate(data) {
    // { NAMESPACE: 'card', KEY: 'SignIn1', en: 'Sign In', zh-cn: '登录', zh-tw: '登錄' }
    const { key, namespace } = this.config

    if (!data[namespace] || !data[key]) {
      return
    }

    const keys = Object.keys(data)
    keys.forEach((k) => {
      if (k !== key && k !== namespace && data[k]) {
        this.translates[k] = this.translates[k] || {}
        const namespaceData = this.translates[k][data[namespace]] || {}
        namespaceData[data[key]] = data[k]
        this.translates[k][data[namespace]] = namespaceData
      }
    })

    // console.log('translates', this.translates)
  }

  async genarate() {
    const output = path.resolve(process.cwd(), normalize(this.config.output))

    if (!fs.existsSync(output)) {
      fs.mkdirSync(output)
    }

    const keys = Object.keys(this.translates)
    const writePromises = [] // 创建一个数组来存储所有的 writeFile Promise

    keys.forEach((key) => {
      const locale = this.translates[key]

      const localePath = `${output}/${key}`
      if (!fs.existsSync(localePath)) {
        fs.mkdirSync(localePath)
      }

      // 清空localePath下的所有文件
      const files = fs.readdirSync(localePath)
      files.forEach((file) => {
        fs.unlinkSync(`${localePath}/${file}`)
      })

      const namespaces = Object.keys(locale)
      namespaces.forEach((namespace) => {
        const content = JSON.stringify(locale[namespace], null, 2)
        const filePath = `${localePath}/${namespace}.json`
        writePromises.push(fs.promises.writeFile(filePath, content))
        fs.writeFile(filePath, content, (err) => {
          if (err) {
            console.log(err)
          }
        })
      })
    })

    // 等待所有的 writeFile Promise 完成
    try {
      await Promise.all(writePromises)
      console.log(chalk.yellowBright('All files have been written successfully.'))
    } catch (err) {
      console.log(err)
    }
  }
}

export default i18Translater
