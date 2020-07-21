# QQ template render (JS)

# TODO

- Локализация: i18next
- Множественное число: i18next-icu
- Форматирование дат: Luxon **не сделано**
- Шаблонизатор: pug
- Измерить потребляемую память и скорость рендера шаблонов

### Показатели:

#### Compile templates (iterations 100), without cache

Total time: 2227ms, min: 15ms, max: 77ms

#### Compile templates (iterations 100), with cache

Total time: 18ms, min: 0ms, max: 18ms

#### Render data (iterations 10000)

Total time: 1766ms, min: 0ms, max: 35ms

#### Память

Resident Set Size (amount of space occupied in the main memory device): 87.56 Mb  
Heap total: 46.89 Mb  
Heap used: 28.32 Mb  
C++ objects bound to JavaScript objects: 1.01 Mb  
Allocated for ArrayBuffers and SharedArrayBuffers: 0.03 Mb
