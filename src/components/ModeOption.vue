<template>
  <div class="mode-option box-shadow" @click="modeSelected">
      <span class="title">{{ mode.name }}</span>
  </div>
</template>

<script>
    export default {
        name: "ModeOption",
        props: {
            mode: Object
        },
        data: function() {
            return {
            }
        }, methods : {
            modeSelected: function(level) {
                this.$store.commit('setMode', {level: this.mode.level});
                this.$store.commit('setStep', {step: 2});
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .mode-option {
        display: flex;
        width: 85vw;
        height: 20vh;
        background-color: rgb(155, 192, 255);
        justify-content: center;
        align-items: center;
        transition: all 0.2s ease-in-out;
        .title {
            font-family: 'Nunito', sans-serif;
            font-size: 70px;
            text-transform: capitalize;
            transition: all 0.25s ease-in-out;
        }
        &:hover {
            cursor: pointer;
            background-color: rgb(128, 174, 255);
            .title {
                // margin-left: 15px;
                font-size: 80px;
            }
            width:95vw;
            height: 25vw;
            // margin-left: 35px;
        }
        /* border-radius: 3px; */
    }
</style>
