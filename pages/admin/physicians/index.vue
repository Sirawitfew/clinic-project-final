<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import AdminLayout from '~/layouts/adminLayouts.vue';

import Trash from '~/components/admin/Trash.vue'
import Edit from '~/components/admin/Edit.vue'

const physicians = ref([]);
const router = useRouter();

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

async function deletePhysician(id) {
  try {
    const response = await fetch(`/api/physician/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Error deleting physician: ${response.statusText}`);
    }
    await response.json();
    // Fetch the updated list of physicians
    await fetchPhysicians();
  } catch (error) {
    console.error(error.message);
  }
}

const editPhysician = (id: number) => {
  router.push(`/admin/physicians/edit/${id}`);
};

onMounted(fetchPhysicians);
</script>


<template>
  <AdminLayout>
    <div class=" mx-auto p-4">
      <div class="flex">
        <div class="flex-1 mt-4">
          <div class="divider"></div>
        </div>
        <div class="flex-2">
          <h1 class="font-bold text-3xl p-4">จัดการข้อมูลแพทย์</h1>
        </div>
        <div class="flex-1 mt-4">
          <div class="divider"></div>
        </div>
      </div>

      <div class="mb-5">
        <nuxt-link to="/admin/physicians/create"
          class="btn btn-accent w-full text-white font-light">เพิ่มข้อมูล</nuxt-link>
      </div>

      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>คำนำหน้า</th>
              <th>ชื่อ</th>
              <th>นามสกุล</th>
              <th>แพทย์ทาง</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(physician, index) in physicians" :key="physician.id">
              <th>{{ index + 1 }}</th>
              <td>{{ physician.title }}</td>
              <td>{{ physician.first_name }}</td>
              <td>{{ physician.last_name }}</td>
              <td>{{ physician.about }}</td>
              <td>
                <div class="flex gap-2 justify-center">
                  <button class="btn" @click="deletePhysician(physician.id)">
                    <Trash />
                  </button>
                  <button class="btn btn-accent" @click="editPhysician(physician.id)">
                    <Edit />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </AdminLayout>
</template>

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
