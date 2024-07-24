<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '~/stores/user.ts'
import adminLayouts from '~/layouts/adminLayouts.vue';

const userStore = useUserStore()

const deleteUser = async (id) => {
  await userStore.deleteUser(id)
}

onMounted(() => {
  userStore.fetchUsers()
})

// Define column headers and corresponding data fields
const columns = [
  { title: 'ชื่อ', field: 'firstname' },
  { title: 'นามสกุล', field: 'lastname' },
  { title: 'อายุ', field: 'age' },
  { title: 'น้ำหนัก', field: 'weight' },
  { title: 'ส่วนสูง', field: 'height' },
  { title: 'กรุปเลือด', field: 'blood_type' },
  { title: 'โรคประจำตัว', field: 'congenital' },
  { title: 'แพ้ยา', field: 'allergy' },
]

const actionsColumn = { title: 'Actions', field: 'actions' }
</script>


<template>
  <adminLayouts>
    <div class="mx-auto p-4">
      <div class="mb-4">
        <h1 class="text-2xl font-bold">จัดการข้อมูลคนไข้</h1>
      </div>

      <div class="mb-4">
        <nuxt-link to="/admin/users/create" class="btn">เพิ่มข้อมูลคนไข้</nuxt-link>
      </div>

      <div class="overflow-x-auto">
        <table class="table w-full text-left border-collapse">
          <thead>
            <tr>
              <th v-for="column in columns" :key="column.field" class="border p-2 text-center">
                {{ column.title }}
              </th>
              <th class="border p-2 text-center">{{ actionsColumn.title }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in userStore.users" :key="user.id">
              <td v-for="column in columns" :key="column.field" class="border p-2">
                {{ user[column.field] }}
              </td>
              <td class="border p-2">
                <div class="flex justify-center gap-3">
                  <nuxt-link :to="`/admin/users/edit/${user.id}`" class="btn btn-primary">
                    <p>Edit</p>
                  </nuxt-link>
                  <button @click="deleteUser(user.id)" class="btn btn-secondary">
                    <p>Delete</p>
                  </button>
                  <button class="btn btn-accent">
                    <p class=" font-light">ดูเพิ่มเติม</p>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </adminLayouts>
</template>

