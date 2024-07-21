class HighlightColorBox {
  constructor({ addButtonToBox }) {
    this.colors = ['tomato', 'yellow', 'beige'];
    this.addButtonToBox = addButtonToBox;
  }

  show() {
    this.colors.forEach((color) => {
      addButtonToBox(color);
    });
  }
}

function addButtonToBox(color) {
  const buttonBox = getButtonBox();
  const colorButton = makeButton(color);
  buttonBox.appendChild(colorButton);
}

function getButtonBox() {
  const buttonBox = document.getElementById('button-box');
  return buttonBox;
}

function makeButton(color) {
  const colorButton = document.createElement('button');
  colorButton.style.background = color;
  colorButton.addEventListener(
    'click',
    sendColorChangedMsg.bind(null, { color: colorButton.style.background })
  );
  return colorButton;
}

function sendColorChangedMsg({ color }) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
    chrome.tabs.sendMessage(tab[0].id, { type: 'highlightColor', data: color });
  });
}

const hlColorBox = new HighlightColorBox({
  addButtonToBox,
});

hlColorBox.show();
