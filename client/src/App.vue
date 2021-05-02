<template>
  <div id="app">
    <div class="list">
      <pergunta
        v-for="u in unanswered"
        :key="u.id"
        :question="u"
        :answeredProp="u.answered"
        @toggleAnswer="swapList"
      ></pergunta>
    </div>
    <div class="separator">
      <h2>Respondidas</h2>
      <div class="hbar"></div>
    </div>
    <div class="list">
      <pergunta
        class="answered"
        v-for="a in answered"
        :key="a.id"
        :question="a"
        :answeredProp="a.answered"
        @toggleAnswer="swapList"
      ></pergunta>
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
      unanswered: [],
      answered: []
    };
  },
  methods: {
    swapList(id, answered) {
      if (answered) {
        const i = this.answered.findIndex(el => el.id === id);
        const question = this.answered.splice(i, 1)[0];
        question.answered = !question.answered;
        this.unanswered.push(question);
      } else {
        const i = this.unanswered.findIndex(el => el.id === id);
        const question = this.unanswered.splice(i, 1)[0];
        question.answered = !question.answered;
        this.answered.push(question);
      }
    }
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
      if (event.data === 'ping') {
        console.log('Recieved server ping, sending response');
        socket.send('pong');
      } else {
        const discordData = JSON.parse(event.data);
        this.unanswered = discordData.map(el => ({ ...el, answered: false }));
      }
    });
  }
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Open+Sans&display=swap');

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}

#app {
  background-color: hsl(0, 0%, 20%);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: minmax(min-content, max-content) 1fr minmax(min-content, max-content);
  min-height: 100vh;
}

.list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.separator {
  width: 60%;
  display: flex;
  margin: auto;
  align-items: center;
}

.separator h2 {
  color: white;
  font-size: 2.5rem;
  font-family: 'Bebas Neue', sans-serif;
}

.separator .hbar {
  flex-grow: 1;
  margin-left: 1rem;
  border-radius: 1rem;

  background-color: rgb(192, 32, 32);
  height: 1rem;
  width: 100%;
}
</style>
