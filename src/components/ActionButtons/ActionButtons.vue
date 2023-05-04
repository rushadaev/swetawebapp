<template>
  <div class="action_buttons_container">
    <template v-if="!profile.id">
      <Button :disabled="true">
        Загрузка профиля...
      </Button>
    </template>
    <template v-else-if="!profile.subscribed">
      <Button v-if="profile.request_count" :disabled="true">
        Вам доступно {{3 - profile.request_count}} бесплатных запросов
      </Button>
      <Button @click="openSubscribePage" mode="primary">
        Оформить подписку
      </Button>
    </template>
    <template v-else>
      <Button :disabled="true">
        Подписка действительна до {{ profile.subscription_until }}
      </Button>
      <Button v-if="profile.autopay" @click="openAutopayOffPage" mode="destructive">Выключить автопродление</Button>
      <Button v-if="!profile.autopay" @click="openAutopayOnPage" mode="primary">Включить автопродление</Button>
    </template>
  </div>
</template>
<script>
import Button from "../Button/Button.vue";
import axios from "axios";
export default {
  components: {Button},
  props: {
    profile: Object,
  },
  data() {
    return {
      subscribed: true,
    };
  },
  mounted() {
  },
  methods: {
    openSubscribePage(){
      const profile = {
        sb_id: this.profile.sb_id,
        tg_id: this.profile.tg_id,
      };
      this.$router.push({
        name: 'subscribe_to_ai',
        query: profile,
      });
    },
    openAutopayOnPage(){
      const profile = {
        sb_id: this.profile.sb_id,
        tg_id: this.profile.tg_id,
      };
      this.$router.push({
        name: 'autopay_off_ai',
        query: profile,
      });
    },
    openAutopayOffPage(){
      const profile = {
        sb_id: this.profile.sb_id,
        tg_id: this.profile.tg_id,
      };
      this.$router.push({
        name: 'autopay_on_ai',
        query: profile,
      });
    },
    async setupAutopay(isAutopay){
      const data = {
        tg_id: this.TWA.initDataUnsafe?.user?.id || 782919745,
        isAutopay: isAutopay
      };
      await axios.post("https://funny-how.com/api/setupAutopay", data).then((response) => {
        this.profile = response.data;
      });

    }
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