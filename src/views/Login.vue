<template>
  <div class="login">
    <h1>Пожалуйста, авторизуйтесь через Spotify.</h1>
    <button @click="login" class="btn">Войти</button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  data() {
    return {};
  },
  components: {},
  methods: {
    login() {
      // login process
    },
  },
  mounted() {
    // check token
  },
})
export default class Home extends Vue {}
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
