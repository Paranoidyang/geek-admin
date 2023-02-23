
<template>
  <h1>这是首页</h1>
  <h1>{{ x }}, {{ y }}</h1>
  <TodoList />
  <Counter />
  <Rate v-model="score" :size="30" theme="green"></Rate>
</template>
<script setup>
import { ref } from 'vue'
import TodoList from '../components/Todolist.vue'
import Counter from '../components/Counter.vue'
import Rate from '../components/Rate.vue'
import { useMouse } from '../utils/mouse'
let x = ref(0)
let y = ref(0)
let obj = useMouse()
x.value = obj.x
y.value = obj.y

let score = ref(2.5);
</script>
