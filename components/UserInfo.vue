<template>
  <v-card class="pa-4">
    <v-row align="center" no-gutters>
      <v-col cols="auto" class="mr-4">
        <v-avatar size="64" color="primary">
          <v-img v-if="avatar" :src="avatar" alt="User Avatar" />
          <span v-else class="text-h5">{{ initials }}</span>
        </v-avatar>
      </v-col>
      
      <v-col>
        <div class="text-h5">{{ name }}</div>
        <div class="d-flex align-center">
          <v-icon color="amber" class="mr-1">mdi-currency-usd</v-icon>
          <span class="text-h6">{{ points }}</span>
          <span class="text-subtitle-1 ml-1">points</span>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  avatar: {
    type: String,
    default: ''
  }
})

const initials = computed(() => {
  return props.name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
})
</script> 