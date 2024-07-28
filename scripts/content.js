async function createTooltip() {
  const result = await import('./modules/tooltip.js');
  return result.Tooltip;
}

async function createMessages() {
  const result = await import('./modules/messages.js');
  return result.messages;
}

class Content {
  constructor({ createTooltip, createMessages }) {
    this.createMessages = createMessages;
    this.createTooltip = createTooltip;
  }

  #onRuntimeMessage({ messages }) {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      //MEMO: 메세지 수신 시 부가적인 작업이 많으면 분리예정
      if (!messages[request.type]) return;

      messages[request.type](request.data);
    });
  }

  //TODO: 이벤트리스너가 많아지는 경우에 대한 고려
  #onSystemEvent({ Tooltip }) {
    const tooltip = new Tooltip({
      width: 70,
      height: 30,
      id: 'metamon-tooltip1',
    });

    function selectText() {
      const text = window.getSelection().toString();

      if (!text.trim()) {
        tooltip.hide();
        return;
      }

      const { top, right, left, bottom } = window
        .getSelection()
        .getRangeAt(0)
        .getBoundingClientRect();

      tooltip.show({ top, right, left, bottom });
      tooltip.saveText(text);
    }

    document.body.addEventListener('mouseup', selectText);
  }

  listen() {
    this.createMessages().then((messages) => {
      this.#onRuntimeMessage({ messages });
    });
    this.createTooltip().then((Tooltip) => {
      this.#onSystemEvent({ Tooltip });
    });
  }
}

const content = new Content({ createTooltip, createMessages });

content.listen();
