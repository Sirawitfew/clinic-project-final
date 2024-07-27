<script setup>
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '~/stores/user.ts'
import adminLayouts from '~/layouts/adminLayouts.vue'

const userStore = useUserStore()
const selectedUser = ref(null)

const deleteUser = async (id) => {
  await userStore.deleteUser(id)
}

const columns = [
  { title: 'ชื่อ', field: 'firstname' },
  { title: 'นามสกุล', field: 'lastname' },
  { title: 'อายุ', field: 'age' },
  { title: 'น้ำหนัก', field: 'weight' },
  { title: 'ส่วนสูง', field: 'height' },
  { title: 'กรุปเลือด', field: 'blood_type' },
  { title: 'แพ้ยา', field: 'allergy' },
  { title: 'โรคประจำตัว', field: 'congenital' },
]

const formFields = [
  { label: 'อายุ', field: 'age', type: 'number' },
  { label: 'น้ำหนัก', field: 'weight', type: 'number' },
  { label: 'ส่วนสูง', field: 'height', type: 'number' },
  { label: 'กรุปเลือด', field: 'blood_type', type: 'text' },
  { label: 'แพ้ยา', field: 'allergy', type: 'text' },
  { label: 'โรคประจำตัว', field: 'congenital', type: 'text' },
]

const formAddress = [
  { label: 'บ้านเลขที่', field: 'houseNumber', type: 'text' },
  { label: 'หมู่', field: 'village', type: 'text' },
  { label: 'ตำบล', field: 'subdistrict', type: 'text' },
  { label: 'อำเภอ', field: 'district', type: 'text' },
  { label: 'จังหวัด', field: 'province', type: 'text' },
  { label: 'รหัสไปรษณีย์', field: 'postalCode', type: 'text' },
]

const actionsColumn = { title: 'Actions', field: 'actions' }

const openModal = (user) => {
  selectedUser.value = { ...user }
}

const closeModal = () => {
  selectedUser.value = null
}

const fullName = computed({
  get() {
    if (!selectedUser.value) return ''
    return `${selectedUser.value.firstname || ''} ${selectedUser.value.lastname || ''}`.trim()
  },
  set(value) {
    if (!selectedUser.value) return
    const [firstname, ...lastname] = value.split(' ')
    selectedUser.value.firstname = firstname || ''
    selectedUser.value.lastname = lastname.join(' ') || ''
  }
})

onMounted(() => {
  userStore.fetchUsers()
  console.log(userStore.fetchUsers())
})
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
                <p class="text-sm">{{ column.title }}</p>
              </th>
              <th class="border p-2 text-center">{{ actionsColumn.title }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in userStore.users" :key="user.id">
              <td v-for="column in columns" :key="column.field" class="border p-2">
                <p class="text-sm">{{ user[column.field] }}</p>
              </td>
              <td class="border p-2">
                <div class="flex justify-center gap-3">
                  <nuxt-link :to="`/admin/users/edit/${user.id}`" class="btn btn-primary">
                    <p class="font-light">แก้ไข</p>
                  </nuxt-link>
                  <button @click="deleteUser(user.id)" class="btn btn-secondary">
                    <p class="font-light">ลบ</p>
                  </button>
                  <button @click="openModal(user)" class="btn btn-accent font-light">ดูเพิ่มเติม</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Overlay -->
    <div v-if="selectedUser" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg relative w-[75%] max-h-[70%] flex flex-col overflow-hidden">
        <!-- Header with close button -->
        <div class="p-4 flex justify-between items-center bg-orange-300 sticky top-0 z-10">
          <h3 class="text-2xl font-bold text-white">ข้อมูลเพิ่มเติม</h3>
          <button @click="closeModal" class="btn btn-sm btn-circle btn-ghost">✕</button>
        </div>

        <!-- Scrollable Content Area -->
        <div class="overflow-y-auto">
          <div class="flex mt-5">
            <div class="flex-1 p-8">
              <div class="avatar flex justify-center">
                <div class="w-48 rounded">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
              <div class="bg-zinc-100 h-24 mt-5">
                asd
              </div>
            </div>

            <div class="flex-1 justify-start">
              <div v-for="field in formFields" :key="field.field" class="flex-1">
                <label class="form-control w-full mt-5">
                  <div class="label">
                    <span class="label-text">{{ field.label }}</span>
                  </div>
                  <input v-model="selectedUser[field.field]" :type="field.type" :placeholder="`กรอก ${field.label}`"
                    class="input input-bordered w-[80%]" />
                </label>
              </div>
            </div>

            <div class="flex-1 justify-start">
              <div>
                <h1>ชื่อ : {{ selectedUser.firstname }} {{ selectedUser.lastname }}</h1>
              </div>
              <div class="mt-5">
                <h1>อายุ : {{ selectedUser.age }}</h1>
              </div>
            </div>
          </div>

          <div class="divider"></div>

          <div class=" ">
            <div class="p-4 font-bold text-2xl">
              <h1>ประวัติการรักษา</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </adminLayouts>
</template>
