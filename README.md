#INSTALAR NODE

# CONFIGURAR PRIMEIRO START VSC

npm install -g yarn
Set-ExecutionPolicy -ExecutionPolicy Unrestricted

# iniciar com valores padrao

yarn init -y

# baixa ts e coloca somente no projeto

yarn add typescript -D

# configuracoes disponiveis do ts

yarn tsc --init

# mostrar auto complete

yarn add @types/express -D

# SO COPIAR QUANDO INICIAR UM NOVO PROJETO

yarn init -y
yarn add typescript -D
yarn add express
yarn add @types/express -D
yarn add @types/node -D
yarn add ts-node-dev -D
yarn tsc --init
mkdir src
mkdir out
cls

# Instala as dependencias do projeto

yarn install

# Transformar arquivo TS em JS

npx tsc

# Executar

node /out/main.js

# NO TSCONFIG.json

"target": "es5", -> versao do ts que iremos usar
"outDir": "./src/", -> joga o tsc para pasta desejada
"rootDir": "./out/", -> pega o arquivo para o tsc da pasta setada

# NO PACKAGE.json - Copiar e Colar

depois disso }
colar isso

,
"scripts": {
"dev": "ts-node-dev --respawn --transpile-only ./root/index.ts"
}

# BIBLIOTECA PARA PROMISSES PRONTAS

yarn add axios

# ERRO DE COMUNICACAO POR PORTAS DIFERENTES (Cors policy)

# INSTALAR CORS

yarn add cors

# USAR CORS NO PROJETO

app.use(cors())

# PARA USAR NO HEROKU

yarn add dotenv

const port = process.env.PORT || 8080;
e alterar
app.listen(port, () => {

# CONFIG PARA HEROKU NO PACKAGE.JSON

,
"scripts": {
"dev": "ts-node-dev --respawn --transpile-only ./root/index.ts",
"start": "node -r dotenv/config ./out/index",
"build": "npx tsc"
}

# RODAR FRONT NO HEROKU

# Adicionar como enviroment para paginas html rodarem

https://github.com/heroku/heroku-buildpack-static.git

# E CRIAR ARQUIVO STATIC.JSON COM ..

{
"root": "./front"
}

# OU SE DER PROBLEMA

import dotenv from 'dotenv';
dotenv.config();

# PREPARANDO TYPEORM

yarn add typeorm
yarn add reflect-metadata
yarn add @types/node -D
yarn add pg
npm install typeorm -g

# INICIANDO PROJETO CM TYPEORM

typeorm init --name MyScrap --database mysql
cd MyScrap
npm install
npm start

# INSTALAR BANCO DE DADOS POSTGRES

yarn add pg

# USADO NO HEROKU

yarn add dotenv
yarn add cors

# MIGRATIONS

# PARA ADICIONAR UMA MIGRATION

yarn typeorm migration:create -n CreateTableCategories
yarn typeorm entity:create -n user

# CONFIGURAR NO PACKAGE

,
"migration:run": "ts-node-dev --transpile-only ./node_modules/typeorm/cli.js migration:run",
"migration:revert": "ts-node-dev --transpile-only ./node_modules/typeorm/cli.js migration:revert"

# INSTALAR DEVELOPER TOOLS

yarn add @types/cors
yarn add @types/express
yarn add @types/node
yarn add @types/uuid
yarn add ts-node-dev
