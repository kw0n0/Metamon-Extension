async function createTooltip() {
  const result = await import('./modules/tooltip.js');
  return result.Tooltip;
}

async function createMessages() {
  const result = await import('./modules/messages.js');
  return result.messages;
}

async function loadStore() {
  const result = await import('./modules/store.js');
  return result.getStore;
}

class Content {
  constructor({ createTooltip, createMessages, loadStore }) {
    this.createMessages = createMessages;
    this.createTooltip = createTooltip;
    this.loadStore = loadStore;
  }

  #onRuntimeMessage({ messages }) {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      //MEMO: 메세지 수신 시 부가적인 작업이 많으면 분리예정
      if (!messages[request.type]) return;

      messages[request.type](request.data);
    });
  }

  //TODO: 이벤트리스너가 많아지는 경우에 대한 고려
  async #onSystemEvent({ Tooltip }) {
    const getStore = await this.loadStore();
    const store = getStore();
    let text;

    const tooltip = new Tooltip({
      width: 70,
      height: 30,
      id: 'metamon-tooltip1',
    });

    function selectText() {
      const tmpText = window.getSelection().toString();
      if (!tmpText.trim()) {
        tooltip.hide();
        return;
      }

      text = window.getSelection().toString();
      const { top, right, left, bottom } = window
        .getSelection()
        .getRangeAt(0)
        .getBoundingClientRect();

      tooltip.show({ top, right, left, bottom });
    }

    function saveText() {
      store.add(text);
      text = '';
    }

    document.body.addEventListener('mouseup', selectText);
    tooltip.click(saveText);
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

const content = new Content({ createTooltip, createMessages, loadStore });

content.listen();
