<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const numberHoursRef = ref<HTMLElement | null>(null)
const barSecondsRef = ref<HTMLElement | null>(null)
const handHoursRef = ref<HTMLElement | null>(null)
const handMinutesRef = ref<HTMLElement | null>(null)
const handSecondsRef = ref<HTMLElement | null>(null)

let clockIntervalId: number | undefined

interface Props {
  timezone: number | undefined | null // timezone is offset in seconds
}
const props = defineProps<Props>()

const dynamicTimezoneOffset = computed(() => {
  return props.timezone
})

const updateTime = () => {
  if (handHoursRef.value && handMinutesRef.value && handSecondsRef.value) {
    const offsetValue = dynamicTimezoneOffset.value

    let currentHours: number
    let currentMinutes: number
    let currentSeconds: number

    if (typeof offsetValue === 'number') {
      const nowUtcMillis = Date.now()
      const targetMillis = nowUtcMillis + offsetValue * 1000
      const targetDate = new Date(targetMillis)

      currentHours = targetDate.getUTCHours()
      currentMinutes = targetDate.getUTCMinutes()
      currentSeconds = targetDate.getUTCSeconds()
    } else {
      const date = new Date()
      currentHours = date.getHours()
      currentMinutes = date.getMinutes()
      currentSeconds = date.getSeconds()
    }

    // Hours: 360 degrees / 12 hours = 30 degrees per hour.
    // each minute is 0.5 degrees for the hour hand
    const hoursDegrees = (currentHours % 12) * 30 + currentMinutes / 2
    const minutesDegrees = currentMinutes * 6
    const secondsDegrees = currentSeconds * 6

    handHoursRef.value.style.transform = `rotate(${hoursDegrees}deg)`
    handMinutesRef.value.style.transform = `rotate(${minutesDegrees}deg)`
    handSecondsRef.value.style.transform = `rotate(${secondsDegrees}deg)`
  }
}

onMounted(() => {
  if (numberHoursRef.value && barSecondsRef.value) {
    const numberElements: string[] = []
    const barElements: string[] = []

    for (let i = 1; i <= 12; i++) {
      numberElements.push(`<span style="--index:${i};"><p>${i}</p></span>`)
    }
    numberHoursRef.value.insertAdjacentHTML('afterbegin', numberElements.join(''))

    for (let i = 1; i <= 60; i++) {
      barElements.push(`<span style="--index:${i};"><p></p></span>`)
    }
    barSecondsRef.value.insertAdjacentHTML('afterbegin', barElements.join(''))
  }

  updateTime()
  clockIntervalId = setInterval(updateTime, 1000) as number
})

// OnUnmounted hook: Clear timer
onUnmounted(() => {
  if (clockIntervalId !== undefined) {
    clearInterval(clockIntervalId)
    clockIntervalId = undefined
  }
})

// Watch for changes in dynamicTimezoneOffset to re-render clock hands
watch(
  dynamicTimezoneOffset,
  (newOffset, oldOffset) => {
    if (newOffset !== oldOffset) {
      updateTime() // Update hands immediately with new timezone
    }
  },
  { immediate: true }, // Run immediately on component mount with initial offset
)
</script>

<template>
  <div class="wrapper ml-6 md:ml-10">
    <div ref="numberHoursRef" class="number-hours"></div>
    <div ref="barSecondsRef" class="bar-seconds"></div>
    <div class="hands-box">
      <div ref="handHoursRef" class="hand hours"><i></i></div>
      <div ref="handMinutesRef" class="hand minutes"><i></i></div>
      <div ref="handSecondsRef" class="hand seconds"><i></i></div>
    </div>
  </div>
</template>

<style>
.wrapper {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bar-seconds,
.number-hours {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.bar-seconds span {
  position: absolute;
  transform: rotate(calc(var(--index) * 6deg)); /* 360deg / 60 = 6deg */
  inset: -20px;
  text-align: center;
}

.bar-seconds span p {
  display: inline-block;
  width: 1px;
  height: 8px;
  background: var(--color-primary-text);
}

/* every multiple of 5 */
.bar-seconds span:nth-child(5n) p {
  width: 4px;
  height: 10px;
  transform: translateY(1px);
}

.number-hours span {
  position: absolute;
  transform: rotate(calc(var(--index) * 30deg)); /* 360 / 12hours = 30deg */
  inset: -2px;
  text-align: center;
}

.number-hours span p {
  font-size: 2px;
  transform: rotate(calc(var(--index) * -30deg));
}

.hands-box {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hands-box .hand {
  position: absolute;
  border-radius: 50%;
  display: flex;
  justify-content: center;
}

.hands-box .hand i {
  display: inline-block;
  transform-origin: bottom;
  border-radius: 50%;
}

.hands-box .hours {
  width: 60px;
  height: 60px;
}

.hands-box .hours i {
  width: 3px;
  height: 30px;
  background: var(--color-primary-text);
}

.hands-box .minutes {
  width: 80px;
  height: 80px;
}

.hands-box .minutes::before {
  content: '';
  position: absolute;
  top: 43%;
  transform: translate(1%);
  width: 10px;
  height: 10px;
  background-color: var(--color-primary-text);
  border-radius: 50%;
}

.hands-box .minutes i {
  width: 3px;
  height: 40px;
  background: var(--color-primary-text);
}

.hands-box .seconds {
  width: 100px;
  height: 100px;
}

.hands-box .seconds i {
  width: 3px;
  height: 50px;
  background: var(--color-primary-text);
}
</style>
