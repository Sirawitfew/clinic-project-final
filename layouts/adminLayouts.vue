<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import ToggleTheme from '~/components/ToggleTheme.vue';


const route = useRoute()
const router = useRouter()

const pageData = [
  { name: 'Dashboard', route: '/admin', icon: 'tachometer-alt' },
  { name: 'ข้อมูลผู้ป่วย', route: '/admin/users', icon: 'users' },
  { name: 'ข้อมูลแพทย์', route: '/admin/physicians', icon: 'user-md' },
  { name: 'ข้อมูลสินค้า', route: '/admin/products', icon: 'box' },
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
  <div class="h-14">
    <div class="p-3 border-b-2 w-full flex h-16 items-center">
      <RouterLink to="/admin" class="flex-1 flex items-center">
        <img class="w-[130px] h-12 mx-2" src="https://img2.pic.in.th/pic/-removebg-preview344b007cb6dec167.png" alt="logo">
      </RouterLink>
      <div class="flex-1 flex justify-end">
        <div class="mt-1 mr-3">
          <ToggleTheme></ToggleTheme>
        </div>
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 h-10 rounded-full overflow-hidden">
              <img alt="User Avatar" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box shadow-lg mt-3 w-52 p-2">
            <li><a class="justify-between">โปรไฟล์</a></li>
            <li><a>ตั้งค่า</a></li>
            <li><a>ออกจากระบบ</a></li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div class="drawer drawer-open">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content bg-zinc-50 mt-2">
      <div class=" mx-auto max-w-full pr-10 pl-10">
        <slot></slot>
      </div>
    </div>
    <div class="drawer-side">
      <label for="my-drawer-2" class="drawer-overlay"></label>
      <ul class="menu p-4 w-72 h-full text-base-content border-r-2 my-2 ">
        <li v-for="page in pageData" :key="page.route">
          <RouterLink :to="page.route" :class="currentPath.value === page.route ? 'active' : ''"
            class="flex items-center mt-2 p-2 rounded hover:bg-gray-100 transition-colors duration-200">
            <font-awesome-icon :icon="['fa', page.icon]" class="text-zinc-500 text-xl mr-2"></font-awesome-icon>
            <p class="text-base text-zinc-600 ">{{ page.name }} </p>
          </RouterLink>
        </li>

        <li>
          <details open>
            <summary class="flex items-center p-2 rounded hover:bg-gray-100 transition-colors duration-200">
              <font-awesome-icon icon="search" class="text-zinc-500 text-xl mr-2"></font-awesome-icon>
              <p class="text-base text-zinc-600">ตรวจ</p>
            </summary>
            <ul class="pl-4">
              <li>
                <RouterLink to="/admin/waitcheck" class="text-base text-zinc-600 hover:bg-gray-100 block p-2 rounded transition-colors duration-200">รอตรวจ</RouterLink>
              </li>
              <li>
                <RouterLink to="/admin/checksuccess" class="text-base text-zinc-600 hover:bg-gray-100 block p-2 rounded transition-colors duration-200">ตรวจเสร็จแล้ว</RouterLink>
              </li>
            </ul>
          </details>
        </li>

        <li>
          <details open>
            <summary class="flex items-center p-2 rounded hover:bg-gray-100 transition-colors duration-200">
              <font-awesome-icon icon="heartbeat" class="text-zinc-500 text-xl mr-2"></font-awesome-icon>
              <p class="text-base text-zinc-600">รักษา</p>
            </summary>
            <ul class="pl-4">
              <li>
                <RouterLink to="/admin/historytaking" class="text-base text-zinc-600 hover:bg-gray-100 block p-2 rounded transition-colors duration-200">ซักประวัติ</RouterLink>
              </li>
              <li v-if="historyTakingCompleted">
                <RouterLink to="/admin/checktreat" class="text-base text-zinc-600 hover:bg-gray-100 block p-2 rounded transition-colors duration-200">ตรวจรักษา</RouterLink>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
* {
  font-family: 'Kanit', sans-serif;
}

.active {
  font-weight: bold;
  color: blue;
}

.menu li a {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
}

.menu li i {
  margin-right: 8px;
}

.drawer-side {
  overflow: hidden; /* หรือ overflow: auto; */
  height: 100vh; /* กำหนดความสูงให้เต็มจอ */
}

.dropdown-content {
  z-index: 1000;
}
</style>
