<template>
  <CircleLoader v-if="this.process" />
  <div class="login" ref="login">
    <h1>Пожалуйста, авторизуйтесь через Spotify.</h1>
    <button @click="login" class="btn">Войти</button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapGetters, mapActions } from "vuex";
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

  computed: {
    ...mapGetters({
      status: "app/getStatus",
    }),
  },

  methods: {
    ...mapActions({
      setStatus: "app/setStatus",
      setAccessToken: "auth/setAccessToken",
      setRefreshToken: "auth/setRefreshToken",
    }),

    popupEvent(event: MessageEvent) {
      const data = event.data;
      switch (data.status) {
        case "ok":
          /* --- */ console.log("[debug] Login (all ok)");
          window.removeEventListener("message", this.popupEvent);
          this.setAccessToken(localStorage.getItem("access_token"));
          this.setRefreshToken(localStorage.getItem("refresh_token"));
          this.setStatus("logged");
          this.$router.push({ name: "Home" });
          break;
        default:
          console.log("switch (data.status): default");
      }
    },

    async login() {
      // login process
      const title: HTMLHeadingElement =
        this.$refs.login.querySelector(".login h1");
      const btn: HTMLButtonElement =
        this.$refs.login.querySelector(".login button");

      title.style.transform = "translateX(-100vw)";
      btn.style.transform = "translateX(100vw)";

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
          window.addEventListener("message", this.popupEvent, false);
        }
      }
    },
  },

  created() {
    /* --- */ console.log("[debug] Login (created)");
    if (this.status === "logged" || this.status === "loaded")
      this.$router.push({ name: "Home" });
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
