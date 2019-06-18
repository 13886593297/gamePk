<template>
  <div class="modal" v-show="tip_isShow" @click="closeTip">
    <img :src="img" alt ref="img">
    <div class="unregistered" v-if="dialog_isShow">
      <router-link to="/train"></router-link>
      <router-link to="/"></router-link>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    tip_isShow: Number,
    dialog_isShow: Number,
    closeTip: Function,
    img: String
  }
};
</script>
