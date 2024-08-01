<template>
  <div class=" container mx-auto">
    <div
      class="navbar bg-base-100 mb-5 bg-[#FAFAFA] rounded-full my-3 shadow-lg sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
      <div class="flex-1 mx-3">
        <a class="btn btn-ghost text-xl rounded-full">AIRPORT CLINIC</a>
      </div>

      <div class="mx-5 menu">
        <ul class="flex items-center">
          <li class="mx-4 sm:mx-2">
            <div >หน้าแรก</div>
          </li>
          <li class="mx-4 sm:mx-2">
            <div >โปรโมชั่น</div>
          </li>
          <li class="mx-4 sm:mx-2">
            <div>สินค้า</div>
          </li>
          <li class="mx-4 sm:mx-2">
            <div>บริการ</div>
          </li>
          <li class="mx-4 sm:mx-2">
            <div>บทความ</div>
          </li>
          <li class="mx-4 sm:mx-2">
            <div>เกี่ยวกับเรา</div>
          </li>
        </ul>
      </div>

      <div class="flex-none">
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <div class="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span class="badge badge-sm indicator-item">8</span>
            </div>
          </div>
          <div tabindex="0" class="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
            <div class="card-body">
              <span class="text-lg font-bold">8 Items</span>
              <span class="text-info">Subtotal: $999</span>
              <div class="card-actions">
                <button class="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>
        <div class="dropdown dropdown-end">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li>
              <a class="justify-between">
                Profile
                <span class="badge">New</span>
              </a>
            </li>
            <li><a>Settings</a></li>
            <li><a>Logout</a></li>
          </ul>
        </div>
      </div>
    </div>

    <slot></slot>

    <div class="hero mt-5 rounded-lg mb-5" style="
        background-image: url(https://img.freepik.com/premium-photo/interior-house-apartment-dining-3d-architecture-inside-hall-white-floor-generative-ai_163305-172769.jpg?w=826);
        ">
      <div class="hero-overlay rounded-lg"></div>
      <div class="hero-content text-center text-neutral-content">
        <div class="max-w-md">
          <h1 class="mb-5 text-5xl font-bold text-white">ติดต่อเรา</h1>
          <p class="mb-5">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <!-- Social-->
          <div class="flex space-x-2 justify-center opacity-75">
            <!-- Instagram -->
            <button>
              INS
            </button>
            <!-- Twitter -->
            <button>
              CALL
            </button>
            <!-- Facebook -->
            <button>
              Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>
// Add any script logic here
</script>
