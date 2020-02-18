<template>
    <div id="usernameChooser">
        <input class="box-shadow" type="text" placeholder="Pseudonyme" v-model="input">
        <button class="box-shadow" @click="usernameSelected">Start !</button>
        <Alert v-if="incorrectUsername" :type="'error'" @onCloseModal="onCloseModal">Le pseudonyme doit comporter au minimum 3 caractères</Alert>
    </div>
</template>

<script>
    import Alert from "@components/Alert.vue";
    export default {
        components: { Alert },
        name: "UsernameChooser",
        data: function() {
            return {
                input: this.$store.state.username,
                incorrectUsername: false,
            }
        }, methods: {
            usernameSelected() {
                if(this.input.length<3) {
                    this.incorrectUsername=true;
                    return;
                }
                this.$store.commit("setUsername", {username: this.input});
                this.$store.commit("setStep", {step: 1});
            },
            onCloseModal() {
                this.incorrectUsername=false;
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    
    #usernameChooser {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        input {
            width: 70vw;
            padding: 10px 20px;
            border: none;
            height: 50px;
            font-size: 30px;
            font-family: 'Nunito', sans-serif;
            text-transform: uppercase;
            transition: all 0.15s ease-in-out;
            color: rgba(71, 111, 179, 70);
            text-align: center;
            margin-bottom: 25px;
            &::placeholder {
                font-family: 'Nunito', sans-serif;
                color: rgb(155, 192, 255);
                transition: all 0.15s ease-in-out;
            }
            &:hover {
                &::placeholder {
                    color: rgb(128, 174, 255);
                }
            }
            &:focus {
                // padding-left: 30px;
                border-bottom: 5px solid rgb(155, 192, 255);
            }
        }
        button {
            width: calc(70vw + 40px);
            background: transparent;
            border: none;
            background: rgb(155, 192, 255);
            padding: 10px 20px;
            color: white;
            font-size: 30px;
            font-family: 'Nunito', sans-serif;
            text-transform: capitalize;
            transition: all 0.15s ease-in-out;
            cursor: pointer;
            &:hover {
                background: rgb(128, 174, 255);
            }
        }
    }
</style>
