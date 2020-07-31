## Хочется иметь в шаблонизаторе

- набор функций-helper'ов для вычисления дополнительных параметров render'а
- продвинутый шаблонизатор с возможностью сложных conditional (`if/elif/else`, `switch/case`)
- единую систему переводов i18n
- систему локализации для разных языков (`ends-of-numeral` правильно работает только с русским языком)

### Selmer

- `if/elif/else` появилось в версии 1.21.21 и требует Clojure 1.8
- последняя версия требует Clojure 1.9
- в Clojure 1.8 Joda объявлена Depricated
- Selmer перестал понимать объекты Joda

Т.е. Selmer который может `if/elif/else` не работает с объектами Joda и требует Clojure 1.8

### Дополнительный сервер

- хранит скомпилированные шаблоны
- render'ит подборки и кеширует результат
  - сейчас подборка имеет поле item_updated_at &ndash; может быть флагом для инвалидации кеша
  - или можно считать контрольную сумму подборки для инвалидации кеша
- занимается всеми необходимыми расчетами для render'а подборки
- в запросе получает: подборку, тип: web/email, язык: ru/ua/lv и пр. Отвечает готовым HTML + CSS

#### Python

- имеет библиотеку [jinja2](https://github.com/pallets/jinja) &ndash; основа шаблонизатора в Django. 7.2k звёзд
- есть python3-icu &ndash; локализация. Возможности не изучал
- скорость компиляции и render'а шаблонов не измерял

Можно развернуть Docker образ: [Flask](https://flask.palletsprojects.com/en/1.1.x/) + шаблонизатор

#### PHP

- большое количество шаблонизаторов
  - [twig](https://github.com/twigphp/Twig): 6.9к звёзд
  - [smarty](https://github.com/smarty-php/smarty): 1.7k звёзд
- сам язык можно считать шаблонизатором
- предварительно шаблоны нужно компилировать. Т.е. после старта сервера нужно скомпилировать и закешировать все шаблоны. Потом их вызывать как функции
- шаблоны компилируются не очень быстро. [Сравнение скорости](https://habr.com/ru/post/128083/)

Можно развернуть Docker образ: [Slim](https://github.com/slimphp/Slim) + шаблонизатор

#### NodeJs

- очень мощный шаблонизатор [Pug](https://github.com/pugjs/pug): 19.4к звёзд
  - самостоятельно кеширует результаты компиляции
  - сейчас используется для подготовки шаблонов для Selmer
  - в шаблоне можно вызывать JavaScript функции
- i18next &ndash; популярная библиотека переводов
  - имеет icu-плагин для правильного определения множественного числа

Можно развернуть Docker образ: [Express](https://github.com/expressjs/express) + Pug + i18next

Тестовый простой шаблон:

- перевод строк через i18next
- множественное число (ночь/ночи/ночей, взрослый/взрослых, ребенок/детей) через i18next-icu
- форматирование дат через i18next-icu, возможно использовать и другие библиотеки

[Простой HTML](https://github.com/andrey-pavlenko/quote-render-js/tree/master/src/templates/simple-html) шаблон снабдил комментариями возможностей Pug, которые в нем использовал.

[Замеры](https://github.com/andrey-pavlenko/quote-render-js) компиляции и render простого шаблона.

#### Pug

Сейчас Pug используется только для подготовки шаблонов Selmer (только компиляция), неизвестны данные подборки (время выполнения). Известен только язык перевода.

Позволяет разделить шаблон на модули [include](https://pugjs.org/language/includes.html) и [mixins](https://pugjs.org/language/mixins.html). Использую это сейчас. Например у Стильного и Отрывного одна шапка.

Выполняет функции внутри шаблона. Сейчас в некоторых email шаблонах считается ширина колонки (общая ширина / 2 или 3 колонки).

#### Некоторое сравнение Selmer vs Pug

selmer

> item.thumbnail не null

```
{% if item.thumbnail %}<img>{% endif %}
```

pug

```pug
if item.thumbnail != null
  img
```

---

selmer

> item.resort не пустая строка, на сервере нужно сделать trim

```
{% if item.resort|not-empty %}<div>{% endif %}
```

pug

> item.resort не пустая строка, на сервере trim не нужен

```pug
if item.resort.trim()
  div
```

---

selmer

> перебор quote.items и нужно узнать первый/последний item.

```
{% for item in items %}
{% if forloop.first %}
<div class="first" />
{% else %}
{% if forloop.last %}
<div class="last" />
{% else %}
<div class= />
{% endif %}
{% endif %}
{% endfor %}
```

pug

> В selmer невозможно (без пользовательского фильтра) узнать каждый ли второй (используется в шаблона Турмаркетинга)

```pug
-
  function cls(isFirst, isLast) {
    if (isFirst) {
      return 'first';
    } else if (isLast) {
      return 'last;
    } else {
      return '';
    }
  }

each item, index in quote.items
  div(class= cls(index === 0, index === quote.items.lenght - 1))

//- Каждый второй
each item, index in quote.items
  div(class= (index % 2 >  0 ? 'first' : 'second'))

```
