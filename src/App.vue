<template>
  <div id="app">
    <div class="nav-panel">
      <b-nav v-if="getUser == null">
        <b-nav-item @click="$router.push('/login')" :active="$route.path == '/login'">Авторизация</b-nav-item>
        <b-nav-item @click="$router.push('/signup')" :active="$route.path == '/signup'">Регистрация</b-nav-item>
      </b-nav>
      <b-nav v-else>
        <b-nav-item @click="$router.push('/dashboard')" :active="$route.path == '/login'">Дашборд</b-nav-item>
        <b-nav-item @click="$router.push('/tickets')" :active="$route.path == '/tickets'">Поддержка</b-nav-item>
        <b-nav-item-dropdown
          id="my-nav-dropdown"
          text="Аккаунт"
          toggle-class="nav-link-custom"
          right
        >
          <b-dropdown-item @click="$router.push('/settings')">Настройки</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item>
            <b-button variant="danger" @click="exit">Выход</b-button>
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-nav>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  computed: {
    ...mapGetters([
      'getUser'
    ])
  },
  methods: {
    exit() {
      this.$store.dispatch('exit');
      this.$router.push('/login');
    }
  },
  created() {
    let user = localStorage.getItem('user');
    if (user != null) {
      user = JSON.parse(user);
      this.$store.dispatch('login', {user});
    }
  }
}
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: 0px;
    padding: 0px;
  }

  .nav-panel {
    padding: 20px 15px;
  }
</style>
