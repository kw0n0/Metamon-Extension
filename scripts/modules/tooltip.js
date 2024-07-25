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

export { Tooltip };
