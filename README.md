# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

Sources:

Images:

Contact page:
PRODUCTION, M. (2023). A woman wearing a headset while working on a laptop. [Photograph]. Available at: https://www.pexels.com/photo/a-woman-wearing-a-headset-while-working-on-a-laptop-7709287/(Accessed: 22 November 2024).

Landing page:
Pezeta, L. (2019). Man raising his hands up. [Photograph]. Available at: https://www.pexels.com/photo/man-raising-his-hands-up-2418597/ (Accessed: 1 December 2024).

Wrn, T. (2023). Woman on wooden bridge in tropical resort. [Photograph]. Available at: https://www.pexels.com/photo/woman-on-wooden-bridge-in-tropical-resort-29564297/ (Accessed: 1 December 2024).

Claire, R. (2020). Unrecognizable traveler in hammock against bed in tropical resort. [Photograph]. Available at: https://www.pexels.com/photo/unrecognizable-traveler-in-hammock-against-bed-in-tropical-resort-4577681/ (Accessed: 1 December 2024).

Mendes, I. (2019). Wooden house. [Photograph]. Available at: https://www.pexels.com/photo/wooden-house-1795506/ (Accessed: 1 December 2024).
