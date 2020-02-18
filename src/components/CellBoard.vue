<template>
  <div class="cell-board box-shadow" :style="cellStyle"></div>
</template>

<script>
    export default {
        name: "CellBoard",
        props: {
            // height: String,
            // width: String,
        },
        data: function() {
            return {
                revealed: false
            }
        },
        computed: {
            cellStyle: function() {
                return {
                    // height: this.height,
                    // width: this.width,
                }
            }
        },
        methods: {
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .cell-board {
        border-radius:20px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50px;
        width: 50px;
        background-color: rgb(156, 195, 255);
        margin: 5px;
        font-family: 'Nunito', sans-serif;
        font-size: 20px;
        font-weight: bold;
        transition: all 0.2s ease-in-out;
        background-image: linear-gradient(to top, RGB(0, 0, 0, 0.15), RGB(255, 255, 255, 0.15));
        cursor: pointer;
        &.safe {
            background-color: rgba(40, 64, 99, 39);
            color: rgba(255, 255, 255, 0.9);
        }
        &.bomb {
            background-color: rgb(238, 78, 78);
        }
        &:hover:not(.safe):not(.bomb) {
            background-color: rgba(82, 114, 193, 76);
        }
    }
</style>
