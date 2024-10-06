import sv from "./i18n.sv.js";
import en from "./i18n.en.js";

const languages = { sv, en };

let lang = "sv";
export function setLanguage(value) {
  lang = value;
  document.documentElement.lang = value;
  injectI18nContent(menu_dialog);
}

game_wrapper.addEventListener("pointerup", (event) => {
  const target = event.target;
  if (!target) return;
  if (!target.tagName === "BUTTON") return;
  const key = target.dataset.i18nContent;
  if (!key) return;

  const utterThis = new SpeechSynthesisUtterance(target.textContent);
  utterThis.lang = languages[lang].speech;
  speechSynthesis.speak(utterThis);
});

export function injectI18nContent(root) {
  function travel(element) {
    const key = element.dataset.i18nContent;
    if (key) element.textContent = translate(key);

    if (!element.children) return;
    for (const child of element.children) travel(child);
  }

  for (const child of root.children) travel(child);
}

export function translate(key) {
  if (!languages[lang]) throw new Error(`Language ${lang} not found`);
  const { translations } = languages[lang];

  if (translations[key]) return translations[key];

  console.warn(`Translation for key ${key} in language ${lang} not found`);
  return titleCase(key);
}

function titleCase(str) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
  //return str.split('_').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
}
