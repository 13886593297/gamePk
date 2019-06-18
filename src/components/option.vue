<template>
  <li @click="doAnswer">
    <img :src="img">
    <span :style='{ width: spanWidth }'>{{ text }}</span>
  </li>
</template>
<script>
export default {
  props: {
    doAnswer: Function,
    img: String,
    text: String,
    spanWidth: String
  }
}
</script>
