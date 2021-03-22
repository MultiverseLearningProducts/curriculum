function parsePageBreak (state, silent) {
    const start = state.pos
    let end = start
    if (state.src.charAt(end) !== '<') { return false }
    ++end;
    // now keep gobbling up the '<<<<>>>>' marker
    while (end < state.posMax && state.src.charAt(end) === '<' || state.src.charAt(end) === '>') { ++end }
    const slice = state.src.slice(start, end)
    if (slice.length > 8) { return false }
    state.push({type: 'pageBreak', content: null, block: false, level: state.level})
    state.pos += slice.length
    return true
}
function renderPageBreak () {
    return `<hr style="page-break-after:always;opacity:0;"></hr>`
}
module.exports = function pageBreaks (md) {
    md.inline.ruler.push('pageBreak', parsePageBreak)
    md.renderer.rules.pageBreak = (tokens, idx) => renderPageBreak(tokens[idx].content, tokens[idx].block)
}