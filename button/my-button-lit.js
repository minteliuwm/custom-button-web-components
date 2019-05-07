import { LitElement, html } from 'lit-element';

class MyButtonLit extends LitElement {
  // 设置properties，以及对attributes的映射关系
  static get properties() {
    return {
      type: { type: String, reflect: true },
    };
  }

  constructor() {
    super();
    // 初始化
    this._btnClass = '';
  }

  // attributes变化回调函数
  attributeChangedCallback(name, oldval, newval) {
    if (name === 'type') this._btnClass = `m-btn-${newval}`;
    this.dispatchEvent(new CustomEvent('attr-changed', {
      detail: 'test',
      bubbles: true
    }));
    super.attributeChangedCallback(name, oldval, newval);
  }

  // 构建html结构
  render() {
    return html`
      <style>
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
      </style>

      <button class="m-btn ${this._btnClass}">
        ${this.type === 'primary' ?
          html`<span>primary</span>`:
          html`<span>others</span>`}
        <slot></slot>
      </button>
    `;
  }
}

customElements.define('my-button-lit', MyButtonLit);
