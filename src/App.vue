<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref, nextTick } from 'vue'
import UserCard from './entites/user-card/UserCard.vue' // Ensure the path is correct for UserCard component
import { UsersAPI } from './api' // Ensure UsersAPI is correctly imported for fetching user data
import { IUser } from './api/users/types' // Import IUser type for user data

// Interface to define the pagination structure
interface Pagination {
  page: number
  results: number
}

// Reactive reference to track loading state
const isLoading = ref<boolean>(true)
// Reactive reference to hold the list of users
const users = ref<IUser[]>([])
// Reactive object for pagination parameters
const pagination = reactive<Pagination>({
  page: 1,
  results: 15,
})
// Reference for the observer element
const observer = ref<HTMLElement | null>(null)
// IntersectionObserver variable to observe scroll events
let intersectionObserver: IntersectionObserver | null = null

// Lifecycle hook to fetch users when the component is mounted
onMounted(async () => {
  await fetchUsers() // Fetch initial users
  await nextTick() // Wait for the DOM to be updated

  // Initialize the IntersectionObserver to detect when the last user card is in view
  intersectionObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        loadMoreUsers() // Load more users when the observer element is visible
      }
    },
    {
      threshold: 0.1, // Trigger when 10% of the observer element is in view
    }
  )

  // Observe the scrollable element
  if (observer.value) {
    intersectionObserver.observe(observer.value)
  }
})

// Lifecycle hook to clean up the observer when the component is unmounted
onUnmounted(() => {
  if (intersectionObserver && observer.value) {
    intersectionObserver.unobserve(observer.value) // Unobserve the element to avoid memory leaks
  }
})

// Function to fetch the user list with pagination and requested fields
async function fetchUsers() {
  try {
    const data = await UsersAPI.getList({
      ...pagination,
      inc: 'gender,name,phone,email,dob,picture', // Include specific fields in the response
    })
    users.value.push(...data) // Add the fetched users to the existing list
    isLoading.value = false // Set loading state to false once data is fetched
  } catch (error) {
    console.error('Error fetching users:', error) // Log any errors during the fetch
  }
}

// Function to load more users by incrementing the page number
function loadMoreUsers() {
  pagination.page++ // Increase the page number
  fetchUsers() // Fetch the next set of users
}
</script>

<template>
  <div class="tw-m-auto tw-mt-[10rem] tw-grid tw-w-[80%] tw-grid-cols-3 tw-gap-6">
    <!-- Loop through users and display each user with the UserCard component -->
    <UserCard v-for="(user, index) in users" :key="index" :user="user" />
    <!-- Observer element for detecting when to load more users -->
    <div v-if="!isLoading" ref="observer" class="tw-h-10"></div>
  </div>
</template>
