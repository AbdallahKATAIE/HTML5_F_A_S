<template>
    <div id="game">
        <UsernameChooser v-if="this.$store.state.step == 0"></UsernameChooser>
        <ModeChooser v-if="this.$store.state.step == 1"></ModeChooser>
        <Board v-else-if="this.$store.state.step == 2" :username="this.$store.state.username" :mode="this.$store.state.mode"></Board>
    </div>
</template>

<script>
    import Board from "@components/Board.vue";
    import UsernameChooser from "@components/UsernameChooser.vue";
    import ModeChooser from "@components/ModeChooser.vue";
    import Vue from "vue";
    import Vuex from "vuex";

    Vue.use(Vuex);
    const store = new Vuex.Store({
        state: {
            step: 0,
            mode: 0,
            username: ""
        },
        mutations: {
            setStep(state, payload) {
                state.step = payload.step;
            },
            setMode(state, payload) {
                state.mode = payload.level;
            },
            setUsername(state, payload) {
                state.username = payload.username;
            }
        }
    });

    export default {
        name: "app",
        store,
        components: { Board, ModeChooser, UsernameChooser },
        data: function() {
            return {
                step: 0
            }
        }
    };
</script>

<style>
    @import url('https://fonts.googleapis.com/css?family=Nunito&display=swap');
    html, body {        
        margin: 0;
        padding: 0;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15) inset;
    }
    #app {
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: rgba(71, 111, 179, 70);
        color: white;
        box-shadow: 0px 0px 20px 0px rgb(51, 63, 57) inset;
    }
    .box-shadow {
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.25);
    }
    :focus {
        outline: 0;
    }
</style>
