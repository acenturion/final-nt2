<template>
        <div v-if="isLoading" class="spinner-border text-primary loader" role="status">
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
        left: 50%;
        top:30%;
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
