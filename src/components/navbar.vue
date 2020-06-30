<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light" v-if="$store.state.isLogin">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03"
                aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="#">Navbar</a>

        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <li class="nav-item active">
                    <a class="nav-link" href="#">
                        <router-link to="/gastos">Gastos</router-link>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">
                        <router-link to="/empleados">Empleados</router-link>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">
                        <router-link to="/viajes">Viajes</router-link>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">
                        <router-link to="/topes">Topes</router-link>
                    </a>
                </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
                <a class="nav-link" href="#">
                    <router-link to="/login">Log out</router-link>
                </a>
            </form>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "navbar"
    }
</script>

<style scoped>
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
