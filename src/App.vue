
<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref, nextTick } from 'vue';
import UserCard from './entites/user-card/UserCard.vue';  // Ensure the path is correct
import { UsersAPI } from './api';  // Ensure UsersAPI is correctly imported


const isLoading = ref(true);
const users = ref([]);
const pagination = reactive({
  page: 1,
  results: 15,
});
const observer = ref(null);
let intersectionObserver;

onMounted(async () => {
  await fetchUsers();
  await nextTick();

  intersectionObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadMoreUsers();
    }
  }, {
    threshold: 0.1,
  });

  if (observer.value) {
    intersectionObserver.observe(observer.value);
  }
});

onUnmounted(() => {
  if (intersectionObserver && observer.value) {
    intersectionObserver.unobserve(observer.value);
  }
});

async function fetchUsers() {
  try {
    const data = await UsersAPI.getList({
      ...pagination,
      inc: 'gender,name,phone,email,dob,picture',
    });
    users.value.push(...data); 
    isLoading.value = false;
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}

function loadMoreUsers() {
  pagination.page++;
  fetchUsers();
}
</script>
<template>
  <div class="tw-grid tw-gap-6 tw-grid-cols-3 tw-max-w-[80%] tw-mt-[10rem] tw-m-auto">
    <UserCard v-for="(user, index) in users" :key="index" :user="user" />
    <div v-if="!isLoading" ref="observer" class="tw-h-10"></div>
  </div>
</template>