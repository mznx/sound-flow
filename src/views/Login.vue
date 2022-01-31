<template>
  <CircleLoader v-if="this.process" />
  <div class="login">
    <h1>Пожалуйста, авторизуйтесь через Spotify.</h1>
    <button @click="login" class="btn">Войти</button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import CircleLoader from "@/components/CircleLoader/index.vue";
import api from "@/api";
import * as API from "@/types/API";

@Options({
  data() {
    return {
      process: false,
    };
  },

  components: {
    CircleLoader,
  },

  methods: {
    async login() {
      // login process
      const title: HTMLHeadingElement | null =
        document.querySelector(".login h1");
      const btn: HTMLButtonElement | null =
        document.querySelector(".login button");

      if (title && btn) {
        title.style.transform = "translateX(-100vw)";
        btn.style.transform = "translateX(100vw)";
      }

      this.process = true;
      const res: API.UserAuthURL = await api.backend.auth.getUserAuthURL();

      if (res.state) {
        localStorage.setItem(res.state_key, res.state);
        let popup = window.open(
          res.link,
          "Login with Spotify",
          "width=800,height=600"
        );
        if (popup) {
          window.addEventListener(
            "message",
            (event) => {
              const data = event.data;
              switch (data.status) {
                case "ok":
                  this.$router.push({ name: "Home" });
                  break;
                default:
                  console.log("switch (data.status): default");
              }
            },
            false
          );
        }
      }
    },

    async checkToken(): Promise<boolean> {
      const token: string | null = localStorage.getItem("access_token");
      if (token) {
        const res: API.CheckToken = await api.backend.auth.checkToken(token);
        if (res && res.status === "ok") return true;
      }

      return false;
    },
  },

  async mounted() {
    // check token
    const token_valid = await this.checkToken();
    if (token_valid) this.$router.push({ name: "Home" });
  },
})
export default class Home extends Vue {}
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  h1 {
    margin-bottom: 20px;
    padding: 0 10px;
    font-size: 30pt;
    font-weight: bold;
    color: var(--color-text);
    transition: all 0.5s ease;
  }

  button {
    margin-top: 20px;

    &:active {
      transform: scale(0.95);
    }
  }
}

@media screen and (max-width: 600px) {
  .login {
    h1 {
      font-size: 22pt;
    }
    button {
      width: 90%;
    }
  }
}
</style>
