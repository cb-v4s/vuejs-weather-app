import { ref, onUnmounted, watchEffect, type Ref, unref } from 'vue'
import moment from 'moment'

export const useClock = (
  timezoneOffsetSeconds: Ref<number | undefined | null> | number | undefined | null,
) => {
  const localTime = ref<string | undefined>(undefined)
  let intervalId: number | undefined

  watchEffect((onCleanup) => {
    const offsetValue = unref(timezoneOffsetSeconds)

    if (intervalId !== undefined) {
      clearInterval(intervalId)
      intervalId = undefined
    }

    if (typeof offsetValue === 'number') {
      const update = () => {
        const targetMoment = moment.utc().utcOffset(offsetValue / 60)

        const formattedTime = targetMoment.format('h:mm:ss A') // e.g. 3:03:56 PM
        localTime.value = formattedTime
      }

      update()

      intervalId = setInterval(update, 1000) as number

      onCleanup(() => {
        if (intervalId !== undefined) {
          clearInterval(intervalId)
          intervalId = undefined
        }
      })
    } else {
      localTime.value = undefined
    }
  })

  onUnmounted(() => {
    if (intervalId !== undefined) {
      clearInterval(intervalId)
      intervalId = undefined
    }
  })

  return { localTime }
}
