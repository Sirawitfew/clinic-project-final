<script setup>
import adminLayouts from '~/layouts/adminLayouts.vue';

</script>


<template>
  <adminLayouts>
    <!-- Your dashboard content goes here -->
    <div>
      <div>
        <h2 class="text-2xl font-bold">Dashboard</h2>
      </div>
      <div class="flex gap-4">
        <div class="card bg-base-100 w-96 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">ผู้ป่วยทั้งหมด</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
          </div>
        </div>
        <div class="card bg-base-100 w-96 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">คนใช้บริการวันนี้</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
          </div>
        </div>
        <div class="card bg-base-100 w-96 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">วันนี้มีนัดหมาย</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
          </div>
        </div>
      </div>
    </div>
  </adminLayouts>
</template>


<style></style>