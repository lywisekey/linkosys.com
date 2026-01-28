import blogImg1 from '@/assets/images/blog/wired/Plaintext-Great-Substack-Reckoning-Business--1250144830.webp'
import blogImg2 from '@/assets/images/blog/wired/elon-no-computer-biz-2217126145.webp'
import blogImg3 from '@/assets/images/blog/wired/Plaintext-Tech-Bros-Join-Trump-Army-Business.webp'
import blogImg4 from '@/assets/images/blog/wired/Uncanny-Valley-AI-Agents-Business-637867558.webp'

import { BIconBullseye, BIconHeadset, BIconRocketTakeoff, BIconSearch } from 'bootstrap-icons-vue'
import type { BlogType } from '@/types'

export async function fetchRssItems(limit = 50) {
const res = await fetch("https://cors-anywhere.herokuapp.com/https://techcrunch.com/feed/");  const text = await res.text();
  const parser = new DOMParser();
  const xml = parser.parseFromString(text, "application/xml");
  const items = Array.from(xml.querySelectorAll("item")).slice(0, limit);

  return items.map((item) => ({
    title: item.querySelector("title")?.textContent ?? "",
    link: item.querySelector("link")?.textContent ?? "",
    description: item.querySelector("description")?.textContent ?? "",
    date: item.querySelector("pubDate")?.textContent ?? "",
    image: item.querySelector("media\\:content")?.getAttribute("url") || ""
  }));
}

export const blogs: BlogType[] = [
  {
    title: "Substack Is Having a Moment—Again. But Time Is Running Out",
    category: "Business",
    publishedAt: {
      date: 27,
      month: "Jun",
      year: 2025
    },
    publishedBy: {
      avatar: "https://www.wired.com/assets/icons/default-author-avatar.png",
      firstName: "Steven",
      lastName: "Levy"
    },
    image: blogImg1,
    link: "https://www.wired.com/story/substack-is-having-a-moment-again-but-time-is-running-out/"
  },
  {
    title: "Elon Musk’s Lawyers Claim He ‘Does Not Use a Computer’",
    category: "Business",
    publishedAt: {
      date: 23,
      month: "Jun",
      year: 2025
    },
    publishedBy: {
      avatar: "https://www.wired.com/assets/icons/default-author-avatar.png",
      firstName: "Wired",
      lastName: "Business"
    },
    image: blogImg2,
    link: "https://www.wired.com/story/elon-musk-computer-sam-altman/"
  },
  {
    title: "What Big Tech’s Band of Execs Will Do in the Army",
    category: "Business",
    publishedAt: {
      date: 28,
      month: "Jun",
      year: 2025
    },
    publishedBy: {
      avatar: "https://www.wired.com/assets/icons/default-author-avatar.png",
      firstName: "Steven",
      lastName: "Levy"
    },
    image: blogImg3,
    link: "https://www.wired.com/story/what-lt-col-boz-and-big-techs-enlisted-execs-will-do-in-the-army/"
  },
  {
    title: "Unpacking AI Agents",
    category: "Business",
    publishedAt: {
      date: 12,
      month: "Jun",
      year: 2025
    },
    publishedBy: {
      avatar: "https://www.wired.com/assets/icons/default-author-avatar.png",
      firstName: "Lauren ",
      lastName: "Goode"
    },
    image: blogImg4,
    link: "https://www.wired.com/story/uncanny-valley-podcast-unpacking-ai-agents/"
  },
  {
    title: 'The Power of Gratitude: Cultivating Joy and Abundance',
    category: 'Technology',
    publishedBy: {
      firstName: 'Carolyn',
      lastName: 'Ortiz'
    },
    image: blogImg4,
    route: { name: 'blog.single.v1' }
  },
  {
    title: '5 investment doubts you should clarify',
    category: 'Lifestyle',
    publishedBy: {
      firstName: 'Amanda',
      lastName: 'Reed'
    },
    image: blogImg4,
    isSponsored: true,
    route: { name: 'blog.single.v1' }
  },
  {
    title: 'Mastering Responsive Web Design with Bootstrap',
    category: 'Design',
    publishedBy: {
      firstName: 'Joan',
      lastName: 'Wallace'
    },
    image: blogImg4,
    route: { name: 'blog.single.v1' }
  },
  {
    title: 'Effortless Web Development with Mizzle',
    category: 'Marketing',
    publishedBy: {
      firstName: 'Lori',
      lastName: 'Stevens'
    },
    image: blogImg4,
    route: { name: 'blog.single.v1' }
  },
  {
    title: 'Ten questions you should answer truthfully.',
    category: 'Research',
    publishedBy: {
      firstName: 'Louis',
      lastName: 'Crawford'
    },
    image: blogImg4,
    route: { name: 'blog.single.v1' }
  }
]
