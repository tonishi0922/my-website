import css from "./ui-divider.css?raw";
import { BaseElement } from "../../internal/BaseElement";

/**
 * @element ui-divider
 *
 * @attr {"default" | "strong"} variant ボーダーの太さ
 *
 * @slot - カード内の要素
 */

type Attrs = "variant" | "orientation" | "inset" | "label";

export class UIDivider extends BaseElement<Attrs> {
  static override get observedAttributes() {
    return ["variant", "orientation", "inset", "label"];
  }

  constructor() {
    super({
      css,
      template: `
        <div class="divider" part="line"></div>  
        <span class="label" part="label"></span>
      `,
    });
  }

  protected override update(): void {
    const label = this.attr("label") ?? "";
    const labelEl = this.root.querySelector<HTMLSpanElement>(".label")!;
    labelEl.textContent = label;

    // ラベルの有無に応じてクラスを切り変える
    this.toggleClass("has-label", !!label);
  }

  protected toggleClass(name: string, on: boolean): void {
    const wrap = Array.from(this.root.children).find(
      (n) => !(n instanceof HTMLStyleElement)
    ) as HTMLElement | undefined;
    if (wrap) wrap.classList.toggle(name, on);
  }
}
