function setActiveTabClass (tab) {
    tab.classList.remove('active')
    if (tab.getAttribute('href') === window.location.hash) tab.classList.add('active')
}

function setActiveTab() {
    document.querySelectorAll('.tabbed-code-block nav a').forEach(setActiveTabClass)
    localStorage.setItem('lang-pref', window.location.hash)
}

window.onload = function () {
    window.location.hash = localStorage.getItem('lang-pref') || '#javascript'
    setActiveTab()
    selectCodeBlock(window.location.hash.substring(1))
    window.addEventListener('hashchange', setActiveTab)
}

hljs.highlightAll()

function selectCodeBlock(lang) {
    const blocks = [...document.querySelectorAll('.tabbed-code-block article pre code')]
    blocks.forEach(block => {
        block.classList.remove('selected', 'unselected')
        block.classList.contains(`language-${lang}`) ? block.classList.add('selected') : block.classList.add('unselected')
    })
}
