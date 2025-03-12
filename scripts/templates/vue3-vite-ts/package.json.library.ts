export default ({
  packageName,
  packagePrefix,
  packageDescription,
}: {
  packageName: string;
  packagePrefix: string;
  packageDescription: string;
}): string => {
  return `{
  "name": "${packagePrefix}${packageName}",
  "description": "${packageDescription}",
  "version": "0.0.0",
  "type": "module",
  "exports": {
    ".": "./dist"
  },
  "browser": {
    "./styles.css": "./dist/style.css"
  },
  "types": "dist/lib.d.js",
  "main": "dist/lib.js",
  "files": [
    "dist"
  ],
  "keywords": [
    "",
    "",
    ""
  ],
  "license": "ISC",
  "author": {
    "name": "iWatchYouFromAfar",
    "email": "tommy.riley@yandex.ru"
  },
  "repository": {
    "type": "git",
    "url": ""
  },
  "publishConfig": {
    "registry": "https://npm.pkg.github.com/"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build --out-dir dist",
    "preview": "vite preview",
    "pushnpm": "./publish.sh"
  },
  "dependencies": {
    "vue": "^3.2.25"
  },
  "devDependencies": {
    "@types/node": "^17.0.24",
    "@vitejs/plugin-vue": "^2.0.0",
    "prettier": "^2.5.1",
    "rollup": "^2.66.1",
    "rollup-plugin-clear": "^2.0.7",
    "rollup-plugin-typescript2": "^0.31.1",
    "sass": "^1.49.7",
    "stylelint": "^14.9.1",
    "stylelint-config-css-modules": "^4.1.0",
    "stylelint-config-recess-order": "^3.0.0",
    "stylelint-config-recommended-scss": "^7.0.0",
    "stylelint-config-recommended-vue": "^1.4.0",
    "stylelint-config-standard-scss": "^4.0.0",
    "typescript": "^4.4.4",
    "vite": "^2.7.2",
    "vite-plugin-dts": "^2.1.0",
    "vue": "^3.2.29",
    "vue-tsc": "^0.29.8"
  }
}`;
};
