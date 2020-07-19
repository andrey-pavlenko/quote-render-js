# Установка

```sh
npm install typescript @types/node --save-dev
npm install ts-node rimraf --save-dev
```

# Конфигурация

```sh
npx tsc --init \
--rootDir src \
--outDir build \
--esModuleInterop \
--resolveJsonModule \
--lib es6 \
--module commonjs \
--allowJs true \
--noImplicitAny true
```

- --esModuleInterop &ndash; для использования commonjs
- --resolveJsonModule &ndash; для импорта JSON
- --noImplicitAny true &ndash; каждый тип должет быть явно объявлен

### nodemon

> nodemon установлен глобально!

nodemon.json

```json
{
  "watch": ["src"],
  "ext": ".ts,.js",
  "ignore": [],
  "exec": "ts-node ./src/index.ts"
}
```

package.json

```json
"start:dev": "nodemon"
```

### Очистка `/build` и сборка

package.json

```json
"build": "rimraf ./build && tsc"
```

### Запуск

package.json

```json
"start:dev": "nodemon",
"start": "npm run build && node build/index.js",
```

# ESLint

```sh
npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
```

.eslintrc

```js
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ]
}
```

.eslintignore

```
node_modules
dist
```

### Правила ESLint

- "off" means 0 (turns the rule off completely)
- "warn" means 1 (turns the rule on but won't make the linter fail)
- "error" means 2 (turns the rule on and will make the linter fail)

.eslintrc rules

```js

"rules": {
  "no-console": 2 // Remember, this means error!
  "semi": "error"
}
```

# Prettier

```sh
npm install prettier eslint-config-prettier eslint-plugin-prettier --save-dev
```

.prettierrc

```js
{
  "semi": true,
  "trailingComma": "none",
  "singleQuote": true,
  "printWidth": 80
}
```

.eslintrc

```js
{
  // ...
  "plugins": [
    // ...
    "prettier"
  ],
  "extends": [
    // ...
    "prettier"
  ],
  "rules": {
    // ...
    "prettier/prettier": 2 // Means error
  }
}
```

---

[Пример организации проекта NodeJs + TypeScript](https://khalilstemmler.com/blogs/typescript/node-starter-project/)
[Исодник примера](https://github.com/stemmlerjs/simple-typescript-starter)
[Использование ESLint с TypeScript](https://khalilstemmler.com/blogs/typescript/eslint-for-typescript/)
[Использование Prettier](https://khalilstemmler.com/blogs/tooling/prettier/)
