import { join as pathJoin } from 'path';
import { readdirSync, lstatSync } from 'fs';
import i18next from 'i18next';
// import { FormatFunction } from 'i18next';
// @ts-ignore
import Backend from 'i18next-fs-backend';
import IntervalPlural from 'i18next-intervalplural-postprocessor';
import ICU from 'i18next-icu';
import { format } from './locales/format';

const localesPath = './locales';

const i18nextOptions = {
  // debug: true,
  initImmediate: false,
  fallbackLng: 'ru',
  lng: 'ru',
  preload: readdirSync(pathJoin(__dirname, localesPath)).filter((fileName) => {
    const dir = pathJoin(pathJoin(__dirname, localesPath), fileName);
    return lstatSync(dir).isDirectory();
  }),
  interpolation: {
    format
  },
  backend: {
    loadPath: pathJoin(__dirname, localesPath + '/{{lng}}/{{ns}}.json')
  },
  i18nFormat: {
    localeData: 'ru'
  }
};

i18next.use(Backend).use(IntervalPlural).use(ICU).init(i18nextOptions);
const translators = {
  ru: i18next.getFixedT('ru'),
  ua: i18next.getFixedT('ua'),
  lv: i18next.getFixedT('lv'),
  lt: i18next.getFixedT('lt'),
  es: i18next.getFixedT('es')
};

const translator = translators.ru;

console.info(translator('key'));
console.info(0, translator('nights_gen', { nights: 0 }));
console.info(1, translator('nights_gen', { nights: 1 }));
console.info(2, translator('nights_gen', { nights: 2 }));
console.info(3, translator('nights_gen', { nights: 3 }));
console.info(9, translator('nights_gen', { nights: 9 }));
console.info(20, translator('nights_gen', { nights: 20 }));
console.info(21, translator('nights_gen', { nights: 21 }));
console.info(32, translator('nights_gen', { nights: 32 }));
console.info(translator('checkin'));
console.info(translator('Checkin'));
