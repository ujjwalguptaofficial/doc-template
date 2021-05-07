var mdHelper = require('./md_helper');
var { readdirSync, writeFileSync, readFileSync } = require('fs-extra');
var { getVueComponent } = require('./vue_helper');
const path = require('path')

const workingDir = process.cwd();
const contentDir = path.join(workingDir, 'content');
const srcDir = path.join(workingDir, 'src');
// mdHelper.convertMdToVueAndSaveInFolder('../docs/v1/tutorial', 'code/pages/v1/tutorial', 'tutorial.v1');
// mdHelper.convertMdToVueAndSaveInFolder('../docs/v1/example', 'code/pages/v1/example', 'example.v1');
// mdHelper.convertMdToVueAndSaveInFolder('../docs/v2/tutorial', 'code/pages/v2/tutorial', 'tutorial.v2');
// mdHelper.convertMdToVueAndSaveInFolder('../docs/v2/example', 'code/pages/v2/example', 'example.v2');
// mdHelper.convertMdToVueAndSaveInFolder('../docs/tutorial', 'code/pages/tutorial', 'tutorial');
// mdHelper.convertMdToVueAndSaveInFolder('../docs/example', 'code/pages/example', 'example');

let dirCont = readdirSync(contentDir);
let htmlFiles = dirCont.filter(function (elm) { return elm.match(/.vue/i) });
htmlFiles.forEach(file => {
    const fullPath = path.join(contentDir, file);
    const htmlData = readFileSync(fullPath, {
        encoding: 'utf-8'
    })
    // console.log("html", fullPath, htmlData)
    // const data = getVueComponent(htmlData);
    // const name = path.basename(file, '.html');
    // console.log("name", name);
    writeFileSync(path.join(srcDir, 'pages', file), htmlData, {
        encoding: 'utf8'
    });
})