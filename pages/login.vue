<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card class="pa-4">
          <v-card-title class="text-center flex-column">
            <v-icon size="64" class="mb-4">mdi-cards</v-icon>
            <div class="text-h4 mb-2">Board Game Gambling</div>
          </v-card-title>
          
          <v-card-text class="text-center">
            <client-only>
              <GoogleLogin :callback="callback" />
            </client-only>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const callback = async (response) => {
  console.log('Google response:', response)
  // Here you would typically:
  // 1. Send the token to your backend
  // 2. Get user data
  // 3. Handle authentication state
  // 4. Redirect to home page
}
</script>
