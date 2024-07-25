export const messages = {
  highlightColor: changeHighlightColor,
};

function changeHighlightColor(data) {
  const style = document.querySelector('style[metamon]');

  if (style) {
    style.textContent = `::selection {background-color: ${data};}`;
  } else {
    const newStyle = document.createElement('style');
    newStyle.textContent = `::selection {background-color: ${data};}`;
    newStyle.setAttribute('metamon', true);
    document.head.appendChild(newStyle);
  }
}
