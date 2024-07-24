<script setup>
import adminLayouts from '~/layouts/adminLayouts.vue'


</script>

<template>
  <adminLayouts>
    <div class="mx-auto p-4">
      <div class="mb-4">
        <h1 class="text-2xl font-bold">ซักประวัติ</h1>
      </div>
      <div>
        <label class="form-control w-full max-w-xs">
          <div class="label">
            <span class="label-text">What is your name?</span>
          </div>
          <input type="search" placeholder="Type here" class="input input-bordered w-full" />
        </label>
      </div>

      <div class="divider"></div>
    </div>
  </adminLayouts>
</template>

<style></style>