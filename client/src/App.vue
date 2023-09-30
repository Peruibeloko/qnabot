<script setup lang="ts">
import { onMounted, ref } from "vue";
import QuestionCard, {
  Question,
  QuestionContent,
} from "./components/QuestionCard.vue";

const pending = ref<Question[]>([]);
const done = ref<Question[]>([]);

const toggleStatus = (id: string, isAnswered: boolean) => {
  const src = isAnswered ? done : pending;
  const dest = isAnswered ? pending : done;

  const i = src.value.findIndex((el) => el.id === id);
  const question = src.value.splice(i, 1)[0];
  question.answered = !question.answered;
  dest.value.push(question);
};

onMounted(() => {
  const fa = document.createElement("script");
  const header = document.querySelector("head");

  fa.src = "https://kit.fontawesome.com/4a25233ce5.js";
  fa.crossOrigin = "anonymous";
  fa.defer = true;

  if (!header) return;

  header.appendChild(fa);

  const socket = new WebSocket("ws://localhost:8585");

  socket.addEventListener("message", (event) => {
    if (event.data === "ping") {
      console.log("Recieved server ping, sending response");
      socket.send("pong");
      return;
    }
    const discordData: QuestionContent[] = JSON.parse(event.data);
    pending.value = discordData.map((el) => ({
      ...el,
      answered: false,
    }));
  });
});
</script>

<template>
  <div id="app">
    <div class="list">
      <QuestionCard
        v-for="u in pending"
        :key="u.id"
        :question="u"
        :answered="u.answered"
        @done="toggleStatus"
      ></QuestionCard>
    </div>
    <div class="separator">
      <h2>Respondidas</h2>
      <div class="hbar"></div>
    </div>
    <div class="list">
      <QuestionCard
        class="answered"
        v-for="a in done"
        :key="a.id"
        :question="a"
        :answered="a.answered"
        @done="toggleStatus"
      ></QuestionCard>
    </div>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Open+Sans&display=swap");

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
  grid-template-rows: minmax(min-content, max-content) 1fr minmax(
      min-content,
      max-content
    );
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
  font-family: "Bebas Neue", sans-serif;
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
