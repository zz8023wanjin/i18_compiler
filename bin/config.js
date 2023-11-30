import path, { normalize } from 'path'
import fs from 'fs'

const defaultConfig = {
  input: './assets/test.csv',
  output: './locale',
  key: 'KEY',
  namespace: 'NAMESPACE',
}

const PACKAGE_JSON_PATH = './package.json'

const packageJsonData = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), normalize(PACKAGE_JSON_PATH)), 'utf8'))

const config = Object.assign({}, defaultConfig, packageJsonData.i18_compiler)

export default config
