<template>
  <AdminLayout>
    <div class="container mx-auto p-4">
      <div class="flex">
        <div class="flex-1 mt-4">
          <div class="divider"></div>
        </div>
        <div class="flex-2">
          <h1 class="font-bold text-3xl p-4">รอตรวจ</h1>
        </div>
        <div class="flex-1 mt-4">
          <div class="divider"></div>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th><p class="text-center">รายการที่</p></th>
              <th>ชื่อ</th>
              <th>อาการ</th>
              <th>อาการสำคัญ</th>
              <th class=" text-end">สถานะ</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in patientHistories" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td>{{ item.patient ? item.patient.firstname + ' ' + item.patient.lastname : 'ไม่ระบุ' }}</td>
              <td>{{ item.chiefComplaint }}</td>
              <td>{{ item.symptoms }}</td>
              <td>
                <div class="flex gap-2 justify-end">
                  <button class="btn btn-accent text-white font-thin" @click="handleCheck(item.id)">ตรวจ</button>
                  <button class="btn btn-error text-white font-thin" @click="handleDelete(item.id)">ลบ</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import AdminLayout from '~/layouts/adminLayouts.vue';

const patientHistories = ref([]);

async function fetchPatientHistories() {
  try {
    const response = await fetch('/api/fetch-patient-histories');
    const data = await response.json();
    if (response.ok) {
      patientHistories.value = data.filter(item => item.status === 'close');
    } else {
      console.error('Error fetching data:', data.error);
    }
  } catch (error) {
    console.error('Request failed:', error);
  }
}

async function handleDelete(id) {
  try {
    const response = await fetch('/api/delete-patient-history', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    const data = await response.json();
    if (response.ok) {
      patientHistories.value = patientHistories.value.filter(item => item.id !== id);
    } else {
      console.error('Error deleting data:', data.error);
    }
  } catch (error) {
    console.error('Request failed:', error);
  }
}

function handleCheck(patientHistoryId) {
  console.log('Checking patient history with ID:', patientHistoryId);
}

onMounted(() => {
  fetchPatientHistories();
  console.log(patientHistories)
});
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
}

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
