<template>
  <v-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" max-width="600px">
    <v-card>
      <v-card-title>Confirm Bets</v-card-title>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  game: {
    type: Object,
    required: true,
    validator: (game) => {
      return ['id', 'name', 'state', 'startTime', 'players'].every(
        prop => prop in game
      )
    }
  },
})

const emit = defineEmits(['update:modelValue', 'confirm-bets'])

// State management
const isSubmitting = ref(false)
const bets = ref({})

// Computed property for state color
const stateColor = computed(() => {
  switch (props.game.state) {
    case 'OPEN':
      return 'success'
    case 'CLOSED':
      return 'warning'
    case 'ENDING':
      return 'error'
    default:
      return 'grey'
  }
})

// Methods
const confirmBets = async () => {
  try {
    isSubmitting.value = true
    await emit('confirm-bets', bets.value)
    emit('update:modelValue', false)
  } catch (error) {
    console.error('Error confirming bets:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script> 