<template>
  <div>
    <button v-bind="referenceProps" @click="handleOpen">{{ children }}</button>
    <FloatingPortal v-if="open || (!open && isAnimating)">
      <div
          {...getFloatingProps({
          ref: (node) => {
        floating(node);
        floatingRef.current = node;

        if (typeof ref === "function") {
        ref(node);
        } else if (ref) {
        ref.current = node;
        }
        },
        style: {
        position: strategy,
        top: `${y ?? 0}px`,
        left: `${x ?? 0}px`,
        transformOrigin: popoverTransformOrigin,
        },
        })}
        class="popover"
        :class="popoverClassName"
        >
        <template v-for="(option, index) in options" :key="index">
          <Tappable
              Component="button"
              @click="onOptionClick(option.value)"
              :data-testid="getDataTestId(option.value)"
              rootClassName="optionContainer"
              class="option"
          >
            <div v-if="value === option.value" >X</div>
            <div class="label">{{ option.label }}</div>
          </Tappable>
        </template>
      </div>
    </FloatingPortal>
  </div>
</template>

<script>
import {
  FloatingPortal,
  Placement,
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
} from "@floating-ui/vue";
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  watch,
} from "vue";

export default defineComponent({
  name: "SelectList",
  props: {
    children: Object,
    value: String,
    options: Array,
    onChange: Function,
    placement: {
      type: String,
      default: "bottom",
    },
    open: Boolean,
    onOpenChange: {
      type: Function,
      default: null,
    },
    triggerRef: {
      type: Object,
      default: null,
    },
    floatingShiftPadding: {
      type: Number,
      default: 0,
    },
    floatingOffset: {
      type: Number,
      default: 0,
    },
    popoverClassName: {
      type: String,
      default: null,
    },
    childrenClassNameOnOpen: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    dataTestId: {
      type: String,
      default: null,
    },
  },
  components: {
    FloatingPortal,
    Tappable,
  },
  setup(props, { emit }) {

    const floatingRef = ref(null);
    const isAnimating = ref(false);
    const innerOpen = ref(false);

    const open = computed(() => props.open ?? innerOpen.value);

    const handleOpenChange = (open) => {
      if (props.onOpenChange) {
        emit("onOpenChange", open);
      } else {
        innerOpen.value = open;
      }

      isAnimating.value = true;

      animate({
        duration: 1000,
        draw: ({ progress, isDone }) => {
          if (isDone) {
            isAnimating.value = false;
          }

          if (floatingRef && floatingRef.value) {
            floatingRef.value.style.opacity = open
                ? String(progress)
                : String(1 - progress);
            floatingRef.value.style.transform = open
                ? `scale(${0.3 + 0.7 * progress})`
                : `scale(${0.3 + 0.7 * (1 - progress)})`;
          }
        },
      });
    };

    const { x, y, reference, floating, strategy, context, placement } =
        useFloating({
          open: open.value,
          onOpenChange: handleOpenChange,
          middleware: [offset(props.floatingOffset), flip(), shift({ padding: props.floatingShiftPadding })],
          placement: props.placement,
          whileElementsMounted: autoUpdate,
        });

    const { getReferenceProps, getFloatingProps } = useInteractions([
      useClick(context, {
        enabled: !props.onOpenChange,
      }),
      useDismiss(context, {
        enabled: !props.onOpenChange,
      }),
    ]);

    //const CheckComponent = theme === "apple" ? CheckIosSVG : CheckAndroidSVG;

    const onOptionClick = (value) => {
      emit("onChange", value);
      handleOpenChange(false);
    };

    const getDataTestId = (value) => {
      return props.dataTestId
          ? `${props.dataTestId}-${value}-option`
          : undefined;
    };

    const popoverTransformOrigin = computed(() => {
      const triggerElLeftPosition =
          context.refs.reference.value?.getBoundingClientRect().left || 0;
      const halfOfScreenWidth = window.innerWidth / 2;
      const isTriggerElLocatedOnRightSideOfScreen =
          triggerElLeftPosition > halfOfScreenWidth;

      const xPlacement = (() => {
        if (placement.value.includes("end")) {
          return "right";
        } else if (placement.value.includes("start")) {
          return "left";
        } else if (isTriggerElLocatedOnRightSideOfScreen) {
          return "right";
        } else {
          return "left";
        }
      })();

      const yPlacement = placement.value.includes("bottom") ? "top" : "bottom";

      return `${yPlacement} ${xPlacement} `;
    });

    const referenceProps = getReferenceProps({
      class: cn(props.children?.props?.class, open.value && props.childrenClassNameOnOpen),
      ref: (node) => {
        reference(node);

        if (props.triggerRef) {
          props.triggerRef.value = node;
        }
      },
    });

    return {
      themeClassName,
      children: props.children,
      value: props.value,
      options: props.options,
      placement,
      popoverClassName: props.popoverClassName,
      referenceProps,
      getFloatingProps,
      context,
      handleOpen: () => {
        if (!props.disabled) {
          innerOpen.value = !innerOpen.value;
        }
      },
      onOptionClick,
      CheckComponent,
      isAnimating,
      floatingRef,
      x,
      y,
      strategy,
      getDataTestId,
      popoverTransformOrigin,
    };
  },
});
</script>

<style scoped>
.popover {
  position: absolute;
  background-color: white;
  box-shadow: 0px 3px 15px -3px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 8px;
  opacity: 0;
  transform: scale(0.1);
  transition: opacity 300ms, transform 300ms;
  overflow: hidden;
  z-index: 100;
  border: none;
  outline: none;
  font-family: sans-serif;
  font-size: 16px;
}

.optionContainer {
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 5px;
}

.optionContainer:hover {
  background-color: #f2f2f2;
}

.optionContainer:focus {
  outline: none;
  background-color: #d9d9d9;
}

.option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.label {
  margin-left: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>