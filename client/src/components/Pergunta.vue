<template>
  <article class="wrapper">
    <header>
      <div class="username">
        {{ question.username }}
      </div>
      <span class="votes">{{ question.votes }}</span>
    </header>
    <div class="pergunta">
      {{ question.content }}
    </div>
  </article>
</template>

<script>
export default {
  name: 'Pergunta',
  props: ['question']
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.wrapper {
  margin: 1rem;
  padding: 1.5rem;
  background-color: rgba(0, 0, 0, 0.26);
  border-radius: 1rem;
}

.votes {
  color: white;
  font-size: 2rem;
  font-family: 'Open Sans', sans-serif;
}

.wrapper div {
  color: white;
}

.username {
  font-size: 3rem;
  font-family: 'Bebas Neue', cursive;
}

.pergunta {
  white-space: pre-wrap;
  padding: 1rem;
  font-size: 1.5rem;
  font-family: 'Open Sans', sans-serif;
}
</style>
