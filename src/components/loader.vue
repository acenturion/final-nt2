<template>
        <div v-if="isLoading" class="spinner-border text-dark loader" role="status">
            <span class="sr-only">Loading...</span>
        </div>
</template>

<script>
    export default {
        name: "Loader",
        props:{
            isLoading: Boolean
        }
    }
</script>

<style scoped>
    .loader{
        position: absolute;
        left: 45%;
        top:270px;
        text-align: center;
        width: 60px ;
        height: 60px;
    }
    @media only screen and (max-width: 768px) {
        .loader{
            display: none;
        }
    }
</style>
