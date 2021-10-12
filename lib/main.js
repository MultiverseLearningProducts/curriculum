const dirTree = require("directory-tree")
const path = require('path')
const {execSync} = require('child_process')
const fs = require('fs')
const writeHtmlFiles = require('./write')

const createDirPath = (rootpath, file) => {
	const subDir = rootpath.includes('notes') ? 'notes' : ''
	return file.path.replace(rootpath, subDir).replace(file.name, '').split('/').filter(p => p.length).join('/')
}

const renderFile = (rootpath, navTree) => {
	return file => {
		fs.readFile(file.path, 'utf8', async (err, content) => {
			writeHtmlFiles({
				title: content.split(/\\n/)[0].split('\n')[0].replace('#', ''),
				dirPath: createDirPath(rootpath, file),
				fileName: file.name,
				content: content,
				navTree: navTree
			})
		})  
	}
}

const createSubNav = (children) => {
	return `<ul>${children.map(createNavLink).join('')}</ul>`
}

const createNavLink = (child) => {
	const subNav = child.children ? createSubNav(child.children) : ''
	if (child.name === 'index.md') return ''
	let href = '/curriculum' + child.path
		.replace(/.+src|.+notes/g, '')
		.replace('.md', '.html')
	if (href.substring(href.length - 5) !== '.html') href += '/index.html'
	const name = child.name.replace(/\.md/g,'').replace(/_|-/g, ' ')
	const heading = `<details><summary>${name}</summary>${subNav}</details>`
	const navLink = `<li><a class="nav-link" href="${href}">${name}</a></li>`
	return subNav ? heading : navLink
}

const renderNavTree = (curriculumSrcTree) => {
	return `<nav id="navigation"><ul>${curriculumSrcTree.children
		.sort((a, b) => a.name.localeCompare(b.name))
		.map(createNavLink).join('')}</ul></nav>`
}

const renderTree = (rootpath, children, navTree) => {
	const renderTo = renderFile(rootpath, navTree)
	children.filter(child => child.type === 'file' && child.extension == '.md').forEach(renderTo)
	children.filter(child => child.type === 'directory').forEach(f => renderTree(rootpath, f.children, navTree))
}

const copyAssets = () => {
	const from = path.join(__dirname, '..', 'assets', '*')
	const to = path.join(__dirname, '..', 'docs')
	execSync(`${process.platform === 'win32' ? 'xcopy /e /k /h /i' : 'cp -R'} ${from} ${to}`)
}

(async function () {
	const curriculumSrc = path.join(__dirname, '..', 'src')
	// const notesSrc = path.join(__dirname, '..', 'notes')
	const curriculumSrcTree = await dirTree(curriculumSrc)
	// const notesSrcTree = await dirTree(notesSrc)
	
	execSync(`${process.platform === 'win32' ? 'del /s /q' : 'rm -fr'} ${path.join(__dirname, '..', 'docs', '*.*')}`)
	
	// try {
	// 	fs.mkdirSync(path.join(__dirname, '..', 'docs', 'notes'))
	// } catch(err) {
	// 	if (err.code !== 'EEXIST') console.error(err)
	// }

	const curriculumNavTree = renderNavTree(curriculumSrcTree)
	// const notesNavTree = renderNavTree(notesSrcTree)

	renderTree(curriculumSrc, curriculumSrcTree.children, curriculumNavTree)
	// renderTree(notesSrc, notesSrcTree && notesSrcTree.children || [], notesNavTree)

	copyAssets()
})()