
import type { UserType } from '@/types'

/**
 * Team members.
 *
 * `photo` is intentionally unset. The portraits previously used here were
 * head cut-outs composited onto unrelated stock backgrounds — city skylines,
 * neon network art, a world map — which undercut the positioning on the page
 * a buyer visits to judge who they would be working with.
 *
 * Set `photo` to an imported image once Linkosys supplies plain headshots on a
 * neutral background; TeamAvatar renders the photograph in place of the
 * monogram automatically. See docs/CONTENT-VERIFICATION.md.
 */
export type TeamMember = UserType & { photo?: string }

export const team: TeamMember[] = [
  {
    username: 'Tri Nghiem',
    role: 'President & CEO',
    experience: 'Founded Linkosys in 2016 and leads the company as President and CEO.'
  },
  {
    username: 'Phong Nghiem',
    role: 'Executive Advisor',
    experience: 'Executive advisor to the Linkosys leadership team.'
  },
  {
    username: 'Francis Pease',
    role: 'Executive Advisor',
    experience: 'Retired IT professional with 36 years of experience in people and project management, training, systems administration, and writing code for IBM mainframe environments.'
  },
  {
    username: 'Vincent Rosso',
    role: 'Solution Architect',
    experience: 'Vincent Rosso designs and delivers scalable software solutions, working closely with teams to turn complex requirements into reliable, real-world systems.'
  },
  {
    username: 'Felix Uy',
    role: 'Account Executive',
    experience: 'Felix Uy is an Account Executive with experience quickly grasping the requirements in order to advise on Linkosys solutions that are appropriate for customer\'s needs.'
  },
  {
    username: 'Dong Man',
    role: 'CTO',
    experience: '20 years of experience developing structures for successful software projects to build and scale a variety of applications.'
  },
  {
    username: 'Hoang Nghiem',
    role: 'Principal Software Engineer',
    experience: 'With over 18 years of software development experience, Hoang Nghiem has excelled as a Principal Software Engineer at Linkosys. He has successfully led major projects, designing large-scale system architectures and implementing innovative solutions that enhance performance and user experience. As an expert in advanced technologies like AI and cloud computing, Hoang Nghiem also inspires and mentors our teams to achieve exceptional results.'
  },
  {
    username: 'Ly Vu',
    role: 'Web-App Director',
    experience: 'Ly Vu has extensive experience as a web and app manager.'
  },
  {
    username: 'Quoc Hoang',
    role: 'Mobile App Director',
    experience: 'Quoc Hoang is a Linkosys mobile app manager, website designer, and user experience designer. Professional and dedicated, he goes above and beyond to assist brands and businesses in reaching their online potential.'
  },
  {
    username: 'George Egho',
    role: 'Art Director',
    experience: 'George Egho is a seasoned visual design and creative leadership expert with over 15 years of experience. He excels at leading the artistic vision of projects, ensuring brand consistency and delivering high-quality visuals.'
  }
]

