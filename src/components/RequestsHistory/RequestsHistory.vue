<template>
  <div class="requests_history_container">
    <div class="requests_header">
      <h2>История запросов</h2>
    </div>
    <div class="requests_history container container__material">
      <div v-if="requests.length == 0" class="text text__material">Создайте запрос, чтобы видеть историю</div>
      <div v-for="(request, index) in requests" @click="$emit('showPopup', {command: request.command, prompt: request.prompt, 'message': 'Хотите изменить результат?'})" class="requests_history_item requests_history_item__material">
        <div :class="{'defaultStatus': request.status == 'started', 'completedStatus': request.status == 'done', 'errorStatus': request.status == 'failed'}" class="statusText statusText__material">
          {{ requestsTranslate[request.status] }}
        </div>
        <div class="title title__material">
          {{ requestsTranslate[request.command] }}
        </div>
        <div class="text text__material">
          Запрос: {{ request.related_requests.length > 0 ? request.related_requests[0].prompt : request.prompt }}
        </div>
        <div v-if="request.status == 'done2'" class="text text__material">
          Результат: {{ request.prompt }}
        </div>
        <div v-if="request.status == 'started'" class="text text__material">
          <b>Время ожидания до 20 сек, обновите, чтобы увидеть статус</b>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      requests: [],
      requestsTranslate: {
        started: 'В процессе',
        failed: 'Ошибка',
        done: 'Успешно',
        getIdea: 'Придумать идею',
        getPost: 'Придумать текст для поста',
        getContentPlan: 'Создать контент план',
        getScenario: 'Написать сценарий',
      }
    };
  },
  mounted() {
    this.getRequests();
  },
  methods: {
    async getRequests(){
      const data = {
        tg_id: this.TWA.initDataUnsafe?.user?.id || 782919745,
      };
      await axios.get("https://funny-how.com/api/getRequestHistory", {params: data}).then((response) => {
        this.requests = response.data;
      });
    },
  },
}
</script>
<style scoped lang="scss">
@import '../../index.module';
@import "RequestsHistory.module";
.requests_header{
  padding: 20px 16px 4px;
  background: var(--tg-theme-bg-color);
  font-family: "Roboto",sans-serif;
  font-size: 15px;
  font-style: normal;
  line-height: 16px;
  font-weight: 500;
  color: var(--tg-theme-link-color);
  display: flex;
  align-items: center;
  justify-content: space-between;

  h2{
    font-size: inherit;
    line-height: inherit;
    font-weight: inherit;
    width: 100%;
  }
}
</style>