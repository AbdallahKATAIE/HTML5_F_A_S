<template>
    <div class="modal box-shadow" :class="'modal-'+type">        
        <span class="modal-title">{{ title }}</span>      
        <span class="modal-close-button" @click="$emit('onCloseModal')">X</span>
        <span class="modal-message"><slot></slot></span>
    </div>
</template>

<script>
    export default {
        name: "Alert",
        props: {
            message: String,
            type: String
        },
        data: function() {
            return {
            }
        }, computed : {title() {
                switch(this.type) {
                    case "error":
                        return "Aïe...";
                    case "warning":
                        return "Attention";
                    case "success":
                        return "Succès";
                    default:
                        return "Message";
                }
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .modal {
        position: fixed;
        width: 80vw;
        height: 30vh;
        display: flex;
        background-color: white;
        color: black;
        font-family: 'Nunito', sans-serif;
        padding: 10px;
        transition: all 0.2s ease-in-out;
        align-items: center;
        .modal-close-button {
            font-size: 30px;
            position: absolute;
            top: 10px;
            right: 15px;
            transition: all 0.5s ease-in-out;
            cursor: pointer;
            &:hover {
                transform: rotate(180deg);
            }
        }
        .modal-title {
            font-size: 25px;
            position: absolute;
            top: 10px;
            left: 15px;
            transition: all 0.5s ease-in-out;
        }
        .modal-message {
            margin-left: 20px;
        }
        &:hover {            
            // width: 81vw;
            // height: 31vh;
        }
        &.modal-error {
            background-color: rgb(194, 75, 75);
            background-image: linear-gradient(to top, RGB(0, 0, 0, 0.15), RGB(255, 255, 255, 0.15));
            color: rgb(156, 195, 255);
        }
        &.modal-success {
            background-color: rgba(29, 46, 71, 39);
            background-image: linear-gradient(to top, RGB(0, 0, 0, 0.15), RGB(255, 255, 255, 0.15));
            color: rgb(156, 195, 255);
        }
        &.modal-warning {
            background-color: rgba(29, 46, 71, 39);
            background-image: linear-gradient(to top, RGB(0, 0, 0, 0.15), RGB(255, 255, 255, 0.15));
            color: rgb(156, 195, 255);
        }
    }
</style>