var showdown = require('showdown'),
    fse = require('fs-extra'),
    converter = new showdown.Converter(),
    fm = require('front-matter');


function getAllFilesFromFolder(folderName) {
    return fse.readdirSync(folderName);
};
exports.convertMdToVueAndSaveInFolder = function (srcfolderPath, targetfolderToSave, layout) {
    // console.log("src exist",fs.existsSync("src"));
    // console.log("src layout exist",fs.existsSync("src/layouts"));
    // open tutorial layout
    // var layoutContent = fse.readFileSync('code/layouts/' + layout + '.vueLayout', {
    //     encoding: 'utf8'
    // });

    getAllFilesFromFolder(srcfolderPath).every(fileName => {
        var fmData = fm(getContentOfFile(srcfolderPath, fileName));
        var html = converter.makeHtml(fmData.body);
        // var layout = addMetaTags(layoutContent, fmData.attributes);
        // console.log(layoutContent);
        fileName = fileName.split(".")[0].trim();
        var filePath = `${targetfolderToSave}/${fileName}.vue`;
        fse.ensureDirSync(targetfolderToSave);
        //recreate file if exist otherwise create
        fse.closeSync(fse.openSync(filePath, 'w'))

        // var index = layout.indexOf('`');
        // var firstString = layout.substring(0, index + 1);
        // var lastString = layout.substring(index + 1);
        // html = encodeURI(html);
        // fse.writeFileSync(filePath, firstString + html + lastString, {
        //     encoding: 'utf8'
        // });

        var vueComp = `<template><Layout contentSrc='${srcfolderPath}'>${html}</Layout></template>
        <script>import Layout from '${layout}'
        export default {
            components:{Layout}
        };
        </script>
        `;
        // console.log(vueComp);
        fse.writeFileSync(filePath, vueComp, {
            encoding: 'utf8'
        });
        return true;
    });
}

function addMetaTags(layout, metaTags) {
    var addTag = function (stringConst, tagName) {
        // var stringConst = 'title=';
        // console.log('layout', layout);
        if (metaTags[tagName] != null) {
            var index = layout.indexOf(stringConst);
            index = index + stringConst.length;
            var firstString = layout.substring(0, index + 1);
            var lastString = layout.substring(index + 1);
            var firstString = layout.substring(0, index + 1);
            return firstString + metaTags[tagName] + lastString;
        }
        return layout;
    }

    layout = addTag('title=', 'Title');
    layout = addTag('keywords=', 'Keywords');
    layout = addTag('description=', 'Description');
    return layout;
}

function getContentOfFile(folderName, fileName) {
    return fse.readFileSync(`${folderName}/${fileName}`, {
        encoding: 'utf8'
    });
}