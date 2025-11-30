import "../styles/global-tokens.css"; // --*-light / --*-dark の定義（元色）
import "../styles/alias-tokens.css"; // 上の値を --bg / --text ... にマップ
import "../style.css";

import { AvatarCard } from "../components/common/AvatarCard";
import { UICard } from "../components/UI/UICard";
import { UIDivider } from "../components/UI/UIDivider";
import { UIStack } from "../components/UI/UIStack";
import { UILayout } from "../components/UI/UILayout";
import { UIContainer } from "../components/UI/UIContainer";
import { UITitle } from "../components/UI/UITitle";
import { UIImage } from "../components/UI/UIImage";
import { UIText } from "../components/UI/UIText";

const define = (name: string, ctor: CustomElementConstructor) => {
  customElements.get(name) || customElements.define(name, ctor);
};

define("avatar-card", AvatarCard);
define("ui-card", UICard);
define("ui-divider", UIDivider);
define("ui-stack", UIStack);
define("ui-layout", UILayout);
define("ui-container", UIContainer);
define("ui-title", UITitle);
define("ui-image", UIImage);
define("ui-text", UIText);
