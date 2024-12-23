<template>
  <v-container>
    <v-row>
      <!-- User Info Section -->
      <v-col cols="12">
        <UserInfo 
          :name="userName" 
          :points="userPoints" 
        />
      </v-col>

      <!-- Games List Section -->
      <v-col cols="12">
        <v-tabs v-model="activeTab" class="mb-6">
          <v-tab value="bettor">Bettor View</v-tab>
          <v-tab value="player">Player View</v-tab>
        </v-tabs>

        <v-window v-model="activeTab">
          <!-- Bettor Tab -->
          <v-window-item value="bettor">
            <div class="d-flex align-center mb-4">
              <h2 class="text-h4 mb-4">主持對局</h2>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                @click="createMatch"
                prepend-icon="mdi-plus"
              >
                建立對局
              </v-btn>
            </div>
            <v-row>
              <v-col v-for="match in hostedMatches" :key="match.id" cols="12">
                <HostedMatchCard 
                  :match="match" 
                  @update-match="handleMatchUpdate"
                  @publish-match="handleMatchPublish"
                  @cancel-match="handleMatchCancel"
                  @submit-result="handleMatchResult"
                />
              </v-col>
            </v-row>
            <div class="d-flex align-center mb-4">
              <h2 class="text-h4 mb-4">當前對局</h2>
              <v-spacer></v-spacer>
            </div>
            <v-row>
              <v-col v-for="match in matches" :key="match.id" cols="12">
                <MatchCard :match="match" :view-type="'bettor'" />
              </v-col>
            </v-row>
          </v-window-item>

          <!-- Player Tab -->
          <v-window-item value="player">
            <div class="d-flex align-center mb-4">
              <h2 class="text-h4">參賽紀錄</h2>
            </div>
            
            <!-- Participated Matches -->
            <v-row>
              <v-col v-for="match in matches" :key="match.id" cols="12">
                <MatchCard :match="match" :view-type="'player'" />
              </v-col>
            </v-row>
          </v-window-item>
        </v-window>
      </v-col>
    </v-row>

    <!-- Add the CreateMatchDialog component -->
    <CreateMatchDialog
      v-model="createMatchDialog"
      @submit="handleMatchCreation"
    />
  </v-container>
</template>

<script setup>
  import { mockUsers, mockMatches } from '@/mock/mockData'
  import CreateMatchDialog from '@/components/CreateMatchDialog.vue'
  import HostedMatchCard from '@/components/HostedMatchCard.vue'
  import MatchCard from '@/components/MatchCard.vue'

// Dummy data for now
const user = mockUsers[0]
const userName = computed(() => user.name)
const userPoints = computed(() => user.points)

const matches = ref(mockMatches)
const hostedMatches = ref(mockMatches.filter(match => match.host.id === user.id))
const participatedMatches = ref(mockMatches.filter(match => match.host.id !== user.id))
const activeTab = ref('bettor')

const createMatchDialog = ref(false)

const createMatch = () => {
  createMatchDialog.value = true
}

const handleMatchCreation = (matchData) => {
  console.log('New match details:', matchData)
  // Handle the match creation here (e.g., API call)
}

const handleMatchUpdate = (matchData) => {
  console.log('Update match:', matchData)
  // API call to update match details
}

const handleMatchPublish = (matchId) => {
  console.log('Publish match:', matchId)
  // API call to publish the match
}

const handleMatchCancel = (matchId) => {
  console.log('Cancel match:', matchId)
  // API call to cancel the match
}

const handleMatchResult = (matchId, winnerId) => {
  console.log('Match result:', matchId, winnerId)
  // API call to submit match result
}
</script>

<style lang="scss" scoped>

</style>