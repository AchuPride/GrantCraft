export interface Proposal {
  id: string;
  name: string;
  status: 'Draft' | 'Submitted' | 'Awarded' | 'Rejected';
  lastModified: string;
  content: {
    overview: string;
    abstract: string;
    problemStatement: string;
    objectives: string;
    methodology: string;
    budget: string;
  };
}

export const mockProposals: Proposal[] = [
  {
    id: 'prop-1',
    name: 'Community STEM Education Initiative',
    status: 'Draft',
    lastModified: '2 days ago',
    content: {
      overview: 'This project aims to provide after-school STEM education to 100 underserved middle school students in our community.',
      abstract: 'A proposal to fund an after-school program providing hands-on STEM learning experiences to middle school students from low-income backgrounds, aiming to bridge the opportunity gap in STEM education.',
      problemStatement: 'Local middle schools lack resources for hands-on STEM activities, creating a significant opportunity gap for students from low-income backgrounds.',
      objectives: '1. To increase student interest in STEM careers by 25%.\n2. To improve standardized math and science test scores by 15%.\n3. To provide 40 hours of hands-on STEM programming per student.',
      methodology: 'We will partner with three local schools to deliver a curriculum based on project-based learning. Certified teachers and volunteer STEM professionals will lead the sessions.',
      budget: 'Funds will be used for program supplies ($15,000), staff stipends ($25,000), and administrative overhead ($5,000).',
    },
  },
  {
    id: 'prop-2',
    name: 'Urban Garden & Food Security Project',
    status: 'Submitted',
    lastModified: '1 week ago',
    content: {
      overview: 'To establish three community gardens in urban food deserts, providing fresh produce and nutritional education to 500 residents.',
      abstract: 'This project seeks funding to create three community gardens in identified urban food deserts. The initiative will address food insecurity by providing fresh produce and nutritional workshops to local residents.',
      problemStatement: 'Access to fresh, affordable produce is limited in several downtown neighborhoods, contributing to poor health outcomes.',
      objectives: '1. Cultivate and distribute 5,000 lbs of fresh produce annually.\n2. Host 24 nutritional workshops.\n3. Engage 100 community volunteers.',
      methodology: 'Using vacant city lots, we will build raised garden beds and a small greenhouse. Workshops will be held onsite and at the local community center.',
      budget: 'Requesting funds for garden construction ($20,000), seeds/tools ($5,000), a part-time garden manager ($20,000), and educational materials ($5,000).',
    },
  },
    {
    id: 'prop-3',
    name: 'Youth Mental Health Digital Platform',
    status: 'Awarded',
    lastModified: '1 month ago',
    content: {
      overview: 'Develop a safe, moderated mobile app to connect young people with mental health resources and peer support networks.',
      abstract: 'We propose the development of a secure mobile application designed to provide young people with accessible mental health resources, professional guidance, and a moderated peer support community.',
      problemStatement: 'Mental health support for teenagers is often stigmatized and inaccessible. There is a need for a youth-friendly, digital-first approach.',
      objectives: '1. Onboard 10,000 active users within the first year.\n2. Partner with 50 mental health professionals for content and Q&A sessions.\n3. Reduce self-reported feelings of isolation by 30% among users.',
      methodology: 'An agile development process will be used to build the iOS and Android apps. Content will be co-designed with a youth advisory council. ',
      budget: 'Funding covers app development ($50,000), content creation ($15,000), and marketing/outreach ($10,000).',
    },
  },
];
