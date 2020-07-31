# QQ template render (JS)

# TODO

- Локализация: i18next
- Множественное число: i18next-icu
- Форматирование дат: Luxon **не сделано**
- Шаблонизатор: pug
- Измерить потребляемую память и скорость рендера шаблонов

### Показатели:

#### Compile templates (iterations 100), without cache

Total: 2152ms Min: 15ms Max: 74ms Median: 19ms

#### Compile templates (iterations 100), with cache

Total: 16ms Min: 0ms Max: 16ms Median: 0ms

#### Render data (iterations 10000)

Total: 16ms Min: 0ms Max: 16ms Median: 0ms

```
Resident Set Size (amount of space occupied in the main memory device): 86.93 Mb
Heap total: 46.23 Mb
Heap used: 23.97 Mb
C++ objects bound to JavaScript objects: 1.01 Mb
Allocated for ArrayBuffers and SharedArrayBuffers: 0.02 Mb
```
