<template>
  <div
    class="d-flex align-center justify-center pa-8"
    style="min-height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"
  >
    <v-sheet
      class="mx-auto pa-8"
      max-width="900"
      width="100%"
      elevation="12"
      rounded="xl"
      color="#ffffff"
    >
      <div class="text-center mb-8">
        <v-avatar size="70" color="primary" class="mb-3">
          <v-icon size="35" color="white">mdi-account</v-icon>
        </v-avatar>
        <h1 class="text-h4 font-weight-bold mb-2">Login</h1>
      </div>

      <v-form @submit.prevent="handleLogin">
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="fullName"
              label="Full Name"
              type="text"
              variant="outlined"
              color="primary"
              prepend-inner-icon="mdi-account"
              density="comfortable"
              rounded="lg"
            ></v-text-field>
            
            <v-text-field
              v-model="email"
              label="Password"
              type="email"
              variant="outlined"
              color="primary"
              prepend-inner-icon="mdi-lock-outline"
              density="comfortable"
              rounded="lg"
            ></v-text-field>
            <v-text-field
              v-model="email"
              label="Password"
              type="email"
              variant="outlined"
              color="primary"
              prepend-inner-icon="mdi-email-outline"
              density="comfortable"
              rounded="lg"
            ></v-text-field>
            <v-text-field
              v-model="email"
              label="Password"
              type="email"
              variant="outlined"
              color="primary"
              prepend-inner-icon="mdi-email-outline"
              density="comfortable"
              rounded="lg"
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              variant="outlined"
              color="primary"
              prepend-inner-icon="mdi-lock-outline"
              density="comfortable"
              rounded="lg"
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              variant="outlined"
              color="primary"
              prepend-inner-icon="mdi-lock-outline"
              density="comfortable"
              rounded="lg"
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              variant="outlined"
              color="primary"
              prepend-inner-icon="mdi-lock-outline"
              density="comfortable"
              rounded="lg"
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              variant="outlined"
              color="primary"
              prepend-inner-icon="mdi-lock-outline"
              density="comfortable"
              rounded="lg"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-btn
          type="submit"
          block
          size="x-large"
          color="primary"
          rounded="lg"
          elevation="2"
          class="mt-4"
        >
          Login
        </v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

function handleLogin() {
  console.log('Email:', email.value)
  console.log('Password:', password.value)
}
</script>

<style scoped>
:deep(.v-field) {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

:deep(.v-field:hover) {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
}

:deep(.v-field--focused) {
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.25);
}

:deep(.v-btn) {
  text-transform: none;
  letter-spacing: 0.5px;
  font-weight: 600;
  font-size: 16px;
}
</style>
