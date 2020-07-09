<template>
    <nav class="navbar navbar-expand-lg navbar-light">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03"
                aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <a class="navbar-brand" href="#">NT2</a>

        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <li class="nav-item">
                    <router-link to="/gastos">
                        <a class="nav-link">
                            Gastos
                        </a>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/empleados">
                        <a class="nav-link">
                            Empleados
                        </a>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/viajes">
                        <a class="nav-link">
                            Viajes
                        </a>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/topes">
                        <a class="nav-link">
                            Topes
                        </a>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/formaspago">
                        <a class="nav-link">
                            Formas de Pago
                        </a>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/pais">
                        <a class="nav-link">
                            Pais
                        </a>
                    </router-link>
                </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
                <router-link to="/login">
                    <a class="nav-link">
                        Log out
                    </a>
                </router-link>
            </form>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "navbar"
    }
</script>

<style scoped lang="css">
    nav{
        background-color: grey;
    }
    .nav-link{
        color: black;
    }
    .nav-item .nav-link{
        color: whitesmoke
    }

</style>
