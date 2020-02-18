<template>
  <div id="mode-chooser">
      <ModeOption v-for="mode in modes" :key="mode.level" :mode="mode"></ModeOption>
  </div>
</template>

<script>
    import ModeOption from "@components/ModeOption.vue";
    export default {
        components: { ModeOption },
        name: "ModeChooser",
        data: function() {
            return {
                modes: [
                     {
                         name: "Facile",
                         level: 0
                     },
                     {
                         name: "Intermédiaire",
                         level: 1
                     },
                     {
                         name: "Difficile",
                         level: 2
                     }
                ]
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    #mode-chooser {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        height: 100%;
    }
</style>
