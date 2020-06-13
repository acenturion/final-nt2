<template>
  <div id="app">
    <div id="nav" v-if="$store.state.isLogin">
      <router-link to="/tareas">Tareas</router-link> |
      <router-link to="/respuestas">Respuestas</router-link> |
      <router-link to="/login">Log out</router-link>
    </div>

    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
