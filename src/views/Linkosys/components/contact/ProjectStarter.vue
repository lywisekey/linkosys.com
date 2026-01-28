<template>
  <section class="contact-steps py-5">
    <div class="text-center mb-5">
      <h2 class="h3 fw-bold">
        <span class="text-danger">Start Your Project</span> with Linkosys Software Today
      </h2>
      <p class="lead">
        We’d love to connect with you and figure out how we can contribute to your success. <br />
        Get started with an efficient, streamlined process:
      </p>
    </div>

    <b-container class="pt-3 step-section">
      <b-row class="text-center mt-5">
        <b-col md="4" class="mb-4">
          <div class="step-card numbered-background">
            <div class="icon-wrapper bg-purple">
              <BIconTelephoneFill />
            </div>
            <h5 class="fw-bold mt-4">Schedule a<br />Consultation Call</h5>
            <p class="text-muted mt-2">
              Discuss your needs and goals and help us learn how we can help you realize them.
            </p>
          </div>
        </b-col>

        <b-col md="4" class="mb-4">
          <div class="step-card numbered-background">
            <div class="icon-wrapper bg-danger">
              <BIconLightbulbFill />
            </div>
            <h5 class="fw-bold mt-4">Explore Solutions<br />and Team Setup</h5>
            <p class="text-muted mt-2">
              Examine solutions, clarify requirements, and onboard the ideal team for your needs.
            </p>
          </div>
        </b-col>

        <b-col md="4" class="mb-4">
          <div class="step-card numbered-background">
            <div class="icon-wrapper bg-orange">
              <BIconRocketTakeoffFill />
            </div>
            <h5 class="fw-bold mt-4">Kick Off and<br />Monitor the Project</h5>
            <p class="text-muted mt-2">
              Our team springs into action, keeping you informed and adjusting when necessary.
            </p>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script setup>
import {
  BIconTelephoneFill,
  BIconLightbulbFill,
  BIconRocketTakeoffFill
} from 'bootstrap-icons-vue'
</script>

<style scoped>
.contact-steps {
  background-color: #fff;
}

.step-section {
  counter-reset: step-counter;
}

.numbered-background {
  counter-increment: step-counter;
  position: relative;
  padding-top: 3rem;
  padding-bottom: 2rem;
}

.numbered-background::before {
  content: counter(step-counter, decimal-leading-zero);
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 9rem;
  font-weight: bold;
  color: #f1f1f1;
  z-index: 0;
  pointer-events: none;
}

.step-card {
  position: relative;
  z-index: 1;
}

.icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  color: #fff;
  font-size: 1.25rem;
  position: relative;
  z-index: 2;
}

.bg-purple {
  background-color: #6f42c1;
}

.bg-danger {
  background-color: #f93822;
}

.bg-orange {
  background-color: #fd7e14;
}
</style>