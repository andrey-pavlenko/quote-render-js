import {
  compileDuration,
  compileTemplateWithoutCache,
  renderDuration
} from './templates';
import { translators } from './locales';
import { memoryUsage } from './perfomance';
import data from './templates/data.json';

const renderFn = compileTemplateWithoutCache();

console.info('Template compilation\n');
const compileIterations = 100;
let duration = compileDuration(compileIterations, false);
console.info(
  `Compile templates (iterations ${compileIterations}), without cache`
);
console.info(
  `Total time: ${duration.total}ms, min: ${duration.min}ms, max: ${duration.max}ms\n`
);

duration = compileDuration(compileIterations, true);
console.info(`Compile templates (iterations ${compileIterations}), with cache`);
console.info(
  `Total time: ${duration.total}ms, min: ${duration.min}ms, max: ${duration.max}ms\n`
);

const renderIterations = 10000;
const renderResult = renderDuration(renderIterations, renderFn, {
  ...data,
  ...{ __t: translators.ru }
});
console.info(`Render data (iterations ${renderIterations})`);
console.info(
  `Total time: ${renderResult.duration.total}ms, min: ${renderResult.duration.min}ms, max: ${renderResult.duration.max}ms\n`
);
console.info('HTML:');
console.info(renderResult.html, '\n');

console.info(memoryUsage());

/*
import { translators } from './locales';
import { compileTemplateWithoutCache } from './templates';
import data from './templates/data.json';

const renderFn = compileTemplateWithoutCache();
const translator = translators.ru;
console.info(renderFn({ ...data, ...{ __t: translator } }));
*/
