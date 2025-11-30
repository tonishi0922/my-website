import css from "./ui-text.css?raw";
import { BaseElement } from "../../internal/BaseElement";

type Attrs = "size" | "weight";

export class UIText extends BaseElement<Attrs> {
  static override get observedAttributes() {
    return ["size", "weight"];
  }

  constructor() {
    super({
      css,
      template: `
        <p class="ui-text">
          <slot></slot>
        </p>
      `,
    });
  }

  connectedCallback(): void {
    this.root
      .querySelector("slot")!
      .addEventListener("slotchange", () => this.update());
  }

  protected override update(): void {
    const size = this.attr("size") ?? 2;
    const weight = this.attr("weight") ?? "normal";
    this.style.setProperty("--_font-size", `var(--fs-${size})`);
    this.style.setProperty("--_font-weight", `var(--fs-${weight}`);
  }
}
