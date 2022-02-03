<template>
  <div class="not-found">
    <h1>404</h1>
    <h2>Страница не найдена</h2>
    <button @click="goHome" class="btn">На главную</button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  methods: {
    goHome() {
      this.$router.push({ name: "Home" });
    },
  },
})
export default class NotFound extends Vue {}
</script>

<style scoped lang="scss">
.not-found {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--color-text);
  text-align: center;

  h1 {
    font-size: 80pt;
    font-weight: bold;
  }

  h2 {
    font-size: 40pt;
    font-weight: bold;
  }

  a {
    margin-top: 30px;
  }
}

@media screen and (max-width: 600px) {
  .not-found {
    h1 {
      font-size: 60pt;
    }

    h2 {
      font-size: 26pt;
    }

    a {
      width: 90%;
    }
  }
}
</style>
