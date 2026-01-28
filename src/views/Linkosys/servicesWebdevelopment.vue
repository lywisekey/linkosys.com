<template>
  <DefaultLayout>
    <Hero
      :breadcrumbs="[
        { label: 'Home', href: '/' },
        { label: 'Services', href: '/services' },
        { label: 'Web Development' }
      ]"
      title="Web Development"
      subtitle="We drive innovation across technologies, meeting industry demands to deliver a comprehensive service spectrum. Employing diverse tools and frameworks in web app development, we consistently offer optimal solutions to our clients."
      :background="bgImage"
    />
    <Services />
    <TechnologiesUse
      title="Technologies We Use"
      description="Our team works with modern frameworks and tools."
      :technologies="[
        { icon: 'services/web/nodejs.png', label: 'Node.js' },
        { icon: 'services/web/react.png', label: 'React.js' },
        { icon: 'services/web/django.png', label: 'Python Django' },
        { icon: 'services/web/mean.png', label: 'Mean Stack' },
        { icon: 'services/web/angular.png', label: 'Angular' },
        { icon: 'services/web/mongo.png', label: 'MongoDB' },
        { icon: 'services/web/graphql.png', label: 'GraphQL' },
        { icon: 'services/web/webpack.png', label: 'Webpack' },
        { icon: 'services/web/html.png', label: 'HTML5/CSS3/JS' }
      ]"
    />
    

   
    <Step />
    
    <ContactForm />
  </DefaultLayout>
</template>


<script lang="ts" setup>
import Hero from './components/services/Hero.vue';
import ContactForm from './components/aboutus/ContactForm.vue';
import DefaultLayout from '@/layouts/Default.vue'
import Step from './components/homepage/Steps.vue';
import Services from './components/services/web/Services.vue';
import TechnologiesUse from './components/services/TechnologiesUse.vue';
import bgImage from '@/assets/images/linkosys/bg/01.jpg'


</script>
