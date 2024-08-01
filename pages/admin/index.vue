<script setup>
import adminLayouts from '~/layouts/adminLayouts.vue';
</script>

<template>
  <adminLayouts>
    <div>
      <div>
        <h2 class="text-2xl font-bold">Dashboard</h2>
      </div>
      <div class="flex gap-4 mt-5">
        <div class="card bg-[#2584FF] w-96 shadow-xl h-44 transform-transition">
          <div class="card-body">
            <h2 class="card-title text-white font-light text-xl">ผู้ป่วยทั้งหมด</h2>
            <p></p>
          </div>
        </div>
        <div class="card bg-[#00AC97] w-96 shadow-xl transform-transition">
          <div class="card-body">
            <h2 class="card-title text-white font-light text-xl">คนใช้บริการวันนี้</h2>
            <p></p>
          </div>
        </div>
        <div class="card bg-[#515262] w-96 shadow-xl transform-transition">
          <div class="card-body">
            <h2 class="card-title text-white font-light text-xl">วันนี้มีนัดหมาย</h2>
            <p></p>
          </div>
        </div>
      </div>
    </div>
  </adminLayouts>
</template>

<style scoped>
.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

</style>
