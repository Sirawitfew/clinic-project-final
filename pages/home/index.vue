<template>
  <userLayouts>
    <div>
      <Hero />
    </div>

    <!-- Number Content -->
    <div
      class=" p-4 mt-5 rounded-lg h-92 bg-[url('https://img.freepik.com/free-photo/blurred-common-room_1203-106.jpg?t=st=1719203002~exp=1719206602~hmac=0d3b39bf7dc429fbc3c52dedccad6682e0a7c893d9ce5712359b20d2bcf397f9&w=826')]">
      <div class="flex">
        <div class="flex-1">
          <h1 class="text-7xl font-bold mx-3 text-white">Promotion</h1>
        </div>

        <!-- Countdown -->
        <Countdown></Countdown>

      </div>
      <ImageSlider></ImageSlider>

    </div>
  </userLayouts>
</template>

<script lang="ts" setup>
import userLayouts from '../../layouts/userLayouts.vue';

import Hero from '../../components/user/Hero.vue';
import ImageSlider from '../../components/user/ImageSlider.vue';
import Countdown from '../../components/user/Countdown.vue';
</script>

<style></style>