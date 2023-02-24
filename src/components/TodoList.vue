<template>
  <div>
    <transition name="modal">
      <div class="info-wrapper" v-if="showModal">
        <div class="info">哥，你啥也没输入！</div>
      </div>
    </transition>
    <input type="text" v-model="title" @keydown.enter="addTodo" />
    <button v-if="active < all" @click="clear">清理</button>
    <ul v-if="todos.length">
      <li v-for="todo in todos">
        <input type="checkbox" v-model="todo.done" />
        <span :class="{ done: todo.done }"> {{ todo.title }}</span>
      </li>
    </ul>
    <div v-else>暂无数据</div>
    <div>
      全选
      <input type="checkbox" v-model="allDone" />
      <span> {{ active }} / {{ all }} </span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from "vue";
let { title, todos, addTodo, clear, active, all, allDone, showModal } =
  useTodos();

/**
 * 清单相关数据和方法
 */
function useTodos() {
  let title = ref("");
  let todos = useStorage("todos", []);
  let showModal = ref(false);

  function addTodo() {
    if (!title.value) {
      showModal.value = true;
      setTimeout(() => {
        showModal.value = false;
      }, 1500);
      return;
    }
    todos.value.push({
      title: title.value,
      done: false,
    });
    title.value = "";
  }
  function clear() {
    todos.value = todos.value.filter((v) => !v.done);
  }
  let active = computed(() => {
    return todos.value.filter((v) => !v.done).length;
  });
  let all = computed(() => todos.value.length);
  let allDone = computed({
    get: function () {
      return active.value === 0;
    },
    set: function (value) {
      todos.value.forEach((todo) => {
        todo.done = value;
      });
    },
  });
  return { title, todos, addTodo, clear, active, all, allDone, showModal };
}

/**
 * 把任意数据响应式的变化同步到本地存储
 * @param {*} name
 * @param {*} value
 */
function useStorage(name, value = []) {
  let data = ref(JSON.parse(localStorage.getItem(name)) || value);
  watchEffect(() => {
    localStorage.setItem(name, JSON.stringify(data.value));
  });
  return data;
}
</script>
<style lang="scss" scoped>
$padding: 10px;
$white: #fff;
ul {
  width: 500px;
  margin: 0 auto;
  padding: 0;
  li {
    &:hover {
      cursor: pointer;
    }
    list-style-type: none;
    margin-bottom: $padding;
    padding: $padding;
    background: $white;
    box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.1);
  }
}
.info-wrapper {
  position: fixed;
  top: 20px;
  width: 200px;
}

.info {
  padding: 20px;
  color: white;
  background: #d88986;
}

.modal-enter-from {
  opacity: 0;
  transform: translateY(-60px);
}

.modal-enter-active {
  transition: all 0.3s ease;
}

.modal-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}

.modal-leave-active {
  transition: all 0.3s ease;
}
</style>
