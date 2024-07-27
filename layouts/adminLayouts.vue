<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

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
    name: 'รอตรวจ',
    route: '/admin/waitcheck'
  },
]

const currentPath = ref(route.path)

const shouldShowCheckTreat = computed(() => {
  // ตรวจสอบว่าคุณอยู่ในหน้า "ซักประวัติ" (History Taking) หรือไม่
  return route.path === '/admin/historytaking'
})

onMounted(() => {
  currentPath.value = route.path
})

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
        <li class="mb-2 font-semibold text-3xl">
          <div class="flex justify-center">
            <div>
              Admin
            </div>
          </div>
        </li>
        <li v-for="page in pageData" :key="page.route">
          <RouterLink :to="page.route" :class="currentPath.value === page.route ? 'active' : ''">
            {{ page.name }}
          </RouterLink>
        </li>
        <li>
          <details open>
            <summary>รักษา</summary>
            <ul>
              <li>
                <RouterLink to="/admin/historytaking">
                  ซักประวัติ
                </RouterLink>
              </li>
              <li v-if="shouldShowCheckTreat">
                <RouterLink to="/admin/checktreat">
                  ตรวจรักษา
                </RouterLink>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.active {
  font-weight: bold;
  color: blue;
}
</style>
