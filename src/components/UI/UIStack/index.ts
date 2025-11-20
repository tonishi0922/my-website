import css from "./ui-stack.css?raw";
import { BaseElement } from "../../internal/BaseElement";

/**
 * @element ui-stack
 *
 * @attr {"vertical" | "horizontal"} orientation stack内の子要素を垂直方向に並べるか水平方向に並べるか
 *
 * @attr {number} stack内の子要素間のgap
 *
 * @attr {"start" | "center" | "end"} align satck内の要素の上下配置
 *
 * @attr {"start" | "center" | "end" | "between" | "around" | "evenly"} justify satck内の横の配置
 *
 * @slot - カード内の要素
 */

type Attrs = "orientation" | "gap" | "align" | "justify";

export class UIStack extends BaseElement<Attrs> {
  static override get observedAttributes() {
    return ["orientation", "gap", "align", "justify"];
  }

  constructor() {
    super({
      css,
      template: `
        <div class="ui-stack"><slot></slot></div>
      `,
    });
  }

  protected override update(): void {
    const uIStack = this.root.querySelector<HTMLDivElement>(".ui-stack")!;
    uIStack.className = "ui-stack";

    const o = (this.attr("orientation") ?? "horizontal").toLowerCase();
    uIStack.classList.add(o === "horizontal" ? "horizontal" : "vertical");

    const gap = this.attr("gap");
    if (gap) uIStack.style.setProperty("--gap", gap);
    else uIStack.style.removeProperty("--gap");

    const align = (this.attr("align") ?? "").toLowerCase();
    if (align) uIStack.classList.add(`align-${align}`);

    const justify = (this.attr("justify") ?? "").toLowerCase();
    if (justify) uIStack.classList.add(`justify-${justify}`);
  }
}
