<template>
  <AdminLayout>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Search Patients by Name</h1>

      <form @submit.prevent="searchPatients">
        <input v-model="query" type="text" placeholder="Enter first name or last name" class="input mb-4" />
        <button type="submit" class="btn">Search</button>
      </form>

      <div v-if="patients.length === 0" class="mt-4">
        <p>ไม่พบข้อมูล</p>
      </div>

      <ul v-else class="mt-4">
        <li v-for="(patient, index) in patients" :key="patient.id">
          <div class="mb-4 mt-5">
            <div class="flex justify-between">
              <h2 class="text-xl font-semibold">ข้อมูลคุณ {{ patient.firstname }}</h2>
              <div>
                <button v-if="showDetails[index]" @click="showDetails[index] = false"
                  class="btn btn-neutral">ถัดไป</button>
                <button v-else @click="showDetails[index] = true" class="btn btn-neutral">ย้อนกลับ</button>
              </div>
            </div>
            <div v-if="showDetails[index]" class="mt-5">
              <div class="grid grid-cols-3 gap-4">
                <div v-for="field in fields" :key="field.model" class="col-span-1">
                  <label :for="field.model" class="block font-medium">{{ field.label }}</label>
                  <input :type="field.type" :id="field.model" :placeholder="field.placeholder"
                    :value="patient[field.model]" class="input input-bordered w-full" disabled />
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
            </div>
          </div>
        </li>
      </ul>

      <ul v-if="showDetails.includes(false)">
        <div class="grid grid-cols-6 gap-3 p-4">
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text text-base">น้ำหนัก(kg)</span>
            </div>
            <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
          </label>

          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text text-base">ส่วนสูง(cm)</span>
            </div>
            <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
          </label>

          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text text-base">อุณหภูมิ</span>
            </div>
            <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
          </label>

          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text text-base">ความดัน</span>
            </div>
            <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
          </label>

          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text text-base">ชีพจร</span>
            </div>
            <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
          </label>

          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text text-base">หายใจ</span>
            </div>
            <input type="text" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
          </label>
        </div>
        <div class="flex">
          <div class="flex-1 pl-4 pr-4">
            <label class="form-control">
              <div class="label">
                <span class="label-text text-base">อาการสำคัญ</span>
              </div>
              <textarea class="textarea textarea-bordered h-24" placeholder=""></textarea>
            </label>
          </div>

          <div class="flex-1">
            2
          </div>
        </div>
      </ul>
    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from '~/layouts/adminLayouts.vue'
import { ref } from 'vue'
import { useFetch } from '#app'

const query = ref('')
const patients = ref([])
const showDetails = ref([])

const fields = [
  { label: 'ชื่อ', model: 'firstname', type: 'text', placeholder: 'ชื่อ' },
  { label: 'นามสกุล', model: 'lastname', type: 'text', placeholder: 'นามสกุล' },
  { label: 'อายุ', model: 'age', type: 'number', placeholder: 'อายุ' },
  { label: 'วันเกิด', model: 'birthdate', type: 'date', placeholder: 'วันเกิด' },
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
</script>

<style scoped>
/* Custom styles */
.input {
  border: 1px solid #ccc;
  padding: 0.5rem;
  width: 100%;
}

.btn {
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.btn:hover {
  background-color: #0056b3;
}
</style>
