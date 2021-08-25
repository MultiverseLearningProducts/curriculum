function supportedLanguages (line) {
  const supported = ['Javascript', 'Java', 'PHP', 'C#', 'Python']
  const langs = line.split('|').slice(1, -1)
  return langs.every(lang => supported.includes(lang))
}

function parseTabbedCodeBlock (state, startLine, endLine, silent) {
    let pos = state.bMarks[startLine] + state.tShift[startLine]
    const max = state.eMarks[startLine]  
    const marker = state.src.charCodeAt(pos)

    // Wrong marker
    if (marker !== 124 /* '|' */) return false
 
    const line = state.src.slice(pos, max).trim()

    if (!supportedLanguages(line)) return false

    if (silent) return true
  
    // Scan for marker ending
    let nextLine = startLine
    let hasEnding = false
  
    while (nextLine < endLine) {
      nextLine++
  
      if (nextLine >= endLine) break
  
      const nextPos = state.bMarks[nextLine] + state.tShift[nextLine]
      const nextMax = state.eMarks[nextLine]
  
      if (state.src.charCodeAt(nextPos) !== marker) continue
  
      const nextLineText = state.src.slice(nextPos, nextMax).trim()
      if (nextLineText === line) {
        hasEnding = true
        break
      }
    }
  
    // Ensure nested parsing stops at delimiting block
    const oldMax = state.lineMax
    state.lineMax = nextLine + (hasEnding ? -1 : 0)
    const oldParentType = state.parentType
    state.parentType = 'admonition'
  
    let lines
  
    // Let register token and progress
    state.tokens.push({
      type: 'callout_open',
      level: state.level,
      lines: lines = [startLine, 0],
      title: line
    })
    state.parser.tokenize(state, startLine + 1, nextLine)
    state.tokens.push({
      type: 'callout_close',
      level: state.level
    })
  
    // Revert
    lines[1] = nextLine
    state.line = nextLine + (hasEnding ? 1 : 0)
    state.lineMax = oldMax
    state.parentType = oldParentType
  
    return true
}
function createTabHtml (title) {
    return `<a href="#${title.toLowerCase()}" onclick="selectCodeBlock('${title.toLowerCase()}')">${title}</a>`
}
function renderTabbedCodeBlockOpen (block) {
    return `<section class="tabbed-code-block"><nav>${block.title.split('|').slice(1,-1).map(createTabHtml).join('')}</nav><article>`
}
function renderTabbedCodeBlockClose (content, block) {
    return `</article></section>`
}
module.exports = function tabbedCodeBlocks (md) {
    md.block.ruler.before('code', 'callout', parseTabbedCodeBlock)
    md.renderer.rules.callout_open = (tokens, idx) => renderTabbedCodeBlockOpen(tokens[idx])
    md.renderer.rules.callout_close = (tokens, idx) => renderTabbedCodeBlockClose(tokens[idx])
}