import sv from "./i18n.sv.js";

const languages = { sv };

let lang = "sv";
export function setLanguage(value) {
  lang = value;
}

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
  const translations = languages[lang];

  if (translations[key]) return translations[key];

  console.warn(`Translation for key ${key} in language ${lang} not found`);
  return titleCase(key);
}

function titleCase(str) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
  //return str.split('_').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
}
