const markdownpdf = require('markdown-pdf')
const dirTree = require("directory-tree")
const path = require('path')
const fs = require('fs/promises')
const {createReadStream, createWriteStream} = require('fs')

const filesFirst = (a) => a.type && a.type === 'file' ? -1 : 1

function getPaths(child) {
  if(child.type === 'file' && child.extension === '.md') {
    return {path: child.path}
  } else if (child.type === 'directory') {
    return [{title: child.name}, ...child.children.sort(filesFirst).map(getPaths)].flat()
  } else if (Array.isArray(child)) {
    return child.map(getPaths)
  }
}

async function consumeMarkdown (memo, filePaths) {
  if (!filePaths.length) return memo
  const content = filePaths.shift()
  if (content.path) {
    const md = await fs.readFile(content.path)
    memo += md.toString()    
  }

  if (content.title) {
    memo += content.title
  }

  consumeMarkdown(memo, filePaths)
}

async function curriculumSrcTree() {
  const curriculumSrc = path.join(__dirname, '..', 'src')
  const {children} = await dirTree(curriculumSrc)
  const filePaths = children.sort(filesFirst).map(getPaths).flat()
  const content = consumeMarkdown("", filePaths)
  return content
}

(async function () {
  const _tmp = path.join(__dirname, '_tmp_content.md')
  const bookPath = path.join(__dirname, '..', 'book', 'Multiverse-Software-Engineering-Level-4-Curriculum.pdf')
  const content = await curriculumSrcTree()

  // await fs.writeFile(_tmp, content)
  // await fs.unlink(bookPath)
  // const writeStream = createWriteStream(bookPath)
  
  // createReadStream(_tmp)
  //   .pipe(markdownpdf())
  //   .pipe(writeStream)

  // writeStream.on('close', async () => {
  //   await fs.unlink(_tmp)
  //   console.log(bookPath, 'created OK!')
  // })  
})()

