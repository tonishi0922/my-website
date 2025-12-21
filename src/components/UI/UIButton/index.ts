import css from "./ui-button.css?raw";
import { BaseInternalElement } from "../../internal/BaseInternalElement";

type Attrs = "size" | "variant" | "justify" | "type" | "disabled";

type Size = "default" | "small" | "large";
type Variant = "primary" | "secondary" | "danger";
type ButtonType = "button" | "reset" | "submit";

export class UIButton extends BaseInternalElement<HTMLButtonElement, Attrs> {
  static override get observedAttributes() {
    return ["size", "variant", "justify", "type", "disabled"];
  }

  private buttonEl: HTMLButtonElement;
  private bound = false;

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

    this.buttonEl = this.root.querySelector<HTMLButtonElement>(".ui-button")!;
    this.control = this.buttonEl;
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (!this.bound) {
      this.root
        .querySelector("slot")!
        .addEventListener("slotchange", () => this.update());
      this.buttonEl.addEventListener("click", () => this.handleFormAction());
      this.bound = true;
    }
  }

  protected override update(): void {
    Array.from(this.buttonEl.classList)
      .filter((c) => c.startsWith("ui-button-"))
      .forEach((c) => this.buttonEl.classList.remove(c));

    const allowedSizes: Size[] = ["default", "large", "small"];
    const size = allowedSizes.includes(this.attr("size") as any)
      ? this.attr("size")
      : "default";
    const allowedVariants: Variant[] = ["primary", "secondary", "danger"];
    const variant = allowedVariants.includes(this.attr("variant") as any)
      ? this.attr("variant")
      : "primary";
    this.buttonEl.classList.add(`ui-button-${size}`, `ui-button-${variant}`);

    const allowedTypes: ButtonType[] = ["button", "reset", "submit"];
    this.buttonEl.type =
      this.attr("type") &&
      allowedTypes.includes(this.attr("type") as ButtonType)
        ? (this.attr("type") as ButtonType)
        : "button";

    const uiButtonWrapper = this.root.querySelector(".ui-button-wrapper")!;
    const justify = (this.attr("justify") ?? "").toLowerCase();
    if (justify) uiButtonWrapper.classList.add(`justify-${justify}`);

    this.buttonEl.disabled = this.hasAttribute("disabled");
  }

  private handleFormAction() {
    const form = this.internals.form;
    if (!form) return;
    if (this.buttonEl.type === "submit") {
      form.requestSubmit();
    } else if (this.buttonEl.type === "reset") {
      form.reset();
    }
  }
}
