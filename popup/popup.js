class HighlightColorBox {
  constructor({ sendMessageToTab }) {
    this.colors = ['tomato', 'yellow', 'beige'];
    this.sendMessageToTab = sendMessageToTab;
  }

  #getButtonBox() {
    const buttonBox = document.getElementById('button-box');
    return buttonBox;
  }

  #makeButton(color) {
    const colorButton = document.createElement('button');
    colorButton.style.background = color;
    colorButton.addEventListener(
      'click',
      sendMessageToTab.bind(null, {
        type: 'highlightColor',
        data: { color: colorButton.style.background },
      })
    );
    return colorButton;
  }

  #addButtonToBox(box, element) {
    box.appendChild(element);
  }

  show() {
    this.colors.forEach((color) => {
      const buttonBox = this.#getButtonBox();
      const colorButton = this.#makeButton(color);
      this.#addButtonToBox(buttonBox, colorButton);
    });
  }
}

function sendMessageToTab({ type, data }) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
    chrome.tabs.sendMessage(tab[0].id, { type: type, data: data.color });
  });
}

const hlColorBox = new HighlightColorBox({
  sendMessageToTab,
});

hlColorBox.show();
