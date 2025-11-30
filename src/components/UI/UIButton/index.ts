import css from "./ui-button.css?raw";
import { BaseElement } from "../../internal/BaseElement";

type Attrs = "size" | "variant" | "onClick";

export class UIButton extends BaseElement<Attrs> {
  static override get observedAttributes() {
    return ["size", "variant", "onClick"];
  }

  constructor() {
    super({
      css,
      template: `
        <button class="ui-button">
          <slot></slot>
        </button>
      `,
    });
  }

  connectedCallback(): void {
    this.root
      .querySelector("slot")!
      .addEventListener("slotchange", () => this.update());
  }

  protected override update(): void {
    const uiButton = this.root.querySelector("button")!;
    uiButton.classList.remove(...uiButton.classList);
    uiButton.classList.add("ui-button");
    const size = this.attr("size") ?? "default";
    const variant = this.attr("variant") ?? "default";
    uiButton.classList.add(size, variant);
  }
}
