<template>
  <div class="action_buttons_container">
    <template v-if="!subscribed">
      <Button :onClick="() => {subscribed = !subscribed}" mode="primary">
        Оформить подписку
      </Button>
    </template>
    <template v-else>
      <Button :disabled="true">
        Подписка действительна до 23.04.2023
      </Button>
      <Button :onClick="() => {subscribed = !subscribed}" mode="destructive">Отписаться</Button>
    </template>
  </div>
</template>
<script>
import Button from "../Button/Button.vue";
export default {
  components: {Button},
  data() {
    return {
      subscribed: true
    };
  },
}
</script>
<style scoped lang="scss">
.action_buttons_container{
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 33px 16px 16px;
}
</style>