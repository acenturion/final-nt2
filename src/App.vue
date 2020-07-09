<template>
    <div id="app">
        <navbar/>
        <router-view/>
    </div>
</template>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: left;
        color: #2c3e50;
        background-color: #e1e2e1;
        height: 100vh;

    }

</style>
<script>
    import Navbar from "./components/navbar";

    export default {
        components: {Navbar}
    }
</script>
