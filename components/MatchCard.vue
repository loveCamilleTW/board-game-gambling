<template>
  <div>
    <v-sheet 
      :class="['pa-4 mb-2 rounded cursor-pointer', cardStateClass]" 
      @click="showDialog = true"
    >
      <div class="d-flex align-center justify-space-between">
        <div class="d-flex align-center">
          <div class="text-h6 mr-4">{{ match.name }}</div>
          <div class="d-flex align-center">
            <v-icon size="small" class="mr-1">mdi-clock-outline</v-icon>
            <span>{{ $dayjs(match.startTime).format('YYYY-MM-DD HH:mm') }}</span>
          </div>
        </div>
        
        <div class="d-flex align-center">
          <v-chip :color="stateColor" class="mr-4">{{ match.state }}</v-chip>
          <v-btn 
            :color="stateColor" 
            :disabled="match.state !== 'OPEN'"
            @click="joinGame"
          >
            {{ actionButtonText }}
          </v-btn>
        </div>
      </div>
    </v-sheet>

    <MatchDialog
      :model-value="showDialog"
      :match="match"
      @update:model-value="showDialog = $event"
      @confirm-bets="handleConfirmBets"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  match: {
    type: Object,
    required: true,
  }
})

const emit = defineEmits(['join'])

const stateColors = {
  OPEN: 'success',
  CLOSED: 'warning',
  ENDING: 'error'
}

const stateColor = computed(() => stateColors[props.match.state] || 'grey')

const cardStateClass = computed(() => ({
  'bg-success-lighten-5': props.match.state === 'OPEN',
  'bg-warning-lighten-5': props.match.state === 'CLOSED',
  'bg-error-lighten-5': props.match.state === 'ENDING'
}))

const actionButtonText = computed(() => {
  switch (props.match.state) {
    case 'OPEN': return 'Place Bet'
    case 'CLOSED': return 'Betting Closed'
    case 'ENDING': return 'Game Ending'
    default: return 'Unavailable'
  }
})

const joinGame = () => {
  emit('join', props.match.id)
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