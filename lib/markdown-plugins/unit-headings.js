function parseUnitHeading (state, silent) {
    const start = state.pos
    const end = state.posMax
    let cursor = start
    if (state.src.charAt(cursor) !== '[') return false
    if (state.src.charAt(++cursor) !== '#') return false
    let title = ''
    while(cursor < end && state.src.charAt(++cursor) !== '#') {
        title += state.src.charAt(cursor)
    }
    state.push({type: 'unitHeading', content: title, block: true, level: state.level})
    state.pos += (cursor - start)
    state.pos += 2
    return true
}
function renderUnitHeading (title) {
    return `<h2 style="margin:0;padding:0;color:hotpink;text-shadow: 3px 3px 3px white;text-align:center;font-size:3.5rem;background-image:url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsqze8IAa0O-2qAt-6TkZCL6aZJyWfqMcu-g&usqp=CAU);background-size:25% auto;">${title}</h2>`
}
module.exports = function unitHeadings (md) {
    md.inline.ruler.push('unitHeading', parseUnitHeading)
    md.renderer.rules.unitHeading = (tokens, idx) => renderUnitHeading(tokens[idx].content, tokens[idx].block)
}