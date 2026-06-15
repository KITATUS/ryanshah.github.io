// data.js — all content for the Ryan Shah "main menu" site.
// Edit text here; app.js renders it. No build step — plain global object.

window.SITE = {
  studio: 'Mid AF Technologies',
  title: ['Ryan', 'Shah'],
  tagline: 'Engineer-brained. Designer-hearted. Slightly feral.',
  role: 'Lead Technical Designer',
  rank: '10+ yrs · AAA',

  social: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/ryan-shah-ue/' },
    { label: 'GitHub', url: 'https://github.com/KITATUS' },
  ],

  // Main-menu entries. `id` matches a section below.
  menu: [
    {
      id: 'about', no: '01', label: 'Campaign', sub: 'The story so far',
      art: 'CAMPAIGN', img: 'assets/art-about.png', pos: '50% 24%',
      blurb: 'A software engineer who moved into technical design, always in games. The who, the why, and the way I work.',
      tags: ['Bio', 'Philosophy', 'Skills'],
    },
    {
      id: 'work', no: '02', label: 'Operations', sub: 'Field record',
      art: 'OPERATIONS', img: 'assets/art-work.png', pos: '50% 30%',
      blurb: 'A decade of shipping with some of the biggest names in the industry. Studios, clients, and what I did there.',
      tags: ['Epic Games', 'Sony', 'SEGA', '+ more'],
    },
    {
      id: 'archive', no: '03', label: 'Archive', sub: 'Words, books & talks',
      art: 'ARCHIVE', img: 'assets/art-archive.png', pos: '50% 28%',
      blurb: 'Books, a daily news round-up, talks and an Unreal Engine Megagrant. The teaching habit I can\u2019t shake.',
      tags: ['Books', 'Daily news', 'Megagrant'],
    },
    {
      id: 'comms', no: '04', label: 'Comms', sub: 'Open a channel',
      art: 'COMMS', img: 'assets/art-comms.png', pos: '50% 42%',
      blurb: 'Always up for a chat about Unreal Engine, anything games-related, or whatever else is on your mind.',
      tags: ['Unreal', 'Games', 'Hello'],
    },
  ],

  sections: {
    about: {
      kicker: 'Campaign',
      title: 'The story so far',
      lead: 'I\u2019m Ryan, a Lead Technical Designer. Starting out as a software engineer gave me the instincts of a designer backed by the toolkit of an engineer.',
      body: [
        'My background is in software engineering, which means I tend to see games as systems to be understood, bent, and occasionally bullied into doing something they weren\u2019t built to do. These days I lead technical design: living in the gap where design ideas meet the code that has to make them real.',
        'I\u2019ve spent over a decade in AAA, mostly elbow-deep in Unreal Engine. I like the hard problems: the ones with a deadline attached and no obvious answer. And I genuinely enjoy the part where you build the tool, write the docs, and hand the whole team a faster way to work.',
        'I also lead. I\u2019ve built teams from scratch and re-aligned existing ones, and I care a stupid amount about the people on them. Infectious energy, slightly feral, allergic to "that\u2019s good enough."',
      ],
      stats: [
        ['Systems & Game Design', 95],
        ['Tools & Engine Dev', 92],
        ['Leadership & Mentoring', 94],
        ['Unreal Engine', 96],
      ],
    },

    work: {
      kicker: 'Operations',
      title: 'Field record',
      lead: 'Selected operations. Some shipped, some are still under NDA, all taught me something.',
      ops: [
        {
          tag: 'ACTIVE', codename: 'CodeDev \u00b7 Unreal Engine Experts', role: 'Lead Technical Designer', years: '2026 \u2013 Present',
          desc: 'Leading technical design for some of the biggest games in the industry, bridging creative vision and technical implementation.',
          chips: ['Unreal Engine', 'Leadership', 'AAA'],
        },
        {
          tag: 'COMPLETE', codename: 'The Multiplayer Group', role: 'Senior Technical Designer', years: '2019 \u2013 2026',
          desc: 'Turned design intent into shipped multiplayer features: writing the design documentation, prototyping mechanics, and building the scripts and tools that kept cross-discipline teams moving.',
          chips: ['Multiplayer', 'Systems', 'Tooling', 'Prototyping'],
        },
        {
          tag: 'COMPLETE', codename: 'Epic Games', role: 'Software Engineer / Tools', years: '2015 \u2013 2017',
          desc: 'Shipped two engine features used by thousands of studios, helped stand up the Epic Games Store, and curated the Unreal Marketplace, writing rules still in use today.',
          chips: ['Engine C++', 'Epic Games Store', 'Marketplace'],
        },
        {
          tag: 'COMPLETE', codename: 'Framestore', role: 'Unreal Engine Developer', years: '2017',
          desc: 'Built a bespoke engine tool for a novel VR experience, manipulating the rendering pipeline to create features that didn\u2019t exist yet.',
          chips: ['VR', 'Rendering', 'R&D'],
        },
        {
          tag: 'COMPLETE', codename: 'KBC Bank', role: 'Technical Director / Lead Dev', years: '2017 \u2013 2018',
          desc: 'Founded and mentored a new team on game-dev best practice, and built a robust, scalable content pipeline from the ground up.',
          chips: ['Team build', 'Pipeline', 'Mentoring'],
        },
      ],
    },

    archive: {
      kicker: 'Archive',
      title: 'Words, books & talks',
      lead: 'The teaching habit. Unlocked over the years and still running.',
      entries: [
        { tag: 'DAILY', title: 'Game News Round-Up', desc: 'A daily digest of the latest news from across the games industry. Researched, written and published every single day for over seven years.', url: 'https://gamenewsroundup.co.uk/' },
        { tag: 'BOOK', title: 'Published Author', desc: 'Multiple published books on Unreal Engine and game development, with readers worldwide, including a translated edition in China.' },
        { tag: 'AWARD', title: 'Unreal Engine Megagrant', desc: 'Awarded a Megagrant in recognition of educational work, funding training resources for aspiring developers.' },
        { tag: 'WRITING', title: 'Articles & Guides', desc: 'Serialized technical guides, instructional pieces and the occasional bit of fiction, featured across industry platforms.' },
        { tag: 'STAGE', title: 'Masterclasses & Talks', desc: 'Talks and masterclasses at industry events and institutions, aimed squarely at the next generation of developers.' },
      ],
    },

    comms: {
      kicker: 'Comms',
      title: 'Open a channel',
      lead: 'Want to chat Unreal Engine, anything games-related, or just want to reach out?',
      email: 'ryan.shah@midaf.tech',
      note: '',
    },
  },
};
