<script setup>
import { useUserStore } from '~/stores/user.ts'
import adminLayouts from '~/layouts/adminLayouts.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const fields = [
  { label: 'ชื่อ', model: 'firstname', type: 'text', placeholder: 'ชื่อ' },
  { label: 'นามสกุล', model: 'lastname', type: 'text', placeholder: 'นามสกุล' },
  { label: 'อายุ', model: 'age', type: 'number', placeholder: 'อายุ' },
  { label: 'วันเกิด', model: 'birthdate', type: 'date', placeholder: 'วันเกิด' },
  { label: 'น้ำหนัก', model: 'weight', type: 'number', step: '0.1', placeholder: 'น้ำหนัก' },
  { label: 'ส่วนสูง', model: 'height', type: 'number', step: '0.1', placeholder: 'ส่วนสูง' },
  { label: 'กรุปเลือด', model: 'blood_type', type: 'text', placeholder: 'กรุปเลือด' },
  { label: 'แพ้ยา', model: 'congenital', type: 'textarea', placeholder: 'กรุณากรอกข้อมูลแพ้ยา' },
  { label: 'โรคประจำตัว', model: 'allergy', type: 'textarea', placeholder: 'กรุณากรอกข้อมูลโรคประจำตัว' },
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

const titleOptions = [
  { value: 'นาย', label: 'นาย' },
  { value: 'นาง', label: 'นาง' },
  { value: 'นางสาว', label: 'นางสาว' },
  { value: 'เด็กชาย', label: 'เด็กชาย' },
  { value: 'เด็กหญิง', label: 'เด็กหญิง' },
  { value: 'อื่น ๆ', label: 'อื่น ๆ' },
]

const newUser = ref({
  firstname: '',
  lastname: '',
  age: null,
  weight: null,
  height: null,
  blood_type: '',
  congenital: '',
  allergy: '',
  birthdate: '',
  phoneNumber: '',
  houseNumber: null,
  village: null,
  subdistrict: '',
  district: '',
  province: '',
  postalCode: null,
  title: '' // เพิ่มฟิลด์นี้
})

const formatPhoneNumber = (value) => {
  let cleaned = ('' + value).replace(/\D/g, '')
  if (cleaned.length <= 3) return cleaned
  if (cleaned.length <= 6) return cleaned.slice(0, 3) + '-' + cleaned.slice(3)
  return cleaned.slice(0, 3) + '-' + cleaned.slice(3, 6) + '-' + cleaned.slice(6, 10)
}

const handlePhoneNumberInput = (event) => {
  const formattedValue = formatPhoneNumber(event.target.value)
  newUser.value.phoneNumber = formattedValue
}

const formatDateForDB = (dateString) => {
  const [year, month, day] = dateString.split('-')
  return new Date(`${year}-${month}-${day}`).toISOString()
}

const createUser = async () => {
  const userData = { ...newUser.value }
  if (userData.birthdate) {
    userData.birthdate = formatDateForDB(userData.birthdate)
  }
  await userStore.addUser(userData)
  router.push('/admin/users')
}
</script>

<template>
  <adminLayouts>
    <div class="flex items-center p-4">
      <div class="w-full">
        <h1 class="text-2xl font-bold mb-4 text-center">เพิ่มข้อมูลผู้ป่วย</h1>

        <form @submit.prevent="createUser">
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text text-base">คำนำหน้า</span>
            </div>
            <select v-model="newUser.title" class="select select-bordered"> <!-- ใช้ newUser.title แทน selectedTitle -->
              <option disabled value="">เลือก</option>
              <option v-for="option in titleOptions" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </label>

          <div class="grid grid-cols-3 gap-4 mt-5">
            <div v-for="(field, index) in fields" :key="index" class="form-control w-full mb-4">
              <span class="label-text text-base">{{ field.label }}</span>
              <template v-if="field.type === 'textarea'">
                <textarea v-model="newUser[field.model]" :placeholder="field.placeholder"
                  class="input input-bordered w-full h-24 placeholder-centered"></textarea>
              </template>
              <template v-else>
                <input v-model="newUser[field.model]" :type="field.type" :placeholder="field.placeholder"
                  @input="field.model === 'phoneNumber' ? handlePhoneNumberInput($event) : $event.target.value"
                  class="input input-bordered w-full" />
              </template>
            </div>
          </div>

          <div class="divider"></div>

          <div class="mt-5">
            <h1 class="text-2xl font-bold mb-4">ที่อยู่</h1>
            <div class="grid grid-cols-3 gap-4 my-3">
              <div v-for="(field, index) in addressFields" :key="index" class="form-control w-full mb-4">
                <span class="label-text text-base">{{ field.label }}</span>
                <input v-model="newUser[field.model]" :type="field.type" :placeholder="field.placeholder"
                  class="input input-bordered w-full" />
              </div>
            </div>
          </div>

          <div class="divider"></div>

          <button type="submit" class="btn btn-primary font-bold w-full text-lg">เพิ่มข้อมูลผู้ป่วย</button>
        </form>
      </div>
    </div>
  </adminLayouts>
</template>

<style scoped>
.placeholder-centered::placeholder {
  text-align: center;
  vertical-align: middle;
}
</style>
