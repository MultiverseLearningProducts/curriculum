function parseQuiz(state, startLine, endLine, silent) {
    var marker, len, params, nextLine, mem,
        haveEndMarker = false,
        pos = state.bMarks[startLine] + state.tShift[startLine],
        max = state.eMarks[startLine];
  
    if (pos + 3 > max) { return false; }
  
    marker = state.src.charCodeAt(pos);
    
    if (marker !== 0x3f/* ? */) {
      return false;
    }
  
    // scan marker length
    mem = pos;
    pos = state.skipChars(pos, marker);
  
    len = pos - mem;
    // We need 3 ??? to start a quiz block
    if (len < 3) { return false; }
  
    // Since start is found, we can report success here in validation mode
    if (silent) { return true; }
  
    // search end of block
    nextLine = startLine;
  
    for (;;) {
      nextLine++;
      if (nextLine >= endLine) {
        // unclosed block should be autoclosed by end of document.
        // also block seems to be autoclosed by end of parent
        break;
      }
  
      pos = mem = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];
  
      if (pos < max && state.tShift[nextLine] < state.blkIndent) {
        // non-empty line with negative indent should stop the list:
        // - ```
        //  test
        break;
      }
  
      if (state.src.charCodeAt(pos) !== marker) { continue; }
  
      if (state.tShift[nextLine] - state.blkIndent >= 4) {
        // closing fence should be indented less than 4 spaces
        continue;
      }
  
      pos = state.skipChars(pos, marker);
  
      // closing code fence must be at least as long as the opening one
      if (pos - mem < len) { continue; }
  
      // make sure tail has spaces only
      pos = state.skipSpaces(pos);
  
      if (pos < max) { continue; }
  
      haveEndMarker = true;
      // found!
      break;
    }
  
    // If a fence has heading spaces, they should be removed from its inner block
    len = state.tShift[startLine];
  
    state.line = nextLine + (haveEndMarker ? 1 : 0);
    state.tokens.push({
      type: 'quiz',
      content: state.getLines(startLine + 1, nextLine, len, true),
      lines: [ startLine, state.line ],
      level: state.level
    });
  
    return true;
  }

function renderQuiz (token) {
    const answers = token.content.split('\n')
    answers.pop()
    const question = answers.shift()
    const correctAnswer = answers.filter(a => a.substring(0, 4) === '[#] ')

    return `<article class="mv-quiz">
                <header>${question.substring(4)}</header>
                <ol>${answers.map(a => `<li><input type="radio" />&nbsp;${a.substring(4)}</li>`).join('')}</ol>
            </article>`
}

module.exports = function multiverseMultiquizzes (md) {
    md.block.ruler.before('fences', 'quiz', parseQuiz)
    md.renderer.rules.quiz = (tokens, idx) => renderQuiz(tokens[idx])
}