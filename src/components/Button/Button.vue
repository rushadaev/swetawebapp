<template>
  <div :class="wrapperClass">
    <button :class="styles._wrapper_in" :disabled="disabled" @click="handleClick">
      <div :class="styles._content">
        <div v-if="before" :class="styles._before">
          <slot name="before"></slot>
        </div>
        <div v-if="$slots.default" :class="styles._content_in">
          <slot></slot>
        </div>
        <div v-if="after" :class="styles._after">
          <slot name="after"></slot>
        </div>
      </div>
    </button>
  </div>
</template>

<script>
import { computed } from "vue";
import styles from "./Button.module.css";

export default {
  props: {
    disabled: Boolean,
    stretched: Boolean,
    hasHover: {
      type: Boolean,
      default: true,
    },
    hasActive: {
      type: Boolean,
      default: true,
    },
    className: {
      type: [String, Object, Array],
      default: "",
    },
    contentPosition: {
      type: String,
      default: "center",
    },
    mode: {
      type: String,
      default: "primary",
    },
    size: {
      type: String,
      default: "l",
    },
    before: Boolean,
    after: Boolean,
    onClick: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const wrapperClass = computed(() => {
      return [
        styles._wrapper,
        {
          [styles._stretched]: props.stretched,
          [styles._with_hover]: props.hasHover,
          [styles._with_active]: props.hasActive,
          [styles._disabled]: props.disabled,
          [styles[`_position_${props.contentPosition}`]]:
              styles[`_position_${props.contentPosition}`],
          [styles[`_mode_${props.mode}`]]: styles[`_mode_${props.mode}`],
          [styles[`_sz_${props.size}`]]: styles[`_sz_${props.size}`],
          [props.className]: props.className,
        },
      ];
    });

    function handleClick() {
      if (!props.disabled) {
        props.onClick();
      }
    }

    return {
      wrapperClass,
      handleClick,
      styles,
    };
  },
};
</script>