import css from "./ui-container.css?raw";
import { BaseElement } from "../../internal/BaseElement";

/**
 * @element ui-container
 *
 * @attr {boolean} full-height 要素を画面高さいっぱいに表示するか
 *
 * @slot - カード内の要素
 */

type Attrs = "full-height";

export class UIContainer extends BaseElement<Attrs> {
  static override get observedAttributes() {
    return ["full-height"];
  }
  constructor() {
    super({
      css,
      template: `
        <div class="ui-container"><slot></slot></div>
      `,
    });
  }

  protected override update(): void {
    const uIContainer = this.root.querySelector(".ui-container")!;
    console.log(uIContainer);
    uIContainer.classList.toggle(
      "full-height",
      this.hasAttribute("full-height")
    );
  }
}
