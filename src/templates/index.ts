import pug from 'pug';
import { getMs, getDuration } from '../perfomance';

function compileTemplateWithCache(): pug.compileTemplate {
  return pug.compileFile('./src/templates/simple-html/index.pug', {
    cache: true,
    pretty: true
  });
}

function compileTemplateWithoutCache(): pug.compileTemplate {
  return pug.compileFile('./src/templates/simple-html/index.pug', {
    cache: false,
    pretty: true
  });
}

function compileDuration(
  iterations: number,
  cache: boolean
): ReturnType<typeof getDuration> {
  const durations = Array(iterations)
    .fill(0)
    .map(() => {
      return getMs(
        cache ? compileTemplateWithCache : compileTemplateWithoutCache
      );
    });
  return getDuration(durations);
}

function renderDuration(
  iterations: number,
  renderFn: pug.compileTemplate,
  data: pug.LocalsObject
): { duration: ReturnType<typeof getDuration>; html: string } {
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  let html: string = '';
  const durations = Array(iterations)
    .fill(0)
    .map(() =>
      getMs(() => {
        html = renderFn(data);
      })
    );
  return {
    duration: getDuration(durations),
    html
  };
}

export {
  compileTemplateWithCache,
  compileTemplateWithoutCache,
  compileDuration,
  renderDuration
};
