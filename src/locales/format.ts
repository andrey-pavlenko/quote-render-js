/**
 * Plural forms
 * http://docs.translatehouse.org/projects/localization-guide/en/latest/l10n/pluralforms.html
 * https://lingohub.com/blog/2019/02/pluralization
 * https://www.npmjs.com/package/make-plural
 * https://github.com/globalizejs/globalize
 *
 * Коды языклв
 * https://iso639-3.sil.org/code_tables/639/data/all
 *
 *
 * en, English	  nplurals=2; plural=(n != 1);
 * et, Estonian	  nplurals=2; plural=(n != 1);
 * kk, Kazakh	    nplurals=2; plural=(n != 1);
 *
 * 1,101, 1001 -- ночь
 * 2,3,4, 102, 1002 -- ночи
 * 5-20, 105-120, 1005-1020 -- ночей
 * ru, Russian    nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2);
 * be,Belarusian	nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2);
 * uk, Ukrainian	nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && n%10<=4 && (n%100<10 || n%100>=20) ? 1 : 2);
 *
 *
 * ro, Romanian	  nplurals=3; plural=(n==1 ? 0 : (n==0 || (n%100 > 0 && n%100 < 20)) ? 1 : 2);
 *
 * 1 -- nakti
 * 0, 10, 11, 100 -- naktis
 * 21 -- nakts
 * lv, Latvian  	nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n != 0 ? 1 : 2);
 *
 * lt, Lithuanian	nplurals=3; plural=(n%10==1 && n%100!=11 ? 0 : n%10>=2 && (n%100<10 || n%100>=20) ? 1 : 2);
 */

const formatFns: { [key: string]: any } = {
  pluralRu: (value: number, plurals: string): string => {
    const forms = plurals.split('|');
    if (!forms[1]) forms[1] = forms[0];
    if (!forms[2]) forms[2] = forms[1];
    const n10 = value % 10;
    const n100 = value % 100;
    const form =
      n10 === 1 && n100 != 11
        ? 0
        : n10 >= 2 && n10 <= 4 && (n100 < 10 || n100 >= 20)
        ? 1
        : 2;
    return forms[form];
  },
  numeral0_20: function (value: number): number {
    if (value <= 20) {
      return value;
    }
    return value % 10;
  }
};

function format(value: unknown, format?: string, lng?: string): string {
  console.info('format', value, format, lng);

  if (format != null) {
    const [method, args] = format.split(':');
    console.info(method, args);
  }

  // const fn = format != null ? formatFns[format] : undefined;

  // if (fn != null) {
  //   return fn(value, lng) as string;
  // }

  return '';
}

export { format };
