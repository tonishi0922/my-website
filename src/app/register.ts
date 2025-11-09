import "../styles/global-tokens.css"; // --*-light / --*-dark の定義（元色）
import "../styles/alias-tokens.css"; // 上の値を --bg / --text ... にマップ
import "../style.css";

import { AvatarCard } from "../components/common/AvatarCard";
import { UICard } from "../components/UI/UICard";
import { UIDivider } from "../components/UI/UIDivider";

const define = (name: string, ctor: CustomElementConstructor) => {
  customElements.get(name) || customElements.define(name, ctor);
};

define("avatar-card", AvatarCard);
define("ui-card", UICard);
define("ui-divider", UIDivider);
