//TODO: 모듈로 분리예정
const events = [
  {
    target: document.body,
    action: 'mouseup',
    handler: selectText,
  },
];

function selectText() {
  const text = window.getSelection().toString();
  if (!text) return;

  console.log(text);
}

//TODO: 모듈로 분리예정
const messages = {
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

class Content {
  constructor({ events, messages }) {
    this.events = events;
    this.messages = messages;
  }

  #onRuntimeMessage() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      //MEMO: 메세지 수신 시 부가적인 작업이 많으면 분리예정
      if (!this.messages[request.type]) return;

      this.messages[request.type](request.data);
    });
  }

  #onSystemEvent() {
    this.events.forEach(({ target, action, handler }) => {
      target.addEventListener(action, handler);
    });
  }

  listen() {
    this.#onRuntimeMessage();
    this.#onSystemEvent();
  }
}

const content = new Content({ events, messages });

content.listen();
