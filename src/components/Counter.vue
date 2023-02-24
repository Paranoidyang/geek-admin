
<template>
  <div>
    <h1 @click="add">{{ count }}</h1>
  </div>
</template>

<script setup>
// ref版本
// import { ref } from "vue";
// let count = ref(1)
// let color = ref('red')
// function add() {
//   count.value++
//   color.value = Math.random() > 0.5 ? "blue" : "red"
// }

// vuex版本
import { computed } from 'vue'
import { useStore } from 'vuex'
let store = useStore()
let count = computed(() => store.state.count)

function add() {
  store.commit('add')
}
</script>

<style scoped>
h1 {
  color: v-bind(color);
}
</style>>