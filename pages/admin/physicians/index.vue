<!-- <template>
  <AdminLayout>
    <div class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>About</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(physician, index) in physicians" :key="physician.id">
            <th>{{ index + 1 }}</th>
            <td>{{ physician.first_name }}</td>
            <td>{{ physician.last_name }}</td>
            <td>{{ physician.about }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AdminLayout from '~/layouts/adminLayouts.vue';

const physicians = ref([]);

const fetchPhysicians = async () => {
  try {
    const response = await fetch('/api/physician', {
      method: 'GET', // Specify the GET method
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    physicians.value = await response.json();
  } catch (error) {
    console.error('Error fetching physicians:', error);
  }
}

onMounted(fetchPhysicians);
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th, .table td {
  padding: 8px;
  border: 1px solid #ddd;
  text-align: left;
}

.table th {
  background-color: #f4f4f4;
}
</style> -->

<template>
  <AdminLayout>
    <div class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>About</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(physician, index) in physicians" :key="physician.id">
            <th>{{ index + 1 }}</th>
            <td>{{ physician.first_name }}</td>
            <td>{{ physician.last_name }}</td>
            <td>{{ physician.about }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AdminLayout from '~/layouts/adminLayouts.vue';

</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th, .table td {
  padding: 8px;
  border: 1px solid #ddd;
  text-align: left;
}

.table th {
  background-color: #f4f4f4;
}
</style>
