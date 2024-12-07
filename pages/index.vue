<template>
  <div>
    <h1>Home</h1>
    <v-btn @click="handleClick">Click me</v-btn>
  </div>
</template>

<script setup>
const handleClick = () => {
  console.log('clicked')
}
</script>

<style lang="scss" scoped>

</style>