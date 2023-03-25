<template>
  <div class="home">
    <Header></Header>
    <ActionButtons></ActionButtons>
    <RequestCreateBlock></RequestCreateBlock>
    <hr class="separator separator__material">
    <InfoBlock></InfoBlock>
    <hr class="separator separator__material">
    <RequestsHistory @showPopup="showPopup($event)"></RequestsHistory>
  </div>
</template>

<script>
// Objects
//BackButton
//MainButton
//HapticFeedback

// Methods
//enableClosingConfirmation() NEW
//disableClosingConfirmation() NEW
//onEvent(eventType, eventHandler)

//offEvent(eventType, eventHandler)
//sendData(data)
//openTelegramLink(url)
//openInvoice(url[, callback])
//showPopup(params[, callback]) NEW
//showAlert(message[, callback]) NEW
//showConfirm(message[, callback]) NEW

import Header from '../containers/Header/Header.vue';
import ActionButtons from "../components/ActionButtons/ActionButtons.vue";
import RequestsHistory from "../components/RequestsHistory/RequestsHistory.vue";
import InfoBlock from "../components/InfoBlock/InfoBlock.vue";
import RequestCreateBlock from "../components/RequestCreateButton/RequestCreateBlock.vue";

export default {
  components: {
    RequestCreateBlock,
    InfoBlock,
    RequestsHistory,
    ActionButtons,
    Header
  },

  data() {
    return {
      style_selected: 'medium',
      clipboard: null,
    };
  },
  created() {
    // Binnding function to all the event types
    // triggered unexpected
    //this.TWA.onEvent('themeChanged', this.themeChanged);
    // triggered too often
    //this.TWA.onEvent('viewportChanged', this.viewportChanged);
    //this.TWA.onEvent('mainButtonClicked', this.mainButtonClicked);
    // I couldn't trigger this yet
    this.TWA.onEvent('settingsButtonClicked', this.settingsButtonClicked);
    this.TWA.onEvent('invoiceClosed', this.invoiceClosed);
    // Seems that the popup is an alter itself
    // Commenting this otherwise I'm stuck in a loop
    //this.TWA.onEvent('popupClosed', this.popupClosed);
    this.TWA.onEvent('qrTextReceived', this.processQRCode);
    this.TWA.onEvent('clipboardTextReceived', this.processClipboard);
    this.TWA.BackButton.hide();
    this.TWA.MainButton.hide()

  },
  mounted() {
    // What is the best? mounted or created??
    this.TWA.ready();
  },
  methods: {
    // attached with onEvent function during created
    themeChanged() {
      this.TWA.showAlert('Theme has changed');
    },
    viewportChanged() {
      this.TWA.showAlert('Viewport has changed');
    },
    mainButtonClicked() {
      this.TWA.showAlert('Main button was pressed');
      window.Telegram.WebApp.showAlert('Main button was pressed version2');
    },
    backButtonClicked() {
      this.TWA.showAlert('back button was clicked');
    },
    settingsButtonClicked() {
      this.TWA.showAlert('Settings button pressed');
    },
    invoiceClosed() {
      this.TWA.showAlert('Invoice was closed');
    },
    popupClosed() {
      this.TWA.showAlert('Popup was closed');
    },
    processQRCode(data) {
      this.TWA.closeScanQrPopup();
      this.TWA.showAlert(data.data);
    },
    processClipboard(data) {
      if (data.data === null) {
        this.clipboard = "The Web App has no access to the clipboard"
        return;
      }
      if (data.data == '') {
        this.clipboard = "Clipboard content is not a string"
        return;
      }
      this.clipboard = data.data;
    },
    // End of callbacks
    showQRScanner() {
      const par = {
        text: "Press to scan"
      };
      this.TWA.showScanQrPopup(par);
    },
    changeHeaderColor(event) {
      const color = event.target.value;
      this.TWA.setHeaderColor(color);
    },
    changeBackgroundColor(event) {
      const color = event.target.value;
      this.TWA.setBackgroundColor(color);
    },
    toggleBackButton() {
      if (this.TWA.BackButton.isVisible) {
        this.TWA.BackButton.hide();
      } else {
        this.TWA.BackButton.show();
      }
    },
    toggleMainButton() {
      if (this.TWA.MainButton.isVisible) {
        this.TWA.MainButton.hide();
      } else {
        this.TWA.MainButton.show();
      }
    },
    toggleEnableMainButton() {
      if (!this.TWA.MainButton.isVisible) {
        this.TWA.MainButton.show();
      }
      if (this.TWA.MainButton.isActive) {
        this.TWA.MainButton.disable();
      } else {
        this.TWA.MainButton.enable();
      }
    },
    toggleProgressMainButton() {
      if (!this.TWA.MainButton.isVisible) {
        this.TWA.MainButton.show();
      }
      if (this.TWA.MainButton.isActive) {
        this.TWA.MainButton.hideProgress();
      } else {
        this.TWA.MainButton.showProgress();
      }
    },
    toggleClosingDialog() {
      if (this.TWA.isClosingConfirmationEnabled) {
        this.TWA.disableClosingConfirmation();
      } else {
        this.TWA.enableClosingConfirmation();
      }
    },
    hapticImpact() {
      this.TWA.HapticFeedback.impactOccurred(this.style_selected);
    },
    showPopup(params) {
      const par = {
        title: params.command,
        message:  params.message,
        buttons: [
          {id: "ok", type: "ok", text: "Да"},
          {id: "close", type: "close", text: "Закрыть"}
        ]
      };

      this.TWA.showPopup(par);
    },
    showPopup2() {
      const par = {
        title: "Popup title",
        message: "Popup with cancel and destrucitve buttons",
        buttons: [
          {id: "cancel", type: "cancel", text: "cancel"},
          {id: "destructive", type: "destructive", text: "destructive"}
        ]
      };

      this.TWA.showPopup(par);
    },
  }
}
</script>

<style lang="scss" scoped>
@import '../index.module';

</style>