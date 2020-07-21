import { join as pathJoin } from 'path';
import { readdirSync, lstatSync } from 'fs';

import i18next from 'i18next';
// @ts-ignore
import Backend from 'i18next-fs-backend';
import IntervalPlural from 'i18next-intervalplural-postprocessor';
import I18nIcu from 'i18next-icu';

const localesPath = './';
const locales = readdirSync(pathJoin(__dirname, localesPath)).filter(
  (fileName) => {
    const dir = pathJoin(pathJoin(__dirname, localesPath), fileName);
    return lstatSync(dir).isDirectory();
  }
);

const i18nextOptions = {
  // debug: true,
  initImmediate: false,
  fallbackLng: 'ru',
  lng: 'ru',
  preload: locales,
  backend: {
    loadPath: pathJoin(__dirname, localesPath + '/{{lng}}/{{ns}}.json')
  },
  i18nFormat: {
    localeData: locales,
    parseErrorHandler: (err: string, key: string, res: string, options: any) =>
      console.error(err, `key: ${key}`, `res: ${res}`, options)
  }
};

i18next.use(Backend).use(IntervalPlural).use(I18nIcu).init(i18nextOptions);

const translators = Object.assign(
  {},
  ...locales.map((locale) => ({ [locale]: i18next.getFixedT(locale) }))
);

export { translators };
