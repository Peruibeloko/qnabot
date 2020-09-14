# Vox Populi

O nome desse projeto é "wobblemakers-voxpopuli" dentro dos packages.json fornecidos. Isso é porque eu tive a ideia inspirado pelo Vox Populi criado pelo CJ do [Coding Garden](https://coding.garden), plataforma que serve o mesmo propósito, porém usa integração com o Twitch.

---

# Como funciona?

## Backend - [node.js](https://nodejs.org/)

A integração com as APIs do Discord foram feitas usando chamadas diretas (puxar a lista completa de mensagens) e módulo de node.js chamado [discord.js](https://discord.js.org/#/) (sincronização em tempo real)

## Frontend - [Vue.js](https://vuejs.org/)

O frontend é uma SPA (Aplicação de Página Única) feita em Vue.js, a minha framework de JavaScript favorita. Vue.js é uma ótima escolha pra quem quer as vantagens de uma framework (Routing, Reatividade, Componentização, Templating, etc.) sem ter que passar por uma curva de aprendizagem muito íngrime.

## Comunicação - [WebSockets](https://developer.mozilla.org/pt-BR/docs/WebSockets)

A comunicação entre os sides é feita por meio de WebSockets, uma WebAPI que permite comunicação [Full Duplex](https://pt.wikipedia.org/wiki/Duplex) em tempo real.

A ideia principal é que após uma conexão WS estabelecida, o Node escuta eventos de envios de mensagem pelo discord.js, puxa a listagem completa de mensagens do canal no caso de uma nova mensagem ou reação, filtra propriedades irrelevantes, ordena a lista pela quantidade de votos, e envia a lista atualizada pelo WS para o Vue, que atualiza o DOM de forma reativa.

---

# Contribuição

Não é meu principal enfoque aceitar PRs no momento, e como isso é um projeto bem pequeno, aa Unlicense me serve bem. Então sinta-se a vontade para fazer um fork do projeto e modificar de acordo com a sua necessidade :D
