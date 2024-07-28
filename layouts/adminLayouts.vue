<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const pageData = [
  { name: 'Dashboard', route: '/' },
  { name: 'สินค้า', route: '/admin/products' },
  { name: 'ข้อมูลผู้ป่วย', route: '/admin/users' },
  { name: 'ข้อมูลแพทย์', route: '/admin/physicians' },
  { name: 'รอตรวจ', route: '/admin/waitcheck' }
]

const currentPath = ref(route.path)
const historyTakingCompleted = ref(false)

const updateCurrentPathAndStatus = () => {
  currentPath.value = route.path
  historyTakingCompleted.value = route.path.includes('/admin/checktreat') || route.query.historyComplete === 'true'
}

watch(route, updateCurrentPathAndStatus)

onMounted(updateCurrentPathAndStatus)

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
            <div>Admin</div>
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
                <RouterLink to="/admin/historytaking">ซักประวัติ</RouterLink>
              </li>
              <li v-if="historyTakingCompleted">
                <RouterLink to="/admin/checktreat">ตรวจรักษา</RouterLink>
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
