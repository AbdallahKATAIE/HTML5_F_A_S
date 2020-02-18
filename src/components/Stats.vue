<template>
    <div class="stats">        
        <span class="username">{{ this.$store.state.username }}</span>
        <span class="remainingTime">{{ prettyRemainingTime }}</span>
        <span class="remainingCells"> {{ remainingCells }} cellules restantes</span>
    </div>
</template>

<script>
    export default {
        name: "Stats",
        props: {
            remainingCells: Number,
            remainingTime: Number
        },
        data: function() {
            return {
            }
        }, computed : {
            prettyRemainingTime() {
                let minuts = Math.trunc(this.remainingTime/60);
                let seconds = this.remainingTime-60*minuts;
                if(minuts<10) {
                    minuts = "0"+minuts;
                }
                if(seconds<10) {
                    seconds = "0"+seconds;
                }
                return minuts+":"+seconds;
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .stats {
        width: 80vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 40px;
        color: rgb(156, 195, 255);
        .username {
            text-transform: uppercase;
            font-size: 75px;
        }
    }
</style>