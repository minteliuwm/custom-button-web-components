class MyButtonCreate extends HTMLElement {
  constructor() {
    super();

    // 构建html结构
    const shadow = this.attachShadow({ mode: 'open' });

    const style = document.createElement('style');
    style.textContent = `
      :host[hidden] {
        display: none;
      }
      :host {
        display: inline-block;
      }
      .m-btn {
        box-sizing: border-box;
        height: 32px;
        line-height: 32px;
        border-radius: 3px;
        min-width: 80px;
        padding: 0 22px;
        vertical-align: middle;
        font-size: 14px;
        cursor: pointer;
        outline: none;
      }
      .m-btn-default {
        background-color: #fff;
        border: 1px solid #d9dde3;
        color: #666;
      }
      .m-btn-default:hover {
        border-color: #3274e6;
        color: #3274e6;
      }
      .m-btn-primary {
        color: #fff;
        border: 1px solid #3274e6;
        background-color: #3274e6;
      }
      .m-btn-primary:hover {
        background-color: #2888fb;
        border: 1px solid #2888fb;
      }
    `;

    const button = document.createElement('button');
    const slot = document.createElement('slot');

    button.classList.add('m-btn');
    button.appendChild(slot);
    shadow.appendChild(style);
    shadow.appendChild(button);
  }

  // 映射properties与attributes
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
  const shadow = elem.shadowRoot;
  const btn = shadow.querySelector('button');
  btn.classList.remove('m-btn-primary');
  btn.classList.remove('m-btn-default');
  if (newType) {
    btn.classList.add(`m-btn-${newType}`);
  }
}

customElements.define('my-button-create', MyButtonCreate);
