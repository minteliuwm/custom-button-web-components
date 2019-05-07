class MyButtonTemplate extends HTMLElement {
  constructor() {
    super();

    // 获取index.html里边的template模板，挂载到shadow dom下
    const template = document.getElementById('my-button-template').content;
    this.attachShadow({ mode: 'open' }).appendChild(template.cloneNode(true));
  }

  // properties与attributes映射
  get type() {
    return this.getAttribute('type');
  }

  set type(newVal) {
    this.setAttribute('type', newVal);
  }

  // 监测attributes变化
  static get observedAttributes() {
    return ['type'];
  }

  // attributes变化回调函数
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'type') {
      updateStyle(this, newValue);
    }
  }
}

function updateStyle (elem, newType = 'default') {
  let shadow = elem.shadowRoot;
  let btn = shadow.querySelector('button');
  btn.classList.remove('m-btn-primary');
  btn.classList.remove('m-btn-default');
  if (newType) {
    btn.classList.add(`m-btn-${newType}`);
  }
}

customElements.define('my-button-template', MyButtonTemplate);
