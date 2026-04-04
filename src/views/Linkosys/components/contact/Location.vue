<template>
  <section class="pt-5">
    <b-container>
      

      <b-row class="row-cols-1 row-cols-lg-2 g-4">
        <b-col>
          <div class=" mb-4 mb-sm-6">
            <h2 class="mb-2">Our Locations</h2>
            <p class="fw-bold">We are where innovation happens.</p>
            <p class="mb-0">
                Headquartered in the U.S., Linkosys bridges global expertise with local understanding — delivering innovative tech solutions wherever your business operates.
            </p>
          </div>
        </b-col>
        <b-col>
          <b-card class="bg-light border">
            <div class="d-flex align-items-center">
              <div class="d-flex">
                
                <div class="mx-3">
                    
                    <b-card-title tag="h6" class="mb-3"
                        >Head Office: California - US</b-card-title
                    >

                    <ul class="list-group list-group-borderless border-0">
                        <li class="d-flex mb-3 icons-center">
                        <BIconGeoAlt class="me-2" />100 Spectrum Center Dr, Irvine, California - USA
                        </li>
                        <li class="d-flex mb-3 icons-center">
                        <BIconHeadset class="me-2" />Call: +1 949 354 4225,
                        </li>
                        <li class="d-flex mb-3 icons-center">
                        <BIconMailbox class="me-2" />
                            Mail: info@linkosys.com.
                        </li>
                    </ul>
                </div>
              </div>
              
            </div>
          </b-card>
        </b-col>
        
      </b-row>
    </b-container>
  </section>
</template>

<script setup lang="ts">
import { BIconGeoAlt, BIconHeadset, BIconMailbox } from 'bootstrap-icons-vue'
</script>
