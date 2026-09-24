<template>
  <DefaultLayout>
    <PageHero
      art="secure"
      eyebrow="Legal"
      title="Privacy Policy"
      lead="What this website collects, why, who it goes to, and what you can ask us to do about it."
      :crumbs="[{ label: 'Privacy Policy' }]"
    />

    <section class="lk-section">
      <b-container>
        <b-row>
          <b-col lg="8">
            <p class="text-body-secondary small mb-5">Last updated: {{ LAST_UPDATED }}</p>

            <div class="lk-prose">
              <h2>Who we are</h2>
              <p>
                This website is operated by Linkosys Inc., a California-incorporated technology
                consulting and engineering company. In this policy, “we”, “us” and “our” mean
                Linkosys Inc.
              </p>
              <p>
                Our postal address is {{ contact.address }}. You can reach us at
                <a :href="contact.emailHref">{{ contact.email }}</a> or
                {{ contact.phone }}.
              </p>

              <h2>Information you give us</h2>
              <p>
                The contact form on this site is the only place where we ask you for information
                about yourself. It collects:
              </p>
              <ul>
                <li>your name;</li>
                <li>your work email address;</li>
                <li>your phone number, which is optional;</li>
                <li>your company or agency;</li>
                <li>the area of interest you select; and</li>
                <li>the description of your project or requirement that you write.</li>
              </ul>
              <p>
                The form also asks you to answer a simple arithmetic question. This is only there
                to filter automated submissions. The answer is checked and discarded, and it is
                not stored or sent anywhere.
              </p>
              <p>
                When you submit the form, the contents are sent to us as an email at
                <a :href="contact.emailHref">{{ contact.email }}</a>, with your email
                address set as the reply address so we can respond to you. The website itself does
                not keep a copy: there is no database of submissions behind this site, and no
                account for you to create.
              </p>

              <h2>Information collected automatically</h2>
              <p>
                Like any website, this one is served by a web host that records requests. Those
                records include your IP address, the address of the page you requested, your
                browser and operating system, and the time of the request. They exist so the site
                can be operated, kept available and protected from abuse.
              </p>
              <p>
                We also use Google Analytics 4 to understand how the site is used — which pages
                people read, how they arrived, and roughly where in the world they are, which
                Google derives from the IP address. We use this in aggregate, to decide what to
                write and what to fix. We do not use it to try to identify you, and we do not run
                advertising or advertising trackers on this site.
              </p>

              <h2>Cookies</h2>
              <p>
                Google Analytics sets two cookies in your browser,
                <code>_ga</code> and <code>_ga_L81Y5QMP4Y</code>. They distinguish one visitor from
                another and one visit from the next, so that ten pages read by one person are not
                counted as ten people. They are the only cookies this site sets.
              </p>
              <p>
                You can refuse or delete them in your browser settings, and the site will continue
                to work normally. Google also publishes a browser add-on that turns Google
                Analytics off across every site that uses it, at
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  rel="noopener noreferrer"
                  target="_blank"
                  >tools.google.com/dlpage/gaoptout</a
                >.
              </p>

              <h2>Who else handles this information</h2>
              <p>
                We do not sell your personal information, and we do not share it with anyone for
                their own marketing. It reaches the following companies only because they provide
                the infrastructure this site runs on:
              </p>
              <dl class="lk-processors my-4">
                <template v-for="row in processors" :key="row.name">
                  <dt>{{ row.name }}</dt>
                  <dd>
                    {{ row.role }}.
                    <span class="d-block">Receives: {{ row.data }}.</span>
                  </dd>
                </template>
              </dl>
              <p>
                We may also disclose information where we are required to by law, or where it is
                necessary to establish or defend a legal claim.
              </p>

              <h2>How long we keep it</h2>
              <p>
                We keep what you send through the contact form for as long as we need it to answer
                you and to keep a record of our correspondence, and then we delete it. If you ask
                us to delete an enquiry sooner, we will, unless we are required to keep it.
              </p>
              <p>
                Server logs and analytics data are kept for the retention periods set by the
                providers listed above.
              </p>

              <h2>How we protect it</h2>
              <p>
                The site is served over HTTPS, so what you send through the contact form is
                encrypted in transit. Access to the mailbox that receives enquiries is limited to
                the people at Linkosys who need it to respond. No method of transmission or storage
                is completely secure, and we do not claim otherwise.
              </p>

              <h2>Your rights</h2>
              <p>
                You can ask us what personal information we hold about you, ask us to correct it,
                or ask us to delete it. Write to
                <a :href="contact.emailHref">{{ contact.email }}</a> and tell us what
                you would like. We will not treat you differently for asking.
              </p>
              <p>
                If you are a California resident, state law gives you rights to know what personal
                information is collected about you, to have it deleted, to have it corrected, and
                not to be discriminated against for exercising those rights. We do not sell or
                share personal information as those terms are used in California law.
              </p>
              <p>
                If you are in the European Economic Area or the United Kingdom, you also have the
                right to object to or restrict certain processing, the right to receive a copy of
                the information you gave us in a portable form, and the right to complain to your
                national data protection authority. Where we rely on your consent, you can withdraw
                it at any time.
              </p>
              <p>
                Information collected through this site is processed in the United States, where we
                and our providers operate.
              </p>

              <h2>Children</h2>
              <p>
                This site is aimed at organizations, not at children. We do not knowingly collect
                personal information from anyone under 13. If you believe a child has sent us
                information, write to us and we will delete it.
              </p>

              <h2>Other websites</h2>
              <p>
                This site links to websites we do not control. This policy does not apply to them,
                and we are not responsible for how they handle your information.
              </p>

              <h2>Changes to this policy</h2>
              <p>
                If we change how this site handles personal information, we will update this page
                and change the date at the top of it.
              </p>

              <h2>Contact us</h2>
              <p>
                Questions about this policy, or about information we hold, go to
                <a :href="contact.emailHref">{{ contact.email }}</a>, or to Linkosys
                Inc., {{ contact.address }}.
              </p>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </DefaultLayout>
</template>

<script lang="ts" setup>
import DefaultLayout from '@/layouts/Default.vue'
import PageHero from '@/components/linkosys/PageHero.vue'
import { contact } from '@/content/company'

/**
 * Shown at the top of the policy. Change it whenever the policy text changes —
 * a privacy policy that has silently moved on is worse than one that is dated.
 */
const LAST_UPDATED = 'September 24, 2026'

/**
 * The companies that see data because of how this site is built, taken from what
 * the site actually does rather than from a template: the contact form posts to
 * an API route that sends mail through Resend, the pages and that route run on
 * Vercel, the analytics tag is Google's, and one script is served from Cloudflare's
 * public CDN. Nothing else third-party loads on any page.
 */
const processors = [
  {
    name: 'Vercel',
    role: 'Hosts this website and runs the contact form endpoint',
    data: 'request logs, and the contents of a contact form submission as it is processed'
  },
  {
    name: 'Resend',
    role: 'Delivers contact form submissions to us as email',
    data: 'everything you enter in the contact form'
  },
  {
    name: 'Google',
    role: 'Google Analytics 4, for site usage statistics',
    data: 'pages viewed, referrer, device and browser, IP address'
  },
  {
    name: 'Cloudflare',
    role: 'Serves one open-source script from its public CDN',
    data: 'IP address and browser, from the request for that file'
  }
]
</script>
