const dirTree = require("directory-tree")
const path = require('path')
const {execSync} = require('child_process')
const fs = require('fs')
const writeHtmlFiles = require('./write')



const createDirPath = (rootpath, file) => {
	const subDir = rootpath.includes('notes') ? 'notes' : ''
	return file.path.replace(rootpath, subDir).replace(file.name, '').split('/').filter(p => p.length).join('/')
}

const renderFile = rootpath => {
	return file => {
		fs.readFile(file.path, 'utf8', async (err, content) => {
			writeHtmlFiles({
				title: content.split(/\\n/)[0].split('\n')[0].replace('#', ''),
				dirPath: createDirPath(rootpath, file),
				fileName: file.name,
				content: content
			})
		})  
	}
}

const renderTree = (rootpath, children) => {
	const renderTo = renderFile(rootpath)
	children.filter(child => child.type === 'file' && child.extension == '.md').forEach(renderTo)
	children.filter(child => child.type === 'directory').forEach(f => renderTree(rootpath, f.children))
}

const copyAssets = () => {
	const from = path.join(__dirname, '..', 'assets', '*')
	const to = path.join(__dirname, '..', 'docs')
	execSync(`${process.platform === 'win32' ? 'copy' : 'cp -R'} ${from} ${to}`)
}

(async function () {
	const curriculumSrc = path.join(__dirname, '..', 'src')
	const notesSrc = path.join(__dirname, '..', 'notes')
	
	const curriculumSrcTree = await dirTree(curriculumSrc)
	const notesSrcTree = await dirTree(notesSrc)
	execSync(`${process.platform === 'win32' ? 'del /s /q' : 'rm -fr'} ${path.join(__dirname, '..', 'docs', '*.*')}`)
	try {
		fs.mkdirSync(path.join(__dirname, '..', 'docs', 'notes'))
	} catch(err) {
		console.error(err)
	}
	
	renderTree(curriculumSrc, curriculumSrcTree.children)
	renderTree(notesSrc, notesSrcTree.children)

	copyAssets()
})()