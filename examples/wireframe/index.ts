import { Paths } from '../react/buildWireframeComponent';
const chalk = require('chalk');
const babel = require('@babel/core');
const fs = require('fs');
const path = require('path');
const configFactory = require('./babel.config');

const debug = false;

const api = {
  cache: () => {},
};

export function transformJavascriptWithBabelPlugins(content: string) {
  const result = babel.transformSync(
    content,
    Object.assign({}, configFactory(api))
  );

  return result.code;
}

export function parseHtmlCheerio(indexHTMLContent: string) {
  const cheerio = require('cheerio');
  const $ = cheerio.load(indexHTMLContent, {
    xmlMode: false,
    decodeEntities: false,
    withDomLvl1: true,
    normalizeWhitespace: false,
  });

  function filterInvalidScriptTags() {
    if ($(this).attr('src') !== undefined) {
      return false;
    }

    if (
      $(this).attr('type') === undefined ||
      $(this).attr('type') === 'text/javascript'
    ) {
      return true;
    }
  }

  $('script')
    .filter(filterInvalidScriptTags)
    .each(function () {
      const src = $(this).html();
      try {
        const res = transformJavascriptWithBabelPlugins(src);
        $(this).text(res);
      } catch (e) {
        console.log(
          chalk.bgRed.white('Could not apply plugins to script tag'),
          e.message.substr(0, 500)
        );
      }
    });

  return $.html();
}

export function runPostBuildBabelTransformations(paths: Paths) {
  let indexHtmlPath = path.resolve(paths.dest, 'wireframe.html');

  console.log('run babel transformations for:', indexHtmlPath);

  const indexHTMLContent = fs.readFileSync(indexHtmlPath, 'utf8');

  const html = parseHtmlCheerio(indexHTMLContent);

  if (debug) {
    indexHtmlPath = path.resolve(paths.dest, 'index.temp.html');
  }

  fs.writeFileSync(indexHtmlPath, html);
}
