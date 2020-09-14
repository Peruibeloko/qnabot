<template>
  <div id="app">
    <div class="list">
      <pergunta :question="q" v-for="q in questions" :key="q.id"></pergunta>
    </div>
  </div>
</template>

<script>
import Pergunta from './components/Pergunta.vue';

export default {
  name: 'App',
  components: {
    Pergunta
  },
  data() {
    return {
      questions: []
    };
  },
  mounted() {
    const fa = document.createElement('script');
    const header = document.querySelector('head');
    fa.src = 'https://kit.fontawesome.com/4a25233ce5.js';
    fa.crossOrigin = 'anonymous';
    fa.defer = true;

    header.appendChild(fa);

    const socket = new WebSocket('ws://localhost:8585');

    socket.addEventListener('message', event => {
      console.log('Socket message incoming: ', event);

      if (event.data === 'ping') {
        console.log('Recieved server ping, sending response');
        socket.send('pong');
      } else {
        const discordData = JSON.parse(event.data);
        console.log('Recieved Discord data: ', discordData);
        this.questions = discordData;
      }
    });
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Open+Sans&display=swap');

body {
  margin: 0;
  padding: 0;
}

#app {
  background-color: hsl(214, 72%, 15%);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: minmax(min-content, max-content) 1fr minmax(min-content, max-content);
  min-height: 100vh;
}

.list {
  display: flex;
  flex-direction: column;
}
</style>
