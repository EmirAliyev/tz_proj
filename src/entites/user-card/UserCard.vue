
<script setup lang="ts">
import type { IUser } from '../../api/users/types'; // Import the IUser type for user data

// Define props, expecting a user object of type IUser
const { user } = defineProps<{ user: IUser }>(); 
</script>

<template>
  <div class="tw-mb-6 tw-rounded-lg tw-shadow-lg tw-p-6 tw-bg-color-light-cream">
    <div class="tw-flex tw-flex-col tw-items-center tw-mb-4">
      <img :src="user.picture.medium" alt="Avatar" class="tw-w-[10rem] tw-h-[10rem] tw-rounded-full tw-shadow-md tw-mb-4">
      <h2 class="tw-text-2xl tw-font-semibold tw-text-center">
        {{ user.name.title }} {{ user.name.first }} {{ user.name.last }}
      </h2>
      <p class="tw-text-gray-500 tw-text-center">{{ user.gender }}</p>
    </div>
    <div class="tw-space-y-2">
      <p><span class="tw-font-semibold">📧 Email:</span> {{ user.email }}</p>
      <p><span class="tw-font-semibold">📞 Телефон:</span> {{ user.phone }}</p>
      <p><span class="tw-font-semibold">🎂 Дата рождения:</span> {{ new Date(user.dob.date).toLocaleDateString() }}</p>
      <p><span class="tw-font-semibold">🎉 Возраст:</span> {{ user.dob.age }} лет</p>
    </div>
  </div>
</template>


