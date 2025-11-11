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
        <h1 class="text-h4 font-weight-bold mb-2">Update User</h1>
        <p class="text-body-2 text-medium-emphasis">
          Search by email, then update user details
        </p>
      </div>

      <!-- Success/Error Alert -->
      <v-alert
        v-if="alertMessage"
        :type="alertType"
        variant="tonal"
        closable
        @click:close="alertMessage = ''"
        class="mb-4"
      >
        {{ alertMessage }}
      </v-alert>

      <Form
        @submit="handleSubmit"
        :validation-schema="schema"
        :initial-values="initialValues"
        class="UserForm"
      >
        <!-- Search Email (Read-only, used to find user) -->
        <Field name="searchEmail" v-slot="{ field, errorMessage, handleChange }">
          <v-text-field
            v-bind="field"
            @update:modelValue="handleChange"
            label="Search by Email (to find user)"
            type="email"
            variant="outlined"
            color="secondary"
            prepend-inner-icon="mdi-magnify"
            density="comfortable"
            required
            rounded="lg"
            :error-messages="errorMessage"
            :disabled="isLoading"
            hint="Enter the email of the user you want to update"
            persistent-hint
            class="mb-4"
          />
        </Field>

        <v-divider class="my-6"></v-divider>

        <!-- Updatable Fields -->
        <div class="text-subtitle-2 text-medium-emphasis mb-3">
          Update these fields:
        </div>

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
            :disabled="isLoading"
          />
        </Field>

        <Field name="phone" v-slot="{ field, errorMessage, handleChange }">
          <v-text-field
            v-bind="field"
            @update:modelValue="handleChange"
            label="Phone (10 digits)"
            type="tel"
            variant="outlined"
            color="primary"
            prepend-inner-icon="mdi-phone"
            density="comfortable"
            rounded="lg"
            :error-messages="errorMessage"
            :disabled="isLoading"
          />
        </Field>

        <Field name="address" v-slot="{ field, errorMessage, handleChange }">
          <v-textarea
            v-bind="field"
            @update:modelValue="handleChange"
            label="Address"
            variant="outlined"
            color="primary"
            prepend-inner-icon="mdi-map-marker"
            density="comfortable"
            rounded="lg"
            rows="3"
            :error-messages="errorMessage"
            :disabled="isLoading"
          />
        </Field>

        <Field name="role" v-slot="{ field, errorMessage, handleChange }">
          <v-select
            v-bind="field"
            @update:modelValue="handleChange"
            label="Role"
            :items="['Student', 'Teacher']"
            variant="outlined"
            color="primary"
            prepend-inner-icon="mdi-account-group"
            density="comfortable"
            rounded="lg"
            :error-messages="errorMessage"
            :disabled="isLoading"
          />
        </Field>

        <v-btn
          type="submit"
          block
          size="x-large"
          color="primary"
          rounded="lg"
          elevation="2"
          class="mt-4"
          :loading="isLoading"
          :disabled="isLoading"
        >
          Update User Profile
        </v-btn>
      </Form>
    </v-sheet>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Form, Field } from "vee-validate";
import api from "@/api/axios";

const isLoading = ref(false);
const alertMessage = ref("");
const alertType = ref("success");

const initialValues = {
  searchEmail: "Bhai1@gmail.com", // Email to search for user
  fullName: "Tanish Updated",
  phone: "9876543210",
  address: "123 Main Street, Pune",
  role: "Student",
};

const schema = {
  searchEmail(value) {
    if (!value) return "Email is required to find user";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Enter a valid email address";
    return true;
  },
  fullName(value) {
    if (!value) return "Full name is required";
    if (value.length < 3) return "Full name must be at least 3 characters";
    return true;
  },
  phone(value) {
    if (value && !/^\d{10}$/.test(value)) {
      return "Phone number must be exactly 10 digits";
    }
    return true;
  },
  address(value) {
    if (value && value.length > 100) {
      return "Address cannot exceed 100 characters";
    }
    return true;
  },
  role(value) {
    if (value && !['Student', 'Teacher'].includes(value)) {
      return "Role must be either Student or Teacher";
    }
    return true;
  },
};

const handleSubmit = async (values) => {
  isLoading.value = true;
  alertMessage.value = "";
  
  try {
    const data = await fetchData(values);
    if (data) {
      console.log("User updated:", data);
      alertType.value = "success";
      alertMessage.value = "User profile updated successfully!";
    } else {
      alertType.value = "warning";
      alertMessage.value = "User not found with that email";
    }
  } catch (error) {
    console.error("Error updating user:", error);
    alertType.value = "error";
    alertMessage.value = error.response?.data?.message || "Failed to update user";
  } finally {
    isLoading.value = false;
  }
};

function getUserId(searchEmail, users) {
  // Find user by email only (email is unique)
  const user = users.find((u) => u.email === searchEmail);

  if (!user) {
    console.warn("User not found with email:", searchEmail);
    return null;
  }

  console.log("Matched user:", user);
  return user._id.toString();
}

async function fetchData(values) {
  try {
    // Fetch all users
    console.log("Fetching users...");
    const usersResponse = await api.get("/");
    const users = usersResponse.data;

    // Find the user by search email
    const userId = getUserId(values.searchEmail, users);
    if (!userId) {
      console.log("User not found, aborting update");
      return null;
    }

    // Prepare update payload (only allowed fields)
    const updatePayload = {
      fullName: values.fullName,
    };

    // Add optional fields only if they have values
    if (values.phone) updatePayload.phone = values.phone;
    if (values.address) updatePayload.address = values.address;
    if (values.role) updatePayload.role = values.role;

    console.log("Sending PATCH request to:", `/${userId}`);
    console.log("Update payload:", updatePayload);

    // Send PATCH request
    const response = await api.patch(`/${userId}`, updatePayload);
    console.log("Update successful:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error in fetchData:", err);
    console.error("Response data:", err.response?.data);
    console.error("Response status:", err.response?.status);
    throw err;
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