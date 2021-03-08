const markdownpdf = require('markdown-pdf')
const dirTree = require("directory-tree")
const path = require('path')
const fs = require('fs/promises')

const pdfOptions = {
  remarkable: {
    html: true,
    plugins: [
      require('remarkable-classy'),
      require('./remark-page-breaks')
    ],
    syntax: ['footnote', 'sup', 'sub']
  }
}

const filesFirst = (a) => a.type && a.type === 'file' ? -1 : 1

function getPaths(child) {
  if (child.type === 'file' && child.extension === '.md') {
    return { path: child.path }
  } else if (child.type === 'directory') {
    return [{ title: child.name }, ...child.children.sort(filesFirst).map(getPaths)].flat()
  } else if (Array.isArray(child)) {
    return child.map(getPaths)
  }
}

async function consumeMarkdown(memo, filePaths) {
  if (!filePaths.length) return memo
  const content = filePaths.shift()
  if (content.path) {
    const md = await fs.readFile(content.path)
    memo += md.toString()
  }

  if (content.title) {
    memo += `<<<<>>>>`
    memo += `#${content.title}`
  }

  return consumeMarkdown(memo, filePaths)
}

async function curriculumSrcTree() {
  const curriculumSrc = path.join(__dirname, '..', 'src')
  const { children } = await dirTree(curriculumSrc)
  const filePaths = children.sort(filesFirst).map(getPaths).flat()
  return await consumeMarkdown("", filePaths)
}

(async function () {
  const bookPath = path.join(__dirname, '..', 'book', 'Multiverse-Software-Engineering-Level-4-Curriculum.pdf')
  const content = await curriculumSrcTree()

  markdownpdf(pdfOptions).from.string(content).to(bookPath, function () {
    console.log(bookPath, 'created OK!')
  })
})()

