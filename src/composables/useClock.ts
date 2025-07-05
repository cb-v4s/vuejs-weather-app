import { ref, onUnmounted, watchEffect, type Ref, unref } from 'vue'
import moment from 'moment'

export const useClock = (
  timezoneOffsetSeconds: Ref<number | undefined | null> | number | undefined | null,
) => {
  const localTime = ref<string | undefined>(undefined)
  let intervalId: number | undefined

  watchEffect((onCleanup) => {
    const offsetValue = unref(timezoneOffsetSeconds)

    if (intervalId) {
      clearInterval(intervalId)
    }

    if (typeof offsetValue === 'number') {
      const update = () => {
        const localMoment = moment().utcOffset(offsetValue / 60)

        const formattedTime = localMoment.format('h:mm:ss A') // e.g. 3:03:56 PM
        localTime.value = formattedTime
      }

      update()

      intervalId = setInterval(update, 1000)

      onCleanup(() => {
        if (intervalId) {
          clearInterval(intervalId)
          intervalId = undefined // Clear the stored ID
        }
      })
    } else {
      localTime.value = undefined
    }
  })

  onUnmounted(() => {
    if (intervalId) {
      clearInterval(intervalId)
    }
  })

  return { localTime }
}
