
import triNghiem from '@/assets/images/team/Tri-Nghiem.png'
import phongNghiem from '@/assets/images/team/phong-nghiem.png'
import francisPease from '@/assets/images/team/francis.png'
import vincentRosso from '@/assets/images/team/vincent-rosso.png'
import felixUy from '@/assets/images/team/felix-uy.png'
import dongMan from '@/assets/images/team/dong-mp.png'
import hoangNghiem from '@/assets/images/team/hoang-nghiem.png'
import lyVu from '@/assets/images/team/lyvv.png'
import quocHoang from '@/assets/images/team/quoc-hoang.png'
import georgeEgho from '@/assets/images/team/George-Egho.png'

import type { UserType } from '@/types'

/**
 * Team members.
 *
 * These are the company's own photographs, as published on linkosys.com.
 *
 * The backgrounds vary widely — several are head cut-outs placed over stock
 * imagery. They are rendered through a uniform square crop and a neutral
 * greyscale treatment so the grid reads as one editorial set; colour returns on
 * hover. Replacing them with plain headshots on a neutral background remains the
 * highest-value image change on the site (docs/CONTENT-VERIFICATION.md).
 *
 * `photo` is optional per person: anyone without one falls back to a monogram
 * tile, so a partial set of new headshots can be dropped in as it arrives.
 */
export type TeamMember = UserType & { photo?: string }

export const team: TeamMember[] = [
  {
    username: 'Tri Nghiem',
    role: 'President & CEO',
    experience: 'Founded Linkosys in 2016 and leads the company as President and CEO.',
    photo: triNghiem
  },
  {
    username: 'Phong Nghiem',
    role: 'Executive Advisor',
    experience: 'Executive advisor to the Linkosys leadership team.',
    photo: phongNghiem
  },
  {
    username: 'Francis Pease',
    role: 'Executive Advisor',
    experience: 'Retired IT professional with 36 years of experience in people and project management, training, systems administration, and writing code for IBM mainframe environments.',
    photo: francisPease
  },
  {
    username: 'Vincent Rosso',
    role: 'Solution Architect',
    experience: 'Vincent Rosso designs and delivers scalable software solutions, working closely with teams to turn complex requirements into reliable, real-world systems.',
    photo: vincentRosso
  },
  {
    username: 'Felix Uy',
    role: 'Account Executive',
    experience: 'Felix Uy is an Account Executive with experience quickly grasping the requirements in order to advise on Linkosys solutions that are appropriate for customer\'s needs.',
    photo: felixUy
  },
  {
    username: 'Dong Man',
    role: 'CTO',
    experience: '20 years of experience developing structures for successful software projects to build and scale a variety of applications.',
    photo: dongMan
  },
  {
    username: 'Hoang Nghiem',
    role: 'Principal Software Engineer',
    experience: 'With over 18 years of software development experience, Hoang Nghiem has excelled as a Principal Software Engineer at Linkosys. He has successfully led major projects, designing large-scale system architectures and implementing innovative solutions that enhance performance and user experience. As an expert in advanced technologies like AI and cloud computing, Hoang Nghiem also inspires and mentors our teams to achieve exceptional results.',
    photo: hoangNghiem
  },
  {
    username: 'Ly Vu',
    role: 'Web-App Director',
    experience: 'Ly Vu has extensive experience as a web and app manager.',
    photo: lyVu
  },
  {
    username: 'Quoc Hoang',
    role: 'Mobile App Director',
    experience: 'Quoc Hoang is a Linkosys mobile app manager, website designer, and user experience designer. Professional and dedicated, he goes above and beyond to assist brands and businesses in reaching their online potential.',
    photo: quocHoang
  },
  {
    username: 'George Egho',
    role: 'Art Director',
    experience: 'George Egho is a seasoned visual design and creative leadership expert with over 15 years of experience. He excels at leading the artistic vision of projects, ensuring brand consistency and delivering high-quality visuals.',
    photo: georgeEgho
  }
]

