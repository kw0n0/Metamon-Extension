/* 
self + children + event 구조로 작성
**/

function makeContainer(id) {
  const container = document.createElement('div');
  container.id = id;
  container.style.position = 'absolute';
  container.style.display = 'none';
  //MEMO: 페이지마다 다른 값이므로 이렇게 고정해두어야함
  container.style.fontSize = '13px';
  container.style.lineHeight = '24px';

  //FIXME: 가장 높은 zIndex 설정방법 수정필요
  container.style.zIndex = 99999;

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

  Object.assign(container.style, customStyle);

  return container;
}

function makeSaveButton() {
  //self
  const button = document.createElement('div');
  button.textContent = '텍스트 저장';
  button.style.width = 'auto';
  button.style.height = '100%';
  button.style.padding = '5px';

  return button;
}

function makeCategoryButton() {
  //self
  const button = document.createElement('div');
  button.textContent = '카테고리';
  button.style.width = 'auto';
  button.style.height = '100%';
  button.style.padding = '5px';

  //children
  const dropdown = makeDropdown();

  const fakeArea = document.createElement('div');
  fakeArea.style.width = '10px';
  fakeArea.style.height = '34px';
  fakeArea.style.position = 'absolute';
  fakeArea.style.top = '50%';
  fakeArea.style.transform = 'translateY(-50%)';
  fakeArea.style.right = '-10px';
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

function makeDropdown() {
  //self
  const dropdown = document.createElement('div');
  dropdown.style.flexDirection = 'column';
  dropdown.style.backgroundColor = 'white';
  dropdown.style.border = '2px solid gray';
  dropdown.style.borderRadius = '10px';
  dropdown.style.position = 'absolute';
  dropdown.style.top = '-50%';
  dropdown.style.right = '-60px';
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

export { makeContainer, makeSaveButton, makeCategoryButton };
