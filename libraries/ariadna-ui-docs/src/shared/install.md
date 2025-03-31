Для установки необходимо создать файл `.npmrc` и в нем прописать способ авторизации к npm-хранилищу по токену:

```bash
@iwyfaf-vue-ui:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=ваш_токен
```

Далее установить пакет:

```bash
npm install @iwyfaf-vue-ui/ariadna-ui@latest
```