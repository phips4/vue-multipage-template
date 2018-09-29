<template>
    <div>
        <header />
        {{ msg }}
        <footer />
    </div>
</template>

<script>
    import Header from "components/header";
    import Footer from "components/footer";
    export default {
        name: "index",
        components: {Footer, Header},
        data() {
            return {
                msg: 'Hello world!'
            }
        }
    }
</script>

<style scoped>

</style>