<template>
  <AdminLayout>
    <div class=" mx-auto bg-white h-full">
      <div class="mb-4">
        <div class="flex">
          <div class="flex-1 mt-4">
            <div class="divider"></div>
          </div>
          <div class="flex-2">
            <h1 class="font-bold text-3xl p-4">ตรวจเสร็จแล้ว</h1>
          </div>
          <div class="flex-1 mt-4">
            <div class="divider"></div>
          </div>
        </div>
      </div>

      <div class="overflow-x-auto p-4">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th>ID</th>
              <th>รายชื่อคนไข้</th>
              <th>แพทย์ผู้รักษา</th>
              <th>วินิจฉัย</th>
              <th>การรักษา</th>
              <th>อื่นๆ</th>
              <th>เสร็จสิ้นวันที่</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <!-- Display each diagnosis record -->
            <tr v-for="diagnosis in diagnoses" :key="diagnosis.id">
              <th>{{ diagnosis.id }}</th>
              <td>{{ getPatientName(diagnosis.patient_id) }}</td>
              <td>{{ getPhysicianName(diagnosis.physician_id) }}</td>
              <td>{{ diagnosis.diagnosis }}</td>
              <td>{{ diagnosis.treatment_plan }}</td>
              <td>{{ diagnosis.notes }}</td>
              <td>{{ formatDate(diagnosis.createdAt) }}</td>
              <td>
                <div class="flex justify-center gap-2">
                  <button @click="deleteDiagnosis(diagnosis.id)" class="btn btn-accent text-white font-light">ลบ</button>
                  <button class="btn btn-accent text-white font-light">แก้ไข</button>
                  <button class="btn btn-accent text-white font-light">ชำระเงิน</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </AdminLayout>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import AdminLayout from '~/layouts/adminLayouts.vue';

const diagnoses = ref([]);
const patients = ref([]);
const physicians = ref([]);

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const fetchDiagnoses = async () => {
  try {
    const response = await fetch('/api/diagnosis', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch diagnoses');
    }

    diagnoses.value = await response.json();
    console.log('Fetched diagnoses:', diagnoses.value);
  } catch (error) {
    console.error('Error fetching diagnoses:', error);
  }
};

const fetchPatients = async () => {
  try {
    const response = await fetch('/api/user', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch patients');
    }

    patients.value = await response.json();
    console.log('Fetched patients:', patients.value);
  } catch (error) {
    console.error('Error fetching patients:', error);
  }
};

const fetchPhysicians = async () => {
  try {
    const response = await fetch('/api/physician', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch physicians');
    }

    physicians.value = await response.json();
    console.log('Fetched physicians:', physicians.value);
  } catch (error) {
    console.error('Error fetching physicians:', error);
  }
};

const getPatientName = (id: number) => {
  const patient = patients.value.find(patient => patient.id === id);
  return patient ? `${patient.firstname} ${patient.lastname}` : 'Unknown Patient';
};

const getPhysicianName = (id: number) => {
  const physician = physicians.value.find(physician => physician.id === id);
  return physician ? `${physician.first_name} ${physician.last_name}` : 'Unknown Physician';
};

const deleteDiagnosis = async (id: number) => {
  try {
    const response = await fetch('/api/diagnosis', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete diagnosis');
    }

    diagnoses.value = diagnoses.value.filter((diagnosis) => diagnosis.id !== id);
    console.log('Diagnosis deleted successfully');
  } catch (error) {
    console.error('Error deleting diagnosis:', error);
  }
};

onMounted(() => {
  fetchDiagnoses();
  fetchPatients();
  fetchPhysicians();
});

onMounted(() => {
  console.log(patients.value)
})

</script>

<style scoped>
.table th,
.table td {
  padding: 8px;
  border: 1px solid #ddd;
  text-align: left;
}

.table th {
  background-color: #f4f4f4;
  font-size: small;
}
</style>
