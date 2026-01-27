const STRAPI_URL = 'http://127.0.0.1:1337';

const newsItems = [
  {
    title: 'Introducing Our New Automated Assembly Line',
    excerpt: 'We have upgraded our factory with state-of-the-art robotic arms, increasing production efficiency by 40%.',
    content: 'Full article content about the new assembly line...',
    category: 'Factory News',
    author: 'Production Team',
    date: '2026-01-20',
    media_type: 'Article'
  },
  {
    title: 'Watch: Durability Test of Our Steel Toe Boots',
    excerpt: 'See how our boots withstand 200J impact and 15kN compression in this live lab test.',
    content: 'Video description...',
    category: 'Product Launch',
    author: 'QC Dept',
    date: '2026-01-22',
    media_type: 'Video',
    video_url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ' // 示例视频
  },
  {
    title: 'A+A 2025 Exhibition Highlights',
    excerpt: 'Thank you to everyone who visited our booth at A+A Düsseldorf. Here are the best moments.',
    content: 'Recap of the event...',
    category: 'Exhibition',
    author: 'Sales Team',
    date: '2025-11-15',
    media_type: 'Article'
  },
  {
    title: 'Factory Tour: Inside Dengtai Shoes',
    excerpt: 'Take a virtual tour of our 50,000 sqm manufacturing facility in Shandong.',
    content: 'Tour description...',
    category: 'Company News',
    author: 'Admin',
    date: '2026-01-10',
    media_type: 'Video',
    video_url: 'https://www.youtube.com/watch?v=LXb3EKWsInQ' // 示例视频
  },
  {
    title: 'Client Testimonial: Construction Corp from Dubai',
    excerpt: 'Hear what our long-term partner has to say about our OEM services and product quality.',
    content: 'Testimonial transcript...',
    category: 'Case Study',
    author: 'Marketing',
    date: '2026-01-05',
    media_type: 'Video',
    video_url: 'https://www.youtube.com/watch?v=9No-FiEInLA' // 示例视频
  }
];

async function createNews(item) {
  const payload = {
    data: item
  };

  try {
    const response = await fetch(`${STRAPI_URL}/api/factory-updates`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log(`✅ Created: ${item.title}`);
    } else {
      console.error(`❌ Failed: ${item.title}`, response.statusText);
      const err = await response.text();
      console.error(err);
    }
  } catch (error) {
    console.error(`❌ Error:`, error);
  }
}

async function seed() {
  console.log('🚀 Starting to seed news...');
  for (const item of newsItems) {
    await createNews(item);
    await new Promise(r => setTimeout(r, 100));
  }
  console.log('✨ Seed completed!');
}

seed();

