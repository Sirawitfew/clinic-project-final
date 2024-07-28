<template>
  <AdminLayout>
    <div class="container mx-auto p-4">
      <div class="flex">
        <div class="flex-1 mt-4 pl-3">
          <div class="divider"></div>
        </div>
        <div class="flex-2">
          <h1 class="font-bold text-3xl p-4">ซักประวัติ</h1>
        </div>
        <div class="flex-1 mt-4 pr-4">
          <div class="divider"></div>
        </div>
      </div>
      <form @submit.prevent="searchPatients">
        <input v-model="query" type="text" placeholder="ใส่ชื่อเพื่อค้นหา" class="input mb-4 w-full border-black" />
        <button type="submit" class="btn btn-accent w-full text-white">Search</button>
      </form>

      <div v-if="patients.length === 0" class="mt-4">
        <p>ไม่พบข้อมูล</p>
      </div>

      <ul v-else class="mt-4">
        <li v-for="(patient, index) in patients" :key="patient.id">
          <div class="mb-4 mt-5">
            <div class="flex justify-between">
              <h2 class="text-xl font-semibold">ข้อมูลคุณ {{ patient.firstname }} {{ patient.lastname }}</h2>
            </div>
            <div v-if="showDetails[index]" class="mt-5">
              <div class="grid grid-cols-3 gap-4">
                <div v-for="field in fields" :key="field.model" class="col-span-1">
                  <label :for="field.model" class="block font-medium">{{ field.label }}</label>
                  <input :type="field.type" :id="field.model" :placeholder="field.placeholder"
                    :value="field.model === 'birthdate' ? formatDate(patient[field.model]) : patient[field.model]"
                    class="input input-bordered w-full" disabled />
                </div>
              </div>
              <h2 class="text-xl font-semibold mt-5">ที่อยู่</h2>
              <div class="grid grid-cols-3 gap-4 mt-5">
                <div v-for="field in addressFields" :key="field.model" class="col-span-1">
                  <label :for="field.model" class="block font-medium">{{ field.label }}</label>
                  <input :type="field.type" :id="field.model" :placeholder="field.placeholder"
                    :value="patient[field.model]" class="input input-bordered w-full" disabled />
                </div>
              </div>
              <div>
                <button class="btn btn-neutral mt-5 w-full" @click="goToWaitCheck(patient.id)">ซักประวัติ</button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from '~/layouts/adminLayouts.vue'
import { ref, watch } from 'vue'
import { useFetch, useRouter } from '#app'

const query = ref('')
const patients = ref([])
const showDetails = ref([])
const router = useRouter()

const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

const fields = [
  { label: 'ชื่อ', model: 'firstname', type: 'text', placeholder: 'ชื่อ' },
  { label: 'นามสกุล', model: 'lastname', type: 'text', placeholder: 'นามสกุล' },
  { label: 'อายุ', model: 'age', type: 'number', placeholder: 'อายุ' },
  { label: 'วันเกิด', model: 'birthdate', type: 'text', placeholder: 'วันเกิด', format: formatDate },
  { label: 'น้ำหนัก', model: 'weight', type: 'number', step: '0.1', placeholder: 'น้ำหนัก' },
  { label: 'ส่วนสูง', model: 'height', type: 'number', step: '0.1', placeholder: 'ส่วนสูง' },
  { label: 'กรุปเลือด', model: 'blood_type', type: 'text', placeholder: 'กรุปเลือด' },
  { label: 'แพ้ยา', model: 'allergy', type: 'textarea', placeholder: 'กรุณากรอกข้อมูลแพ้ยา' },
  { label: 'โรคประจำตัว', model: 'congenital', type: 'textarea', placeholder: 'กรุณากรอกข้อมูลโรคประจำตัว' },
  { label: 'เบอร์โทรศัพท์', model: 'phoneNumber', type: 'text', placeholder: 'เบอร์โทรศัพท์' },
]

const addressFields = [
  { label: 'บ้านเลขที่', model: 'houseNumber', type: 'number', placeholder: 'บ้านเลขที่' },
  { label: 'หมู่', model: 'village', type: 'number', placeholder: 'หมู่' },
  { label: 'ตำบล', model: 'subdistrict', type: 'text', placeholder: 'ตำบล' },
  { label: 'อำเภอ', model: 'district', type: 'text', placeholder: 'อำเภอ' },
  { label: 'จังหวัด', model: 'province', type: 'text', placeholder: 'จังหวัด' },
  { label: 'รหัสไปรษณีย์', model: 'postalCode', type: 'number', placeholder: 'รหัสไปรษณีย์' },
]

const searchPatients = async () => {
  if (query.value.trim() === '') {
    patients.value = []
    showDetails.value = []
    return
  }

  const { data } = await useFetch(`/api/searchPatients?query=${query.value}`)
  patients.value = data.value || []
  showDetails.value = patients.value.map(() => true)
}

const debounce = (func, delay) => {
  let timeout
  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), delay)
  }
}

const debouncedSearchPatients = debounce(searchPatients, 300)
watch(query, (newQuery) => {
  debouncedSearchPatients()
})

const goToWaitCheck = (patientId) => {
  router.push(`/admin/historytaking/checktreat?id=${patientId}&historyComplete=true`)
}
</script>
