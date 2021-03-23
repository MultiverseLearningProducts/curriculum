const fs = require('fs')
const path = require('path')
const hljs = require('highlight.js')
const docs = path.join(__dirname, '..', 'docs')
const { Remarkable } = require('remarkable')
const tpl = require('lodash.template')
const md = new Remarkable({
    html: true,
    breaks: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (err) { }
        }

        try {
            return hljs.highlightAuto(str).value;
        } catch (err) { }

        return '';
    }
})

// load all the plugins into remarkable
md.use(require('./markdown-plugins/tabbed-code-blocks'))
  .use(require('remarkable-figure-plugin'))
  .use(require('./markdown-plugins/embeds'))
  .use(require('./markdown-plugins/multiverse-multiquizzes'))

module.exports = async function (file) {
    const { title = 'untitled', dirPath, fileName, content, navTree } = file
    fs.mkdir(path.join(docs, dirPath), { recursive: true }, err => {
        if (err) throw new Error(err)
        const writePath = path.join(docs, dirPath, fileName.replace('.md', '.html'))
        const createHtmlContent = tpl(fs.readFileSync(path.join(__dirname, 'index.html')))
        const _html = createHtmlContent({ title, nav: navTree, content: md.render(content) })
        fs.writeFile(writePath, _html, err => {
            if (err) throw new Error(err)
        })
    })

}
