export default ({ playgroundName }: { playgroundName: string }): string => {
  return `{
  "name": "${playgroundName}",
  "description": "Just another playground",
  "version": "0.0.0",
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
    "registry": ""
  },
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc --noEmit && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "@iwyfaf-vue-cmp/lib-name": "file:../../libraries/lib-name"
  },
  "devDependencies": {
    "@types/node": "^17.0.24",
    "@vitejs/plugin-vue": "^2.0.0",
    "prettier": "^2.5.1",
    "sass": "^1.49.7",
    "stylelint": "^14.9.1",
    "stylelint-config-css-modules": "^4.1.0",
    "stylelint-config-recess-order": "^3.0.0",
    "stylelint-config-recommended-scss": "^7.0.0",
    "stylelint-config-recommended-vue": "^1.4.0",
    "stylelint-config-standard-scss": "^5.0.0",
    "typescript": "^4.4.4",
    "vite": "^2.7.2",
    "vue": "^3.2.29",
    "vue-tsc": "^0.29.8"
  }
}`;
};
