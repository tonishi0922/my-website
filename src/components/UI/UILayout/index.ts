import css from "./ui-layout.css?raw";
import { BaseElement } from "../../internal/BaseElement";

/**
 * @element ui-layout
 *
 * @slot - レイアウト内の要素
 */

export class UILayout extends BaseElement {
  constructor() {
    super({
      css,
      template: `<slot></slot>`,
    });
  }
}
