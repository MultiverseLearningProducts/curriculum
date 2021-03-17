function parseEmbed (state, silent) {
    const start = state.pos
    const end = state.posMax
    let cursor = start
    if (state.src.charAt(cursor) !== '!') return false
    if (state.src.charAt(++cursor) !== '(') return false
    let url = ''
    while(cursor < end && state.src.charAt(++cursor) !== ')') {
        url += state.src.charAt(cursor)
    }
    state.push({type: 'embed', content: url, block: true, level: state.level})
    state.pos += (cursor - start)
    state.pos += 1
    return true
}
function renderEmbed (url) {
    if (url.substring(url.length - 5) === 'embed') {
        return `<iframe src="${url}" width="100%" height="444px" allowfullscreen frameborder=0></iframe>`
    } else {
        return `<mark style="background-color:var(--mv-supernova);padding:1rem;border: var(--mv-molton) 2px dashed;">Your url ${url} needs to end in '/embed' for embeds to work correctly</mark>`
    }
}
module.exports = function embeds (md) {
    md.inline.ruler.push('embed', parseEmbed)
    md.renderer.rules.embed = (tokens, idx) => renderEmbed(tokens[idx].content, tokens[idx].block)
}