chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type == 'highlightColor') {
    const style = document.querySelector('style[metamon]');

    if (style) {
      style.textContent = `::selection {background-color: ${request.data};}`;
    } else {
      const newStyle = document.createElement('style');
      newStyle.textContent = `::selection {background-color: ${request.data};}`;
      newStyle.setAttribute('metamon', true);
      document.head.appendChild(newStyle);
    }
  }
});
