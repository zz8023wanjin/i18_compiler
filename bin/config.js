import path from 'path'
import fs from 'fs'

const defaultConfig = {
  input: './assets/test.csv',
  output: './locale',
  key: 'KEY',
  namespace: 'NAMESPACE',
}

const packageJsonData = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), './package.json'), 'utf8'))

const config = packageJsonData.i18_compiler || defaultConfig

export default config
