<template>
  <v-container>
    <v-row>
      <!-- User Info Section -->
      <v-col cols="12">
        <UserInfo :name="userName" :points="userPoints" />
      </v-col>

      <!-- Games List Section -->
      <v-col cols="12">
        <h2 class="text-h4 mb-4">Available Games</h2>
        <v-row>
          <v-col v-for="game in games" :key="game.id" cols="12">
            <GameCard :game="game" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { mockUsers, mockGames } from '@/mock/mockData'
// Dummy data for now
const userName = ref(mockUsers[0].name)
const userPoints = ref(mockUsers[0].points)

const games = ref(mockGames)
</script>

<style lang="scss" scoped>

</style>