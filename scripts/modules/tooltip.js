/* 
TODO:
최대한 독립적으로 존재할 수 있도록 리팩토링

RULE:
중복을 최대한 줄여야하지만, 생성 시(+특정 컴포넌트에만 해당되는 경우) 메소드로 생성 제한.
우선 self + children + event 구조로 작성
**/
class Tooltip {
  constructor({ id }) {
    this.id = id;
    this.box = document.createElement('div');
    this.saveButton;
    this.categoryButton;
    this.initialize();
    this._text;
  }

  #makeSaveButton() {
    //self
    const button = document.createElement('div');
    button.textContent = '텍스트 저장';
    button.style.width = 'auto';
    button.style.height = '100%';
    button.style.padding = '5px';

    return button;
  }

  #makeCategoryButton() {
    //self
    const button = document.createElement('div');
    button.textContent = '카테고리';
    button.style.width = 'auto';
    button.style.height = '100%';
    button.style.padding = '5px';

    //children
    const dropdown = this.#makeDropdown();

    const fakeArea = document.createElement('div');
    fakeArea.style.width = '10px';
    fakeArea.style.height = '34px';
    fakeArea.style.position = 'absolute';
    fakeArea.style.top = '50%';
    fakeArea.style.transform = 'translateY(-50%)';
    fakeArea.style.right = '-10px';
    fakeArea.style.background = 'red';
    fakeArea.style.opacity = 0;

    button.append(fakeArea, dropdown);

    //event
    button.addEventListener('mouseover', () => {
      dropdown.style.display = 'flex';
    });
    button.addEventListener('mouseout', (event) => {
      if (!button.contains(event.relatedTarget)) {
        dropdown.style.display = 'none';
      }
    });

    return button;
  }

  #makeDropdown() {
    //self
    const dropdown = document.createElement('div');
    dropdown.style.flexDirection = 'column';
    dropdown.style.backgroundColor = 'white';
    dropdown.style.border = '2px solid gray';
    dropdown.style.borderRadius = '10px';
    dropdown.style.position = 'absolute';
    dropdown.style.top = '-50%';
    dropdown.style.right = '-65px';
    dropdown.style.padding = '7px';
    dropdown.style.display = 'none';

    const hideDropdown = () => {
      dropdown.style.display = 'none';
    };

    //children
    const option1 = document.createElement('div');
    const option2 = document.createElement('div');

    option1.textContent = '옵션 1';
    option2.textContent = '옵션 2';
    option1.addEventListener('click', () => hideDropdown());
    option2.addEventListener('click', () => hideDropdown());

    dropdown.append(option1, option2);

    //event
    dropdown.addEventListener('mouseout', (event) => {
      if (!dropdown.contains(event.relatedTarget)) {
        hideDropdown();
      }
    });

    return dropdown;
  }

  initialize() {
    this.box.id = this.id;
    this.box.style.position = 'absolute';
    this.box.style.display = 'none';
    //MEMO: 페이지마다 다른 값이므로 이렇게 고정해두어야함
    this.box.style.fontSize = '13px';
    this.box.style.lineHeight = '24px';

    //FIXME: 가장 높은 zIndex 설정방법 수정필요
    this.box.style.zIndex = 99999;

    const customStyle = {
      width: 'auto',
      height: 'auto',
      color: 'black',
      fontWeight: 'bold',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      border: '2px solid gray',
      backgroundColor: 'white',
      borderRadius: '10px',
    };

    Object.assign(this.box.style, customStyle);

    this.saveButton = this.#makeSaveButton();
    this.categoryButton = this.#makeCategoryButton();
    this.box.append(this.saveButton, this.categoryButton);
    document.body.appendChild(this.box);
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

    this.box.style.top = `${posY + window.scrollY}px`;
    this.box.style.left = `${posX + window.scrollX}px`;
    this.box.style.display = 'flex';
  }

  hide() {
    this.box.style.display = 'none';
  }
}

export { Tooltip };
