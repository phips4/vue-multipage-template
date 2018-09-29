<template>
    <div>
        <header />
        <h3>This is the About page.</h3>
        <footer />
    </div>
</template>

<script>
    import Header from "components/header";
    import Footer from "components/footer";
    export default {
        name: "about",
        components: {Footer, Header}
    }
</script>

<style scoped>
    h3 {
        color: aquamarine;
    }
</style>