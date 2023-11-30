import fs from 'fs'
import path from 'path'
import i18Translater from '../bin/translate'
import { describe, it, expect, beforeEach, afterEach } from 'vitest'

describe('i18Translater', () => {
  let translater

  beforeEach(() => {
    translater = new i18Translater({
      output: './output',
      key: 'KEY',
      namespace: 'NAME_SPACE',
      input: './example/assets/test.csv',
    })
  })

  afterEach(() => {
    // Clean up the output directory after each test
    const outputDir = path.resolve(process.cwd(), './output')
    if (fs.existsSync(outputDir)) {
      fs.rmdirSync(outputDir, { recursive: true })
    }
  })

  it('should translate data and write files', async () => {
    const data = {
      NAME_SPACE: 'card',
      KEY: 'SignIn1',
      en: 'Sign In',
      'zh-cn': '登录',
      'zh-tw': '登錄',
    }

    translater.translate(data)

    expect(translater.translates).toEqual({
      en: {
        card: {
          'SignIn1': 'Sign In',
        },
      },
      'zh-cn': {
        card: {
          'SignIn1': '登录',
        },
      },
      'zh-tw': {
        card: {
          'SignIn1': '登錄',
        },
      },
    })

    await translater.genarate()

    const outputDir = path.resolve(process.cwd(), './output')
    expect(fs.existsSync(outputDir)).toBe(true)

    const enFilePath = path.resolve(outputDir, 'en/card.json')
    expect(fs.existsSync(enFilePath)).toBe(true)
    const enContent = fs.readFileSync(enFilePath, 'utf8')
    expect(enContent).toBe(JSON.stringify({ SignIn1: 'Sign In' }, null, 2))

    const zhCnFilePath = path.resolve(outputDir, 'zh-cn/card.json')
    expect(fs.existsSync(zhCnFilePath)).toBe(true)
    const zhCnContent = fs.readFileSync(zhCnFilePath, 'utf8')
    expect(zhCnContent).toBe(JSON.stringify({ SignIn1: '登录' }, null, 2))

    const zhTwFilePath = path.resolve(outputDir, 'zh-tw/card.json')
    expect(fs.existsSync(zhTwFilePath)).toBe(true)
    const zhTwContent = fs.readFileSync(zhTwFilePath, 'utf8')
    expect(zhTwContent).toBe(JSON.stringify({ SignIn1: '登錄' }, null, 2))
  })

  it('should not translate data if namespace or key is missing', () => {
    const data = {
      NAMESPACE: 'card',
      en: 'Sign In',
      'zh-cn': '登录',
      'zh-tw': '登錄',
    }

    translater.translate(data)
    expect(translater.translates).toEqual({})
  })
})
