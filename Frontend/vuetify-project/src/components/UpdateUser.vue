<template>
  <div
    class="d-flex align-center justify-center pa-8"
    style="
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    "
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
        <h1 class="text-h4 font-weight-bold mb-2">Register</h1>
      </div>

      <Form
        @submit="handleSubmit"
        :validation-schema="schema"
        :initial-values="initialValues"
        class="UserForm"
      >
        <Field name="fullName" v-slot="{ field, errorMessage, handleChange }">
          <v-text-field
            v-bind="field"
            @update:modelValue="handleChange"
            label="Full Name"
            required
            type="text"
            variant="outlined"
            color="primary"
            prepend-inner-icon="mdi-account"
            density="comfortable"
            rounded="lg"
            :error-messages="errorMessage"
          ></v-text-field>
        </Field>

        <Field name="email" v-slot="{ field, errorMessage, handleChange }">
          <v-text-field
            v-bind="field"
            @update:modelValue="handleChange"
            label="Email"
            type="email"
            variant="outlined"
            color="primary"
            prepend-inner-icon="mdi-email-outline"
            density="comfortable"
            required
            rounded="lg"
            :error-messages="errorMessage"
          ></v-text-field>
        </Field>

        <v-btn
          type="submit"
          block
          size="x-large"
          color="primary"
          rounded="lg"
          elevation="2"
          class="mt-4"
        >
          Update Existing User profile
        </v-btn>
      </Form>
    </v-sheet>
  </div>
</template>

<script setup>
import api from "@/api/axios";
import { Form, Field } from "vee-validate";
import { useRouter } from "vue-router";
import Loading from "./Loading.vue";

const isLoading = ref(false);
const router = useRouter();
const initialValues = {
  fullName: "Abhay Dhaneshwar12",
  email: "12abhay@gmail.com",
};

const schema = {
  fullName(value) {
    if (!value) {
      return "Full name is required";
    }
    if (value.length < 3) {
      return "Full name must be at least 3 characters";
    }
    return true;
  },
  email(value) {
    if (!value) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Enter a valid email address";
    return true;
  },
};

const handleSubmit = async (values) => {
  // console.log(values);
  isLoading.value = true;
  try {
    const data = await fetchData(values);
    console.log(data)
    if (data.some((user) => user.fullName === values.fullName)) {
      const userObj = data.find((user) => user.fullName === values.fullName);
      console.log(userObj);
      // console.log(true)
    } else {
      alert("User does not exist");
    }

    // console.log(data);
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

async function fetchData(values) {
  try {
    const response = await api.get("/", values);
    return response.data;
  } catch (err) {
    return err;
  }
}
</script>

<style scoped>
:deep(.v-field) {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  background-color: red;
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
