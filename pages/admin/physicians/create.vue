<template>
  <AdminLayout>
    <h1>หน้ากรอกข้อมูล</h1>
    <form @submit.prevent="submitForm">
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">Firstname</span>
        </div>
        <input type="text" v-model="form.first_name" placeholder="Type here" class="input input-bordered w-full max-w-xs" required />
      </label>

      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">Lastname</span>
        </div>
        <input type="text" v-model="form.last_name" placeholder="Type here" class="input input-bordered w-full max-w-xs" required />
      </label>

      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">Email</span>
        </div>
        <input type="email" v-model="form.email" placeholder="Type here" class="input input-bordered w-full max-w-xs" required />
      </label>

      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">Phone</span>
        </div>
        <input type="tel" v-model="form.phone" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
      </label>

      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text">About</span>
        </div>
        <input type="text" v-model="form.about" placeholder="Type here" class="input input-bordered w-full max-w-xs" />
      </label>

      <div>
        <button type="submit" class="btn btn-accent my-5">ยืนยันข้อมูล</button>
      </div>
    </form>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import AdminLayout from '~/layouts/adminLayouts.vue'
import {usePhysicianStore} from '~/stores/physicianStore'

const physicianStore = usePhysicianStore()

const form = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  about: ''
})

const submitForm = async () => {
  try {
    const userData = { ...form.value }
    await physicianStore.addPhysician(userData)
    alert('Physician created successfully!')
  } catch (error) {
    alert('Failed to create physician')
    console.error(error)
  }
}
</script>
