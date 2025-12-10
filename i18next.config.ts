import { defineConfig } from 'i18next-cli';

export default defineConfig({
  "locales": [
    "en",
    "es",
    "pt",
    "de",
    "fr",
    "it",
    "ko",
    "zh-CN",
    "ja"
  ],
  "extract": {
    "input": [
      "app/**/*.{ts,tsx}"
    ],
    "output": "locales/{{language}}.json",
    "defaultNS": "translation",
    "keySeparator": ".",
    "nsSeparator": ":",
    "contextSeparator": "_",
    "functions": [
      "t",
      "*.t"
    ],
    "transComponents": [
      "Trans"
    ]
  },
  "types": {
    "input": [
      "locales/{{language}}/{{namespace}}.json"
    ],
    "output": "src/types/i18next.d.ts"
  }
});