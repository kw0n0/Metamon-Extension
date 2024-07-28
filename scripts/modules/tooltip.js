class Tooltip {
  constructor({ width, height, id }) {
    this.width = width;
    this.height = height;
    this.id = id;
    this.curText;
    this.box = document.createElement('div');
    this.initialize();
  }

  initialize() {
    this.box.id = this.id;
    this.box.style.position = 'absolute';
    this.box.style.display = 'none';
    this.box.textContent = '텍스트 저장';

    this.box.addEventListener('click', () => {
      console.log(this.curText);
      this.hide();
    });

    //FIXME: 가장 높은 zIndex 설정방법 수정필요
    this.box.style.zIndex = 99999;

    const customStyle = {
      width: 'auto',
      height: `${this.height}px`,
      color: 'black',
      fontWeight: 'bold',
      padding: '10px',
      alignItems: 'center',
      cursor: 'pointer',
      border: '2px solid gray',
      backgroundColor: 'white',
      borderRadius: '50px',
    };

    Object.assign(this.box.style, customStyle);
    document.body.appendChild(this.box);
  }

  show({ top, left, right, bottom }) {
    //FIXME: 위치 수정필요
    const posY = top < this.height ? bottom : top - this.height;
    const posX = left < this.width ? right : left - this.width;

    this.box.style.top = `${posY + window.scrollY}px`;
    this.box.style.left = `${posX + window.scrollX}px`;
    this.box.style.display = 'flex';
  }

  saveText(text) {
    this.curText = text;
  }

  hide() {
    this.box.style.display = 'none';
  }
}

export { Tooltip };
