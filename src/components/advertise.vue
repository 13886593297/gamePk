<template>
  <div class="ad" v-if="ad_isShow">
    <img :src="adInfo_img">
    <span v-text="adInfo_value"></span>
  </div>
</template>
<script>
export default {
  props: {
    ad_isShow: Number,
    adInfo_img: String,
    adInfo_value: String
  }
};
</script>
