<template>
  <div>
    <v-sheet 
      :class="['pa-4 mb-2 rounded cursor-pointer', cardStateClass]" 
      @click="showDialog = true"
    >
      <div class="d-flex align-center justify-space-between">
        <div class="d-flex align-center">
          <div class="text-h6 mr-4">{{ game.name }}</div>
          <div class="d-flex align-center">
            <v-icon size="small" class="mr-1">mdi-clock-outline</v-icon>
            <span>{{ $dayjs(game.startTime).format('YYYY-MM-DD HH:mm') }}</span>
          </div>
        </div>
        
        <div class="d-flex align-center">
          <v-chip :color="stateColor" class="mr-4">{{ game.state }}</v-chip>
          <v-btn 
            :color="stateColor" 
            :disabled="game.state !== 'OPEN'"
            @click="joinGame"
          >
            {{ actionButtonText }}
          </v-btn>
        </div>
      </div>
    </v-sheet>

    <GameDialog
      :model-value="showDialog"
      :game="game"
      @update:model-value="showDialog = $event"
      @confirm-bets="handleConfirmBets"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  game: {
    type: Object,
    required: true,
    validator: (game) => {
      return ['id', 'name', 'state', 'startTime'].every(
        prop => prop in game
      )
    }
  }
})

const emit = defineEmits(['join'])

const stateColors = {
  OPEN: 'success',
  CLOSED: 'warning',
  ENDING: 'error'
}

const stateColor = computed(() => stateColors[props.game.state] || 'grey')

const cardStateClass = computed(() => ({
  'bg-success-lighten-5': props.game.state === 'OPEN',
  'bg-warning-lighten-5': props.game.state === 'CLOSED',
  'bg-error-lighten-5': props.game.state === 'ENDING'
}))

const actionButtonText = computed(() => {
  switch (props.game.state) {
    case 'OPEN': return 'Place Bet'
    case 'CLOSED': return 'Betting Closed'
    case 'ENDING': return 'Game Ending'
    default: return 'Unavailable'
  }
})

const joinGame = () => {
  emit('join', props.game.id)
}

const showDialog = ref(false)

const handleConfirmBets = (bets) => {
  console.log('Confirmed bets:', bets)
  // Handle the bet confirmation
}
</script>

<style scoped>
.v-sheet {
  transition: background-color 0.3s ease;
}

.cursor-pointer {
  cursor: pointer;
}
</style> 