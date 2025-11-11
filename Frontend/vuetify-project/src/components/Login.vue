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
      >
        <v-row>
          <v-col cols="12" md="6">
            <Field
              name="fullName"
              v-slot="{ field, errorMessage, handleChange }"
            >
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

            <Field
              name="password"
              v-slot="{ field, errorMessage, handleChange }"
            >
              <v-text-field
                v-bind="field"
                @update:modelValue="handleChange"
                label="Password"
                type="password"
                variant="outlined"
                color="primary"
                prepend-inner-icon="mdi-lock-outline"
                density="comfortable"
                required
                rounded="lg"
                :error-messages="errorMessage"
              ></v-text-field>
            </Field>

            <Field
              name="confirmPassword"
              v-slot="{ field, errorMessage, handleChange }"
            >
              <v-text-field
                v-bind="field"
                @update:modelValue="handleChange"
                label="Confirm Password"
                type="password"
                variant="outlined"
                color="primary"
                prepend-inner-icon="mdi-lock-check-outline"
                density="comfortable"
                required
                rounded="lg"
                :error-messages="errorMessage"
              ></v-text-field>
            </Field>
          </v-col>

          <v-col cols="12" md="6">
            <Field name="role" v-slot="{ field, errorMessage, handleChange }">
              <v-select
                v-bind="field"
                @update:modelValue="handleChange"
                label="Role"
                :items="roleOptions"
                variant="outlined"
                required
                color="primary"
                value="Student"
                prepend-inner-icon="mdi-account-tie"
                density="comfortable"
                rounded="lg"
                :error-messages="errorMessage"
              ></v-select>
            </Field>

            <Field name="phone" v-slot="{ field, errorMessage, handleChange }">
              <v-text-field
                v-bind="field"
                @update:modelValue="handleChange"
                label="Phone Number"
                type="tel"
                required
                variant="outlined"
                color="primary"
                prepend-inner-icon="mdi-phone"
                density="comfortable"
                rounded="lg"
                :error-messages="errorMessage"
              ></v-text-field>
            </Field>

            <Field
              name="address"
              v-slot="{ field, errorMessage, handleChange }"
            >
              <v-textarea
                v-bind="field"
                @update:modelValue="handleChange"
                label="Address (Optional)"
                variant="outlined"
                color="primary"
                prepend-inner-icon="mdi-home"
                density="comfortable"
                rounded="lg"
                rows="3"
                auto-grow
                :error-messages="errorMessage"
              ></v-textarea>
            </Field>
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
          Register
        </v-btn>
      </Form>
      <Loading v-if="isLoading" />
    </v-sheet>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Form, Field } from "vee-validate";
import { useRouter } from "vue-router";
import api from "@/api/axios";
import Loading from "@/components/Loading.vue";

const router = useRouter();
const isLoading = ref(false);

const initialValues = {
  fullName: "Tanish2",
  email: "Bhai1@gmail.com",
  password: "123456",
  confirmPassword: "123456",
  role: "Student",
  phone: "1234567890",
  address: "Pune",
  userId: 1,
};

const schema = {
  fullName(value) {
    if (!value) return "Full name is required";
    if (value.length < 3) return "Full name must be at least 3 characters";
    return true;
  },
  email(value) {
    if (!value) return "Email is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Enter a valid email address";
    return true;
  },
  password(value) {
    if (!value) return "Password is required";
    if (value.length < 6) return "Password must be at least 6 characters";
    return true;
  },
  confirmPassword(value) {
    if (!value) return "Please confirm your password";
    return true;
  },
  role(value) {
    if (!value) return "Role is required";
    return true;
  },
  phone(value) {
    if (!value) return "Phone number is required";
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    if (value.length > 10 || value.length < 9)
      return "Please enter valid Phone number";
    if (!phoneRegex.test(value.replace(/\D/g, "")))
      return "Enter a valid phone number";
    return true;
  },
  address(value) {
    if (!value) return "Please enter valid address";
    if (value.length > 100) return "This field can take max 100 characters";
    return true;
  },
};

const roleOptions = ["Student", "Teacher"];

async function handleSubmit(values, { resetForm }) {
  if (values.password !== values.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  isLoading.value = true; // show loader
  try {
    const response = await api.post("/api/users", values);
    const user = response.data;

    alert(user.message);
    router.push("/update-user");
  } catch (err) {
    // console.error();
    alert(err.response.data.message);
  } finally {
    isLoading.value = false; // hide loader
    resetForm();
  }
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
