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
        <div class="card bg-[#2584FF] w-96 shadow-xl">
          <div class="card-body">
            <h2 class="card-title text-white font-light text-base">ผู้ป่วยทั้งหมด</h2>
            <p></p>
          </div>
        </div>
        <div class="card bg-[#00AC97] w-96 shadow-xl">
          <div class="card-body">
            <h2 class="card-title text-white font-light text-base">คนใช้บริการวันนี้</h2>
            <p></p>
          </div>
        </div>
        <div class="card bg-[#515262] w-96 shadow-xl">
          <div class="card-body">
            <h2 class="card-title text-white font-light text-base">วันนี้มีนัดหมาย</h2>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  </adminLayouts>
</template>


<style></style>