import css from "./ui-card.css?raw";

export class UICard extends HTMLElement {
  #root: ShadowRoot;
  #styleEl: HTMLStyleElement;
  constructor() {
    super();
    this.#root = this.attachShadow({ mode: "open" });
    this.#styleEl = document.createElement("style");

    const wrap = document.createElement("div");
    wrap.className = "ui-card";
    wrap.innerHTML = `<slot></slot>`;
    this.#root.replaceChildren(this.#styleEl, wrap);
    this.#loadCSS();
  }

  #loadCSS() {
    this.#styleEl.textContent = css;
  }
}
