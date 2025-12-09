import css from "./ui-input.css?raw";
import { BaseElement } from "../../internal/BaseElement";

type Attrs =
  | "label-text"
  | "label-for"
  | "value"
  | "id"
  | "type"
  | "placeholder"
  | "required";

export class UIInput extends BaseElement<Attrs> {
  static override get observedAttributes() {
    return [
      "label-text",
      "label-for",
      "value",
      "placeholder",
      "id",
      "type",
      "required",
    ];
  }

  private inputId = `ui-input-${crypto.randomUUID()}`;

  constructor() {
    super({
      css,
      template: `
        <div class="ui-input-wrapper">
          <label class="ui-input-label"></label>
          <slot name="input"></slot>
          <input class="ui-input"/>
        </div>
      `,
    });
  }

  protected override update(): void {
    const uiInputLabel =
      this.root.querySelector<HTMLLabelElement>(".ui-input-label")!;
    const uiInput = this.root.querySelector<HTMLInputElement>(".ui-input")!;

    // --- Label ---
    const labelText = this.attr("label-text");
    uiInputLabel.textContent = labelText;
    uiInputLabel.htmlFor = this.inputId;

    uiInputLabel.querySelector(".required")?.remove();
    if (this.hasAttribute("required")) {
      const tag = document.createElement("span");
      tag.textContent = "必須";
      tag.classList.add("required");
      uiInputLabel.appendChild(tag);
    }

    const type = this.attr("type") ?? "text";
    if (type === "textarea") {
      const textarea = document.createElement("textarea");
      textarea.id = this.inputId;
      textarea.name = this.inputId;
      textarea.placeholder = this.attr("placeholder") ?? "";
      textarea.value = this.attr("value") ?? "";
      uiInput.replaceWith(textarea);
    } else {
      uiInput.id = this.inputId;
      uiInput.name = this.inputId;
      uiInput.type = this.attr("type") ?? "text";
      uiInput.placeholder = this.attr("placeholder") ?? "";
      uiInput.value = this.attr("value") ?? "";
    }
  }
}
