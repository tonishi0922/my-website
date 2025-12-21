import css from "./ui-input.css?raw";
import { BaseInternalElement } from "../../internal/BaseInternalElement";

type Attrs =
  | "label-text"
  | "label-for"
  | "value"
  | "id"
  | "type"
  | "placeholder"
  | "required"
  | "disabled";

export class UIInput extends BaseInternalElement<
  HTMLInputElement | HTMLTextAreaElement,
  Attrs
> {
  static override get observedAttributes() {
    return [
      "label-text",
      "label-for",
      "value",
      "placeholder",
      "id",
      "type",
      "required",
      "disabled",
    ];
  }

  private inputId = `ui-input-${crypto.randomUUID()}`;
  private labelEl: HTMLLabelElement;
  private inputEl: HTMLInputElement;
  private textareaEl: HTMLTextAreaElement;
  private bound = false;

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

    this.labelEl = this.root.querySelector<HTMLLabelElement>(".ui-input-label")!;
    this.inputEl = this.root.querySelector<HTMLInputElement>(".ui-input")!;
    this.textareaEl =
      this.root.querySelector<HTMLTextAreaElement>(".ui-textarea")!;
    this.control = this.inputEl;
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (!this.bound) {
      const onInput = () => this.syncFormState();
      this.inputEl.addEventListener("input", onInput);
      this.inputEl.addEventListener("change", onInput);
      this.textareaEl.addEventListener("input", onInput);
      this.textareaEl.addEventListener("change", onInput);
      this.bound = true;
    }
    this.syncFormState();
  }

  protected override update(): void {
    const type = (this.attr("type") ?? "text").toLowerCase();
    const isTextarea = type === "textarea";
    this.inputEl.hidden = isTextarea;
    this.textareaEl.hidden = !isTextarea;
    this.control = isTextarea ? this.textareaEl : this.inputEl;

    const controlId = this.attr("label-for") ?? this.attr("id") ?? this.inputId;
    this.labelEl.textContent = this.attr("label-text") ?? "";
    this.labelEl.htmlFor = controlId;
    this.updateRequiredTag();

    this.control.id = controlId;
    this.control.setAttribute("name", controlId);
    this.control.placeholder = this.attr("placeholder") ?? "";

    if (this.control instanceof HTMLInputElement) {
      this.control.type = isTextarea ? "text" : type || "text";
    }

    const valueAttr = this.attr("value");
    if (valueAttr !== null && this.control.value !== valueAttr) {
      this.control.value = valueAttr;
    }

    this.syncDisabled();
    this.syncFormState();
  }

  private syncFormState() {
    this.setValue(this.control?.value ?? "");
    this.syncRequired();
  }

  private updateRequiredTag() {
    this.labelEl.querySelector(".required")?.remove();
    if (this.hasAttribute("required")) {
      const tag = document.createElement("span");
      tag.textContent = "必須";
      tag.classList.add("required");
      this.labelEl.appendChild(tag);
    }
  }
}
