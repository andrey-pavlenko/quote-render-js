import { translators } from './locales';

console.info(translators);

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
