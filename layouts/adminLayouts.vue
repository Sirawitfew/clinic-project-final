<script setup>
import { RouterLink } from 'vue-router'


const route = useRoute()

const pageData = [
  {
    name: 'Dashboard',
    route: '/',
  },
  {
    name: 'สินค้า',
    route: '/admin/products',
  },
  {
    name: 'ข้อมูลผู้ป่วย',
    route: '/admin/users',
  },
  {
    name: 'ซักประวัติ',
    route: '/admin/historytaking',
  },
]

const currentPath = ref('')
currentPath.value = route.path
</script>

<template>
  <div class="drawer drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content p-4">
      <slot></slot>
    </div>
    <div class="drawer-side">
      <label for="my-drawer-2" class="drawer-overlay"></label>
      <ul class="menu p-4 w-60 h-full bg-base-200 text-base-content">
        <!-- Sidebar content here -->
        <li class="mb-2 font-semibold text-3xl">
          <div>Admin {{ pageName }}</div>
        </li>
        <li v-for="page in pageData">
          <RouterLink :to="page.route" :class="currentPath === page.route ? 'active' : ''">
            {{ page.name }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>
