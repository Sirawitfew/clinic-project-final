<template>
  <AdminLayout>
    <div>
      <h1>วินิจฉัย</h1>
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">วินิจฉัย 1</span>
        </div>
        <textarea v-model="diagnosis" placeholder="วินิจฉัย" class="textarea textarea-bordered textarea-xs w-full h-40"></textarea>
      </label>
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">แผนการรักษา</span>
        </div>
        <input v-model="treatmentPlan" type="text" placeholder="Type here" class="input input-bordered w-full" />
      </label>
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">อื่นๆ (notes)</span>
        </div>
        <input v-model="notes" type="text" placeholder="Type here" class="input input-bordered w-full" />
      </label>
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">เลือกแพทย์ผู้รักษา</span>
        </div>
        <select v-model="physicianId" class="select select-bordered">
          <option disabled value="" selected>-- เลือกแพทย์ --</option>
          <option v-for="physician in physicians" :key="physician.id" :value="physician.id">
            {{ physician.name }}
          </option>
        </select>
      </label>
      <div>
        <button @click="submitDiagnosis" class="btn btn-accent mt-5 w-full">ส่งวินิจฉัย</button>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDiagnosisStore } from '~/stores/useDiagnosisStore'
import AdminLayout from '~/layouts/adminLayouts.vue';

const route = useRoute()
const router = useRouter()
const store = useDiagnosisStore()

const diagnosis = ref('')
const treatmentPlan = ref('')
const notes = ref('')
const physicianId = ref<number | null>(null)
const physicians = store.physicians

// Extract patientId and patientHistoryId from the query
const patientId = Number(route.query.patientId)
const patientHistoryId = Number(route.query.patientHistoryId)

onMounted(async () => {
  console.log(patientId)
  console.log(patientHistoryId)
  await store.fetchPhysicians()
})

const submitDiagnosis = async () => {
  try {
    if (!diagnosis.value || !treatmentPlan.value || !physicianId.value) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน')
      return
    }

    await store.createDiagnosis({
      patientId,
      patientHistoryId,
      diagnosis: diagnosis.value,
      treatmentPlan: treatmentPlan.value,
      notes: notes.value,
      physicianId: physicianId.value,
    })

    alert('บันทึกวินิจฉัยสำเร็จ')
    router.push('/admin/historytaking')
  } catch (error) {
    console.error('Failed to submit diagnosis:', error)
    alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล')
  }
}
</script>
