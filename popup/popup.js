class HighlightColorBox {
  constructor({ sendMessageToTab }) {
    this.colors = ['tomato', 'yellow', 'beige'];
    this.sendMessageToTab = sendMessageToTab;
  }

  #getButtonBox() {
    const buttonBox = document.getElementById('button-box');
    return buttonBox;
  }

  #makeColorInput() {
    const input = document.createElement('input');
    input.type = 'color';
    input.style.width = '200px';
    input.style.height = '50px';

    input.addEventListener('input', (e) =>
      sendMessageToTab.bind(null, {
        type: 'highlightColor',
        data: { color: e.target.value },
      })()
    );

    return input;
  }

  #addButtonToBox(box, element) {
    box.appendChild(element);
  }

  show() {
    const buttonBox = this.#getButtonBox();
    const colorInput = this.#makeColorInput();
    this.#addButtonToBox(buttonBox, colorInput);
  }
}

function sendMessageToTab({ type, data }) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
    chrome.tabs.sendMessage(tab[0].id, {
      type: type,
      data: data.color,
    });
  });
}

const hlColorBox = new HighlightColorBox({
  sendMessageToTab,
});

hlColorBox.show();
