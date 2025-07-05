// src/composables/useClickOutside.ts
import { onMounted, onBeforeUnmount, watch } from 'vue'
import type { Ref } from 'vue'

export function useClickOutside(
  elementsToWatch: Ref<any>[], // Ref<any> because it could be a component instance or HTMLElement
  callback: () => void,
  isActive: Ref<boolean>,
) {
  const handleClick = (event: MouseEvent) => {
    // Only proceed if the listener is intended to be active
    if (!isActive.value) {
      return
    }

    const target = event.target as HTMLElement

    // Check if the click target is inside any of the elementsToWatch
    const clickedInsideAnyElement = elementsToWatch.some((elRef) => {
      // Get the actual DOM element. Assume component refs might expose $el.
      // If your child components use `defineExpose({ rootElement: myRef })`,
      // you'd access `elRef.value.rootElement` here instead of `elRef.value.$el`.
      const domElement = elRef.value instanceof HTMLElement ? elRef.value : elRef.value?.$el

      // Ensure the DOM element exists and contains the click target
      return domElement && domElement.contains(target)
    })

    // If the click was not inside any of the watched elements, execute the callback
    if (!clickedInsideAnyElement) {
      callback()
    }
  }

  // Watch for changes in the isActive ref to add/remove the event listener
  watch(
    isActive,
    (active) => {
      if (active) {
        // Crucial: Use setTimeout to allow the initial click event (that opened the component)
        // to propagate and complete before the document listener becomes active.
        setTimeout(() => {
          document.addEventListener('click', handleClick)
        }, 0)
      } else {
        document.removeEventListener('click', handleClick)
      }
    },
    { immediate: true },
  ) // `immediate: true` will run the watcher once on component mount based on initial isActive value.

  // Clean up the event listener when the component using this composable unmounts
  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClick)
  })
}
