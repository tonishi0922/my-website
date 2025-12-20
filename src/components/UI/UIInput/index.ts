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
          <input class="ui-input"/>
          <textarea class="ui-textarea"></textarea>
        </div>
      `,
    });
    this.attachInternals();
  }

  protected override update(): void {
    const uiInputLabel =
      this.root.querySelector<HTMLLabelElement>(".ui-input-label")!;
    const uiInput = this.root.querySelector<HTMLInputElement>(".ui-input")!;
    const uiTextArea =
      this.root.querySelector<HTMLTextAreaElement>(".ui-textarea")!;

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
      uiInput.hidden = true;
      uiTextArea.hidden = false;
      uiTextArea.id = this.inputId;
      uiTextArea.name = this.inputId;
      uiTextArea.placeholder = this.attr("placeholder") ?? "";
      uiTextArea.value = this.attr("value") ?? "";
    } else {
      uiInput.hidden = false;
      uiTextArea.hidden = true;
      uiInput.id = this.inputId;
      uiInput.name = this.inputId;
      uiInput.type = this.attr("type") ?? "text";
      uiInput.placeholder = this.attr("placeholder") ?? "";
      uiInput.value = this.attr("value") ?? "";
    }
  }
}
