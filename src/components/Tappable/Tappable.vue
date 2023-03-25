<template>
  <component
      :is="Component"
      :class="['root', rootClassName, mode === 'opacity' && tappedClassNames]"
      @mousedown="onMousedown"
      @touchstart="onTouchstart"
      @mouseleave="onMouseleave"
      :disabled="disabled"
      :data-testid="data-testid"
  >
    <div class="container">
      <slot />
    </div>
    <div v-if="theme === 'apple' && mode === 'overlay'" class="fade" />
    <div v-if="theme === 'material'" class="ripples">
      <span
          v-for="ripple in ripples"
          :key="ripple.id"
          class="ripple"
          :class="{tapped: tapped}"
          :style="
          Object.assign(
            {},
            {
              left: ripple.x - ripple.size / 2 + 'px',
              top: ripple.y - ripple.size / 2 + 'px',
              width: ripple.size + 'px',
              height: ripple.size + 'px'
            },
            ripple.ending && { animation: 'ripple-ending 0.75s forwards' }
          )
        "
          @animationend="onRippleAnimationEnd(ripple)"
      ></span>
    </div>
  </component>
</template>

<script>
import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import classNames from 'classnames'
import { useTapHighlight } from 'hooks/useTapHighlight'
import { useTheme } from 'hooks/useTheme'

export default defineComponent({
  props: {
    Component: {
      type: [Object, String],
      required: true
    },
    rootClassName: String,
    className: String,
    mode: {
      type: String,
      default: 'overlay',
      validator: (value) => value === 'overlay' || value === 'opacity'
    },
    disabled: Boolean,
    'data-testid': String
  },

  setup(props) {
    const { tapHighlightClassNames, handlers: tappedHandlers } = useTapHighlight({
      mode: props.mode,
      disabled: props.disabled,
      onTap: ({ target, clientX, clientY }) => {
        if (theme.value === 'material' && target) {
          const { x, y, width, height } = target.getBoundingClientRect()
          const size = Math.max(width * 2, height * 2)
          ripples.value.push({
            id: Number(new Date()),
            x: clientX - x,
            y: clientY - y,
            size: size,
            ending: false
          })
        }
      }
    })

    const ripples = ref([])
    const { theme, themeClassName } = useTheme()

    const tapped = ref(false)

    const Component = computed(() =>
        typeof props.Component === 'string' ? props.Component : defineComponent(props.Component)
    )

    const onTouchstart = (event) => {
      if (!handlers.touchstart(event)) return
      tapped.value = true
    }

    const onMousedown = (event) => {
      if (!handlers.mousedown(event)) return
      tapped.value = true
    }

    const onMouseleave = (event) => {
      if (!handlers.mouseleave(event)) return
      tapped.value = false
    }

    const onRippleAnimationEnd = (ripple) => {
      if (!tapped.value) {
        ripples.value = ripples.value.filter((r) => r.id !== ripple.id)
        return
      }

      ripple.ending = true
    }

    onMounted(() => themeClassName('root'))

    return {
      tappedClassNames: computed(() => classNames(tapHighlightClassNames.value)),
      onTouchstart,
      onMousedown,
      onMouseleave,
      onRippleAnimationEnd,
      ripples,
      Component,
      theme,
      themeClassName
    }
  }
})
</script>

<style scoped lang="scss">
.root {
  user-select: none;
}

.container {
  position: relative;
  z-index: 0;
}

.fade {
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  transition: opacity 0.2s;
  pointer-events: none;
}

.ripples {
  position: relative;
}

.ripple {
  position: absolute;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  opacity: 1;
  animation: ripple 0.75s ease-out;
  animation-fill-mode: forwards;
}

.tapped {
  background-color: rgba(255, 255, 255, 0.5);
}

@keyframes ripple {
  from {
    opacity: 1;
    transform: scale(0);
  }
  to {
    opacity: 0;
    transform: scale(2);
  }
}

@keyframes ripple-ending {
  0% {
    transform: scale(1);
    opacity: 0.5;
  }
  100% {
    transform: scale(2.5);
    opacity: 0;
  }
}
</style>