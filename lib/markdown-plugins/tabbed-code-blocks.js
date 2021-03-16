function parseTabbedCodeBlock (state, silent) {
    console.log(state)
    // const start = state.pos
    // const end = state.posMax
    // // let cursor = start
    // // if (state.src.charAt(cursor) !== "|") return false
    // // if (!state.src.charAt(++cursor).match(/[J|P|S]/)) return false
    // // console.log(state.src.charAt(cursor))
    // const length = end - start
    // console.log(state.src.slice(0, length))
    // state.pos += length
    return true
}
function renderTabbedCodeBlock (content, block) {
    return `<pre>Code Block</pre>`
}
module.exports = function tabbedCodeBlocks (md) {
    md.block.ruler.push('tabbedCodeBlock', parseTabbedCodeBlock)
    md.renderer.rules.tabbedCodeBlock = (tokens, idx) => renderTabbedCodeBlock(tokens[idx].content, tokens[idx].block)
}