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

      <Form @submit="handleSubmit" :validation-schema="schema">
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
                color="primary"
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
    </v-sheet>
  </div>
</template>

<script setup>
import { Form, Field } from "vee-validate";

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
    if (!value) {
      return "Email is required";
    }
    // Simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email address";
    }
    return true;
  },
  password(value) {
    if (!value) {
      return "Password is required";
    }
    if (value.length < 6) {
      return "Password must be at least 6 characters";
    }
    return true;
  },
  confirmPassword(value) {
    if (!value) {
      return "Please confirm your password";
    }
    // Note: We can't access other field values directly in the schema
    // This will be handled in the submit function
    return true;
  },
  role(value) {
    if (!value) {
      return "Role is required";
    }
    return true;
  },
  phone(value) {
    if (!value) {
      return "Phone number is required";
    }
    // Simple phone validation - at least 10 digits
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    if (!phoneRegex.test(value.replace(/\D/g, ""))) {
      return "Please enter a valid phone number";
    }
    return true;
  },
  address(value) {
    // Address is optional, no validation needed
    return true;
  },
};

const roleOptions = ["Student", "Teacher"];

function handleSubmit(values, { resetForm }) {
  if (values.password !== values.confirmPassword) {
    alert("Passwords do not match!");
    return;
  }
  console.log("Form submitted successfully:", values);
  // Reset form after successful submission
  resetForm();
  // Here you can add your API call or form processing logic
  // Example:
  // await submitForm(values);
}

const formObj = reactive({
  fullName: "Abhay",
  email: "",
  password: "",
  confirmPassword: "",
});
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
