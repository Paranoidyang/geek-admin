<template>
  <h1>这是首页</h1>
  <h1>{{ x }}, {{ y }}</h1>
  <TodoList />
  <Counter />
  <Rate v-model="score" size="30" theme="green"></Rate>
  <Heading :level="3">hello geekbang</Heading>
  <TodoList2 />
</template>
<script setup>
import { ref } from "vue";
import TodoList from "../components/Todolist.vue";
import TodoList2 from "../components/Todolist.jsx";
import Counter from "../components/Counter.vue";
import Rate from "../components/Rate.vue";
import Heading from "../components/Heading.jsx";
import { useMouse } from "../utils/mouse";
let x = ref(0);
let y = ref(0);
let obj = useMouse();
x.value = obj.x;
y.value = obj.y;

let score = ref(2.5);
</script>
