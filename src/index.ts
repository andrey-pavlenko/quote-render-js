import {
  compileDuration,
  compileTemplateWithoutCache,
  renderDuration
} from './templates';
import { translators } from './locales';
import { memoryUsage, durationToStr } from './perfomance';
import data from './templates/data.json';

const renderFn = compileTemplateWithoutCache();

console.info('Template compilation\n');
const compileIterations = 100;
let duration = compileDuration(compileIterations, false);
console.info(
  `Compile templates (iterations ${compileIterations}), without cache`
);
console.info(durationToStr(duration), '\n');

duration = compileDuration(compileIterations, true);
console.info(`Compile templates (iterations ${compileIterations}), with cache`);
console.info(durationToStr(duration), '\n');

const renderIterations = 10000;
const renderResult = renderDuration(renderIterations, renderFn, {
  ...data,
  ...{ __t: translators.ru }
});
console.info(`Render data (iterations ${renderIterations})`);
console.info(durationToStr(duration), '\n');

// console.info('HTML:');
// console.info(renderResult.html, '\n');

console.info(memoryUsage());
