<template>
  <article class="wrapper">
    <header>
      <div class="check-container">
        <label :for="`toggle-${question.id}`">{{ answeredProp ? '✔' : '' }}</label>
        <input
          type="checkbox"
          :id="`toggle-${question.id}`"
          class="toggle"
          @click="toggleAnswered"
        />
      </div>
      <div class="username">
        {{ question.username }}
      </div>
      <div class="spacer"></div>
      <span class="votes">{{ question.votes || 0 }} voto{{ question.votes === 1 ? '' : 's' }}</span>
    </header>
    <div class="pergunta">
      {{ question.content }}
    </div>
  </article>
</template>

<script>
export default {
  name: 'Pergunta',
  props: {
    question: Object,
    answeredProp: Boolean
  },
  methods: {
    toggleAnswered() {
      this.$emit('toggleAnswer', this.question.id, this.answeredProp);
    }
  }
};
</script>

<style scoped>
.wrapper {
  width: 50%;
  margin: 1rem;
  padding: 1.5rem;
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: 1rem;
  box-shadow: 0 0.25rem 1rem 0 rgba(0, 0, 0, 0.5);
}

.wrapper div {
  color: white;
}

.wrapper.answered {
  opacity: 50%;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  vertical-align: middle;
}

label {
  width: 2rem;
  height: 2rem;
  margin-right: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 0.25rem solid white;
  border-radius: 3px;
  color: white;
  text-align: center;
}

.toggle {
  display: none;
}

.username {
  font-size: 3rem;
  font-family: 'Bebas Neue', sans-serif;
  border-left: 0.5rem solid rgb(192, 32, 32);
  padding-left: 1rem;
  margin-left: 1rem;
  display: flex;
}

.spacer {
  flex-grow: 1;
}

.votes {
  color: white;
  font-size: 2rem;
  font-family: 'Open Sans', sans-serif;
}

.pergunta {
  overflow-wrap: break-word;
  white-space: pre-line;
  padding: 1rem;
  font-size: 1.5rem;
  font-family: 'Open Sans', sans-serif;
}
</style>
