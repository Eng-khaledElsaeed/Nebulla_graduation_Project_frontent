<script lang="ts" setup>

import { useStore } from "~/store/useStore";

const { toggleSidebar, isSidebarActive } = useStore()
const userdata =JSON.parse(getCookie('User_info'))


console.log(userdata)
</script>

<template>
  <!--  -->
  <nav class="navbar navbar-expand navbar-light navbar-top">
    <div class="container-fluid">
      <a href="#" class="burger-btn d-block" @click="toggleSidebar">
        <i class="bi bi-justify fs-3"></i>
      </a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
        <div class="dropdown">
          <a href="#" data-bs-toggle="dropdown" aria-expanded="false">
            <div class="user-menu d-flex">
              <div class="user-name text-end me-3">
                <h6 class="mb-0 text-gray-600">{{ userdata.firstName }}</h6>
                <p class="mb-0 text-sm text-gray-600">user</p>
              </div>
              <div class="user-img d-flex align-items-center">
                <div class="avatar avatar-md">
                  <img alt="avatar" src="~assets/images/faces/1.jpg">
                </div>
              </div>
            </div>
          </a>
          <ul class="dropdown-menu dropdown-menu-lg-end" aria-labelledby="dropdownMenuButton">
            <li>
              <h6 class="dropdown-header">Hello, {{ userdata.firstName }}!</h6>
            </li>
            <li><a class="dropdown-item" href="#"><i class="icon-mid bi bi-person me-2"></i> My
                Profile</a></li>
            <li><a class="dropdown-item" href="#"><i class="icon-mid bi bi-gear me-2"></i>
                Settings</a></li>
            <li><a class="dropdown-item" href="#"><i class="icon-mid bi bi-wallet me-2"></i>
                Wallet</a></li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li @click="userLogout"><a class="dropdown-item" href="#"><i class="icon-mid bi bi-box-arrow-left me-2"></i>
              Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
