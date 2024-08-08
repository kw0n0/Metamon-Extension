//FIXME: any 제거
async function createTooltip(): Promise<any> {
  const result = await import('./modules/tooltip/tooltip.js');
  return result.Tooltip;
}

async function createMessages(): Promise<any> {
  const result = await import('./modules/messages.js');
  return result.messages;
}

async function loadStore(): Promise<any> {
  const result = await import('./modules/store.js');
  return result.getStore;
}

class Content {
  private onRuntimeMessage({ messages }: any) {
    chrome.runtime.onMessage.addListener((request) => {
      //MEMO: 메세지 수신 시 부가적인 작업이 많으면 분리예정
      if (!messages[request.type]) return;

      messages[request.type](request.data);
    });
  }

  //TODO: 이벤트리스너가 많아지는 경우에 대한 고려
  private async onSystemEvent({ Tooltip }: any): Promise<void> {
    const getStore = await loadStore();
    const store = getStore();

    const tooltip = new Tooltip({
      id: 'metamon-tooltip1',
      events: { target: 'saveButton', action: 'click', handler: saveText },
    });

    function selectText() {
      const selectedText = window.getSelection()?.toString();
      if (!selectedText?.trim()) {
        tooltip.hide();
        return;
      }

      tooltip.text = selectedText;
      const { top, right, left, bottom } = window
        .getSelection()
        ?.getRangeAt(0)
        .getBoundingClientRect() as DOMRect;

      tooltip.show({ top, right, left, bottom });
    }

    function saveText() {
      store.add(tooltip.text);
      tooltip.text = '';
      tooltip.hide();
    }

    document.body.addEventListener('mouseup', selectText);
  }

  async listen() {
    const messages = await createMessages();
    const Tooltip = await createTooltip();

    this.onRuntimeMessage({ messages });
    this.onSystemEvent({ Tooltip });
  }
}

const content = new Content();

content.listen();
