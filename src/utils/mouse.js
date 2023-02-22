import { ref, onMounted, onUnmounted } from 'vue'
/**
 * 实时获取鼠标的坐标(x, y)
 * @returns 
 */
export function useMouse() {
  const x = ref(0)
  const y = ref(0)
  function update(e) {
    x.value = e.pageX
    y.value = e.pageY
  }
  onMounted(() => {
    window.addEventListener('mousemove', update)
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })
  return { x, y }
}