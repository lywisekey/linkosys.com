<template>
  <b-card no-body class="text-bg-dark">
    <img :src="advImg" class="card-img" alt="adv img" />
    <div class="card-img-overlay">
      <b-card-title tag="h5">Advertisement</b-card-title>
    </div>
  </b-card>

  <div class="mt-5">
    <h6 class="mb-3">Follow us on:</h6>
    <ul class="list-inline mb-0 hstack gap-1">
      <li class="list-inline-item">
        <a class="btn btn-round bg-facebook" href="#">
          <font-awesome-icon :icon="faFacebookF" class="fa-fw lh-base" />
        </a>
      </li>
      <li class="list-inline-item">
        <a class="btn btn-round bg-instagram" href="#">
          <font-awesome-icon :icon="faInstagram" class="fa-fw lh-base" />
        </a>
      </li>
      <li class="list-inline-item">
        <a class="btn btn-round bg-twitter" href="#">
          <font-awesome-icon :icon="faTwitter" class="fa-fw lh-base" />
        </a>
      </li>
      <li class="list-inline-item">
        <a class="btn btn-round bg-linkedin" href="#">
          <font-awesome-icon :icon="faLinkedinIn" class="fa-fw lh-base" />
        </a>
      </li>
      <li class="list-inline-item">
        <a class="btn btn-round bg-youtube" href="#">
          <font-awesome-icon :icon="faYoutube" class="fa-fw lh-base" />
        </a>
      </li>
    </ul>
  </div>

</template>

<script lang="ts" setup>
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTwitter,
  faYoutube
} from '@fortawesome/free-brands-svg-icons'
import advImg from '@/assets/images/blog/adv.jpg'

</script>
