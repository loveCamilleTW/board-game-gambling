<template>
  <v-dialog v-model="dialog" max-width="600px">
    <v-card>
      <v-card-title>建立新對局</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <!-- Game Selection -->
          <v-select
            v-model="newMatch.gameType"
            :items="gameTypes"
            label="選擇遊戲"
            required
          ></v-select>

          <!-- Player Selection -->
          <v-select
            v-model="newMatch.players"
            :items="availablePlayers"
            label="選擇玩家"
            multiple
            chips
            required
          ></v-select>

          <!-- Bet End Time -->
          <v-text-field
            v-model="newMatch.betEndTime"
            type="datetime-local"
            label="下注截止時間"
            required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey" @click="closeDialog">取消</v-btn>
        <v-btn color="primary" @click="submitNewMatch">確認</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { mockUsers } from '@/mock/mockData'

const props = defineProps({
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue', 'submit'])

const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const newMatch = ref({
  gameType: null,
  players: [],
  betEndTime: null
})

const gameTypes = [
  { title: '剪刀石頭布', value: 'rps' },
  { title: '比大小', value: 'highlow' },
  // Add more game types as needed
]

const availablePlayers = mockUsers.map(user => ({
  title: user.name,
  value: user.id
}))

const closeDialog = () => {
  dialog.value = false
  resetForm()
}

const submitNewMatch = () => {
  emit('submit', { ...newMatch.value })
  closeDialog()
}

const resetForm = () => {
  newMatch.value = {
    gameType: null,
    players: [],
    betEndTime: null
  }
}
</script> 