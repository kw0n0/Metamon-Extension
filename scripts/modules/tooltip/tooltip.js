async function loadElements() {
  const result = await import('./elements.js');
  return result;
}

/* 
RULE:
1. 최대한 관심사가 분리되도록 지속적으로 리팩토링 고려 및 수행
   (but, 분리를 위한 과도한 분리는 지양할 것)
2. 중복을 줄이기 위해 무턱대고 this로 선언하는 것을 지양
**/
class Tooltip {
  constructor({ id, events }) {
    this.id = id;
    this.container;
    this.saveButton = null;
    this.categoryButton;
    this.#initialize({ id, events });
    this._text;
  }

  async #initialize({ id, events }) {
    const { makeContainer, makeSaveButton, makeCategoryButton } =
      await loadElements();

    this.container = makeContainer(id);
    this.saveButton = makeSaveButton();
    this[events.target].addEventListener(events.action, events.handler);

    this.categoryButton = makeCategoryButton();

    this.container.append(this.saveButton, this.categoryButton);
    document.body.appendChild(this.container);
  }

  get text() {
    return this._text;
  }

  set text(newText) {
    this._text = newText;
  }

  show({ top, left, right, bottom }) {
    //FIXME: 위치 수정필요
    const posY = top < 38 ? bottom : top - 38;
    const posX = left < 128 ? right : left - 128;

    this.container.style.top = `${posY + window.scrollY}px`;
    this.container.style.left = `${posX + window.scrollX}px`;
    this.container.style.display = 'flex';
  }

  hide() {
    this.container.style.display = 'none';
  }
}

export { Tooltip };
