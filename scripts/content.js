//TODO: 모듈로 분리예정
class Tooltip {
  constructor({ width, height, id }) {
    this.width = width;
    this.height = height;
    this.id = id;
    this.initialize();
  }

  initialize() {
    const box = document.createElement('div');
    box.id = this.id;
    box.style.position = 'absolute';
    box.style.display = 'none';
    //FIXME: 가장 높은 zIndex 설정방법 수정필요
    box.style.zIndex = 99999;

    const customStyle = {
      width: `${this.width}px`,
      height: `${this.height}px`,

      backgroundColor: 'cyan',
      borderRadius: '50px',
    };

    Object.assign(box.style, customStyle);
    document.body.appendChild(box);
  }

  show({ top, left, right, bottom }) {
    //FIXME: 위치 수정필요
    const box = document.getElementById(this.id);
    const posY = top < this.height ? bottom : top - this.height;
    const posX = left < this.width ? right : left - this.width;

    box.style.top = `${posY + window.scrollY}px`;
    box.style.left = `${posX + window.scrollX}px`;
    box.style.display = 'block';
  }
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
  constructor({ messages }) {
    this.messages = messages;
  }

  #onRuntimeMessage() {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      //MEMO: 메세지 수신 시 부가적인 작업이 많으면 분리예정
      if (!this.messages[request.type]) return;

      this.messages[request.type](request.data);
    });
  }

  //TODO: 이벤트리스너가 많아지는 경우에 대한 고려
  #onSystemEvent() {
    const tooltip = new Tooltip({
      width: 70,
      height: 30,
      id: 'metamon-tooltip1',
    });

    function selectText() {
      const text = window.getSelection().toString();
      if (!text) return;

      const { top, right, left, bottom } = window
        .getSelection()
        .getRangeAt(0)
        .getBoundingClientRect();

      tooltip.show({ top, right, left, bottom });
      console.log(text);
    }

    document.body.addEventListener('mouseup', selectText);
  }

  listen() {
    this.#onRuntimeMessage();
    this.#onSystemEvent();
  }
}

const content = new Content({ messages });

content.listen();
