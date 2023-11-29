import fs from 'fs';
import path from 'path';

class i18Translater {
  constructor(config) {
    this.config = config || {};
    this.translates = {};
  }

  translate(data) {
    // { NAMESPACE: 'card', KEY: 'SignIn1', en: 'Sign In', zh-cn: '登录', zh-tw: '登錄' }
    const { key, namespace } = this.config;

    const keys = Object.keys(data);
    keys.forEach((k) => {
      if (k !== key && k !== namespace) {
        this.translates[k] = this.translates[k] || {};
        const namespaceData = this.translates[k][data[namespace]] || {};
        namespaceData[data[key]] = data[k];
        this.translates[k][data[namespace]] = namespaceData;
      }
    });

    console.log('translates', this.translates);
  }

  write() {
    const output = path.resolve(process.cwd(), this.config.output);

    if (!fs.existsSync(output)) {
      fs.mkdirSync(output);
    }

    const keys = Object.keys(this.translates);
    keys.forEach((key) => {
      const locale = this.translates[key];

      const localePath = `${output}/${key}`;
      if (!fs.existsSync(localePath)) {
        fs.mkdirSync(localePath);
      }

      const namespaces = Object.keys(locale);
      namespaces.forEach((namespace) => {
        const content = JSON.stringify(locale[namespace], null, 2);
        const filePath = `${localePath}/${namespace}.json`;
        fs.writeFile(filePath, content, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });
    });
  }
}

export default i18Translater;
