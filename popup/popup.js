const colors = ['tomato', 'yellow', 'beige'];
const buttonBox = document.getElementById('button-box');

colors.forEach((color) => {
  const colorButton = document.createElement('button');
  colorButton.style.background = color;
  colorButton.addEventListener(
    'click',
    handleClickColorBtn.bind(null, { color: colorButton.style.background })
  );
  buttonBox.appendChild(colorButton);
});

function handleClickColorBtn({ color }) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
    chrome.tabs.sendMessage(tab[0].id, { type: 'highlightColor', data: color });
  });
}
