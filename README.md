<h1 align="center">Desafio TechChallenge BootCamp BackEnd Carrefour</h1>

<div align="center">Solução para otimizar a comunicação entre clientes e o Carrefour.</div>

<div>Integração da API do Telegram, DialogFlow, MongoDB (mongoose) e dotenv.</div>

### Dependências
- API do Telegram = npm i node-telegram-bot-api
- API do DialogFlow = npm install dialogflow
- API do dotenv = npm install dotenv
- API do Mongoose = npm install mongoose

### Utilização
Para o código funcionar será necessário fornecer o token de acesso a API do Telegram e DialogFlow.
Para isso será necessário fazer efetuar as configurações em cada API.

- API do Telegram = envie uma mensagem para BotFather com o comando /newbot e siga as instruções. Ao final será informar o token para utilização da API.

- API do DialogFlow = acesse o site dialogflow.cloud.google.com e faça o login ou cadastro para criar o token.

**Observações:** 
   - As informações de tokens e credenciais foram armazenadas em arquivo .env da API dotenv e na falta das mesmas o código não irá funcionar.
   - No código está incluso a tag TODO indicando o local onde deve-se inserir as informações de tokes e credenciais das API's utilizadas.
   - O arquivo mongoose.js possuí uma função para iniciar os dados dos pedidos para utilização da consulta de status e rastreio do pedido.
   - Os pedidos para testar estão cadastrados com os números: 111, 222, 333, 444, 555, 666 e 777.
