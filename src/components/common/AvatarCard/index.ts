import css from "./avatar-card.css?raw";

export type AvatarCardProps = {
  name: string;
  title: string;
  src: string;
  links: { label: string; href: string }[];
};

export class AvatarCard extends HTMLElement {
  static get observedAttributes() {
    return ["name", "title", "src"] as const;
  }

  #root: ShadowRoot;
  #styleEl: HTMLStyleElement;

  constructor() {
    super();
    this.#root = this.attachShadow({ mode: "open" });
    this.#styleEl = document.createElement("style");
    const wrap = document.createElement("article");

    wrap.className = "avatar-card";
    wrap.innerHTML = `
      <img id="avatar" alt="">
      <div>
        <h1 id="name"></h1>
        <p id="title"></p>
        <div class="links" id="links"></div>
      </div>
      `;
    this.#root.replaceChildren(this.#styleEl, wrap);
    this.#updateFromAttrs();
    this.#loadCSS();
  }

  connectedCallback() {
    this.#updateFromAttrs();
  }

  #loadCSS() {
    this.#styleEl.textContent = css;
  }

  attributeChangedCallback() {
    this.#updateFromAttrs();
  }

  #updateFromAttrs() {
    const name = this.getAttribute("name") ?? "";
    const title = this.getAttribute("title") ?? "";
    const src = this.getAttribute("src") ?? "";

    this.#root.querySelector<HTMLHeadingElement>("#name")!.textContent = name;
    this.#root.querySelector<HTMLParagraphElement>("#title")!.textContent =
      title;
    const img = this.#root.querySelector<HTMLImageElement>("#avatar")!;
    img.src = src;
    img.alt = name ? `${name} avatar` : "avatar";
  }

  set links(list: { label: string; href: string }[]) {
    const box = this.#root.querySelector<HTMLDivElement>("#links")!;
    box.replaceChildren();
    (list ?? []).forEach(({ label, href }) => {
      const a = document.createElement("a");
      a.href = href;
      a.textContent = label;
      a.target = "_blank";
      a.rel = "noreferrer";
      box.appendChild(a);
    });
  }

  get links(): { label: string; href: string }[] {
    const anchors = Array.from(
      this.#root.querySelectorAll<HTMLAnchorElement>("#links a")
    );
    return anchors.map((a) => ({ label: a.textContent, href: a.href }));
  }
}
