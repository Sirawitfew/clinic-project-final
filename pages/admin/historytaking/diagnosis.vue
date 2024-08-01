  <template>
    <AdminLayout>
      <div>
        <h1>วินิจฉัย</h1>
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">วินิจฉัย 1</span>
          </div>
          <textarea v-model="diagnosis" placeholder="วินิจฉัย"
            class="textarea textarea-bordered textarea-xs w-full h-40"></textarea>
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
              {{ physician.title }} {{ physician.first_name }} {{ physician.last_name }}
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
const physicians = ref([]);

const fetchPhysicians = async () => {
  try {
    const response = await fetch('/api/physician', {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    physicians.value = await response.json();
  } catch (error) {
    console.error('Error fetching physicians:', error);
  }
};

const patientId = Number(route.query.patientId)
const patientHistoryId = Number(route.query.patientHistoryId)

onMounted(async () => {
  console.log(patientId)
  console.log(patientHistoryId)
  console.log(physicians)
  await fetchPhysicians()
})

const submitDiagnosis = async () => {
  if (!diagnosis.value || !treatmentPlan.value || physicianId.value === null) {
    alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    return;
  }
  try {
    const response = await fetch('/api/diagnosis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        patient_id: patientId,
        patientHistoryId,
        diagnosis: diagnosis.value,
        treatment_plan: treatmentPlan.value,
        notes: notes.value,
        physician_id: physicianId.value,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to submit diagnosis');
    }

    const updateResponse = await fetch(`/api/update-patient-history-status/${patientHistoryId}`, {
      method: 'PATCH',
    });

    if (!updateResponse.ok) {
      throw new Error('Failed to update patient history status');
    }

    alert('บันทึกวินิจฉัยสำเร็จ');
    router.push('/admin/checksuccess');
  } catch (error) {
    console.error('Failed to submit diagnosis:', error);
    alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
  }
};


</script>
