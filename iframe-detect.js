
// TODO only display statcounter, html validator, etc, if standalone
function inIframe () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
}