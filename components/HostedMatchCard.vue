<template>
  <div>
    <v-sheet 
      :class="['pa-4 mb-2 rounded cursor-pointer', cardStateClass]" 
      @click="handleCardClick"
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
          >
            {{ actionButtonText }}
          </v-btn>
        </div>
      </div>
    </v-sheet>
    <!-- Edit Dialog -->
    <v-dialog v-model="editDialog" max-width="600px">
      <v-card>
        <v-card-title>編輯比賽</v-card-title>
        <v-card-text>
          <v-form ref="form">
            <!-- Game Selection -->
            <v-select
              v-model="editForm.gameType"
              :items="gameTypes"
              label="選擇遊戲"
              required
            ></v-select>

            <!-- Player Selection -->
            <v-select
              v-model="editForm.players"
              :items="availablePlayers"
              label="選擇玩家"
              multiple
              chips
              required
            ></v-select>

            <!-- Bet End Time -->
            <v-text-field
              v-model="editForm.startTime"
              type="datetime-local"
              label="下注截止時間"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" @click="editDialog = false">取消</v-btn>
          <v-btn color="primary" @click="submitEdit">確認</v-btn>
          <v-btn color="success" @click="publishMatch">發布</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Result Dialog -->
    <v-dialog v-model="resultDialog" max-width="400px">
      <v-card>
        <v-card-title>選擇獲勝者</v-card-title>
        <v-card-text>
          <v-radio-group v-model="selectedWinner">
            <v-radio
              v-for="player in match.contestants"
              :key="player.player.id"
              :label="player.player.name"
              :value="player.player.id"
            ></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" @click="resultDialog = false">取消</v-btn>
          <v-btn color="error" @click="submitDraw">流局</v-btn>
          <v-btn color="primary" @click="submitResult">確認</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import dayjs from 'dayjs'
import { mockUsers } from '@/mock/mockData'

const props = defineProps({
  match: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update-match', 'publish-match', 'cancel-match', 'submit-result'])

const editDialog = ref(false)
const resultDialog = ref(false)
const selectedWinner = ref(null)

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

const getStatusColor = computed(() => {
  if (!props.match.isPublished) return 'grey'
  if (props.match.result) return 'success'
  return 'primary'
})

const getStatusText = computed(() => {
  if (!props.match.isPublished) return '未發布'
  if (props.match.result) return '已結束'
  return '進行中'
})

const editForm = ref({
  gameType: null,
  players: [],
  startTime: null
})

const submitEdit = () => {
  emit('update-match', {
    id: props.match.id,
    gameType: editForm.value.gameType,
    players: editForm.value.players,
    startTime: editForm.value.startTime
  })
  editDialog.value = false
}

const openEditDialog = () => {
  editForm.value = {
    gameType: props.match.gameType || null,
    players: props.match.contestants?.map(c => c.player.id) || [],
    startTime: dayjs(props.match.startTime).format('YYYY-MM-DDTHH:mm')
  }
  editDialog.value = true
}

const openResultDialog = () => {
  resultDialog.value = true
}

const submitResult = () => {
  if (selectedWinner.value) {
    emit('submit-result', props.match.id, selectedWinner.value)
    resultDialog.value = false
    selectedWinner.value = null
  }
}

const gameTypes = [
  { title: '剪刀石頭布', value: 'rps' },
  { title: '比大小', value: 'highlow' },
  // Add more game types as needed
]

const availablePlayers = mockUsers.map(user => ({
  title: user.name,
  value: user.id
}))

const handleCardClick = () => {
  if (props.match.state === 'OPEN') {
    openEditDialog()
  } else if (props.match.state === 'CLOSED') {
    openResultDialog()
  }
}

const publishMatch = () => {
  emit('publish-match', props.match.id)
}

const submitDraw = () => {
  emit('submit-draw', props.match.id)
  resultDialog.value = false
}

</script> 