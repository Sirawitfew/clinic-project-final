<template>
  <AdminLayout>
    <div class="flex">
      <div class="flex-1 mt-4 pl-3">
        <div class="divider"></div>
      </div>
      <div class="flex-2">
        <h1 class="font-bold text-3xl p-4">ตรวจรักษา</h1>
      </div>
      <div class="flex-1 mt-4 pr-4">
        <div class="divider"></div>
      </div>
    </div>
    <div class="grid grid-cols-6 gap-2 p-3">
      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text text-base">น้ำหนัก(kg)</span>
        </div>
        <input v-model="weight" type="number" placeholder="" class="input input-bordered w-full max-w-xs" />
      </label>

      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text text-base">ส่วนสูง(cm)</span>
        </div>
        <input v-model="height" type="number" placeholder="" class="input input-bordered w-full max-w-xs" />
      </label>

      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text text-base">อุณหภูมิ</span>
        </div>
        <input v-model="temperature" type="number" placeholder="" class="input input-bordered w-full max-w-xs" />
      </label>

      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text text-base">ความดัน</span>
        </div>
        <input v-model="bloodPressure" type="number" placeholder="" class="input input-bordered w-full max-w-xs" />
      </label>

      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text text-base">ชีพจร</span>
        </div>
        <input v-model="pulse" type="number" placeholder="" class="input input-bordered w-full max-w-xs" />
      </label>

      <label class="form-control w-full max-w-xs">
        <div class="label">
          <span class="label-text text-base">การหายใจ</span>
        </div>
        <input v-model="respiration" type="number" placeholder="" class="input input-bordered w-full max-w-xs" />
      </label>
    </div>

    <div class="flex">
      <div class="flex-1 pl-4 pr-4">
        <label class="form-control">
          <div class="label">
            <span class="label-text text-base">อาการสำคัญ</span>
          </div>
          <textarea v-model="chiefComplaint" class="textarea textarea-bordered h-24" placeholder=""></textarea>
        </label>

        <label class="form-control">
          <div class="label">
            <span class="label-text text-base">อาการ</span>
          </div>
          <textarea v-model="symptoms" class="textarea textarea-bordered h-32" placeholder=""></textarea>
        </label>
      </div>

      <div class="flex-1 pr-3">
        <label class="form-control">
          <div class="label">
            <span class="label-text text-base">ตรวจร่างกาย</span>
          </div>
          <textarea v-model="physicalExam" class="textarea textarea-bordered h-[265px]" placeholder=""></textarea>
        </label>
      </div>
    </div>

    <div class="flex justify-end pt-5 pr-3 pl-3">
      <button class="btn btn-neutral w-full" @click="submitPatientHistory">ส่งตรวจ</button>
    </div>
  </AdminLayout>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from '#app';
import { usePatientHistoryStore } from '~/stores/patientHistory';
import AdminLayout from '~/layouts/adminLayouts.vue'

const store = usePatientHistoryStore();
const route = useRoute();
const router = useRouter();

const weight = ref<number | null>(null);
const height = ref<number | null>(null);
const temperature = ref<number | null>(null);
const bloodPressure = ref<number | null>(null);
const pulse = ref<number | null>(null);
const respiration = ref<number | null>(null);
const chiefComplaint = ref('');
const symptoms = ref('');
const physicalExam = ref('');

const patientId = Number(route.query.id); // Ensure patientId is a number

const submitPatientHistory = async () => {
  try {
    const patientHistoryData = {
      patientId,
      weight: weight.value ?? 0,
      height: height.value ?? 0,
      temperature: temperature.value ?? 0,
      bloodPressure: bloodPressure.value ?? 0,
      pulse: pulse.value ?? 0,
      respiration: respiration.value ?? 0,
      chiefComplaint: chiefComplaint.value,
      symptoms: symptoms.value,
      physicalExam: physicalExam.value,
    };

    await store.submitPatientHistory(patientHistoryData);
    
    // Redirect to a success page or show a success message
    router.push('/admin/waitcheck');
  } catch (error) {
    console.error('An error occurred:', error);
    // Handle error (e.g., show an error message to the user)
  }
};
</script>


