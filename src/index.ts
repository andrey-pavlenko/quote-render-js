import pug from 'pug';
import data from './templates/data.json';

const simpleHtml = pug.compileFile('./src/templates/simple-html/index.pug', {
  pretty: true
});

console.info(simpleHtml(data));
