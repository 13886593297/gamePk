<template>
  <div class="share" v-show="flaunt" @click="closeShare">
    <img src="~img/share.png" alt>
  </div>
</template>
<script>
export default {
  props: {
    flaunt: Number,
    closeShare: Function,
  }
};
</script>
