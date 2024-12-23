<template>
  <v-dialog :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)" max-width="600px">
    <v-card>
      <v-card-title>{{ match.name }}</v-card-title>
      
      <v-card-text>
        <p class="mb-4">{{ match.description }}</p>
        
        <v-list>
          <v-list-item v-for="player in match.contestants" :key="player.player.id">
            <v-list-item-title>
              {{ player.player.name }} ({{ player.ratio }}x)
            </v-list-item-title>
            <template #append>
              <v-text-field
                v-model="bets[player.id]"
                type="number"
                :placeholder="getCurrentBet(player.id)"
                density="compact"
                hide-details
                class="w-25"
                min="0"
                @input="updateBet(player.id, $event)"
              />
            </template>
          </v-list-item>
        </v-list>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          :loading="isSubmitting"
          @click="confirmBets"
        >
          Confirm Bets
        </v-btn>
      </v-card-actions>
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
  match: {
    type: Object,
    required: true,
  },
  currentBets: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue', 'confirm-bets'])

// State management
const isSubmitting = ref(false)
const bets = ref({})

// Computed property for state color
const stateColor = computed(() => {
  switch (props.match.state) {
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

const getCurrentBet = (playerId) => {
  return props.currentBets[playerId] ? `Current bet: ${props.currentBets[playerId]}` : 'Place your bet'
}

const updateBet = (playerId, value) => {
  if (value && value > 0) {
    bets.value[playerId] = Number(value)
  } else {
    delete bets.value[playerId]
  }
}
</script> 