const visit = require('unist-util-visit')
const h = require('hastscript')

const isPageBreakBlock = node => {
    console.log(node)
    return node.tagName === 'p' && node.children.some(({ value }) => {
        return String(value).match(/<<<<>>>>/)
    })
}

module.exports = function pageBreaks () {
    return function transformer(tree) {
        visit(tree, 'element', node => {
            if (!isPageBreakBlock(node)) return
            Object.assign(node, h('div', {style: 'page-break-after:always;'}))
        })
    }
}