import css from "./ui-button.css?raw";
import { BaseElement } from "../../internal/BaseElement";

type Attrs = "size" | "variant" | "justify";

type Size = "default" | "small" | "large";
type Variant = "primary" | "secondary" | "danger";

export class UIButton extends BaseElement<Attrs> {
  static override get observedAttributes() {
    return ["size", "variant", "justify"];
  }

  constructor() {
    super({
      css,
      template: `
        <div class="ui-button-wrapper">
          <button class="ui-button">
            <slot></slot>
          </button>
        </div>
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
    Array.from(uiButton.classList)
      .filter((c) => c.startsWith("ui-button-"))
      .forEach((c) => uiButton.classList.remove(c));

    const allowedSizes: Size[] = ["default", "large", "small"];
    const size = allowedSizes.includes(this.attr("size") as any)
      ? this.attr("size")
      : "default";
    const allowedVariants: Variant[] = ["primary", "secondary", "danger"];
    const variant = allowedVariants.includes(this.attr("variant") as any)
      ? this.attr("variant")
      : "primary";
    uiButton.classList.add(`ui-button-${size}`, `ui-button-${variant}`);

    const uiButtonWrapper = this.root.querySelector(".ui-button-wrapper")!;
    const justify = (this.attr("justify") ?? "").toLowerCase();
    if (justify) uiButtonWrapper.classList.add(`justify-${justify}`);
  }
}
