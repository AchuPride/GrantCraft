export interface Grant {
  id: string;
  title: string;
  funder: string;
  description: string;
  amount: number;
  deadline: string;
  categories: string[];
}

export const mockGrants: Grant[] = [
  {
    id: 'grant-1',
    title: 'Innovate & Educate STEM Grant',
    funder: 'Tech Forward Foundation',
    description: 'Funding for innovative projects that promote STEM education for K-12 students. Special consideration for programs serving underrepresented communities.',
    amount: 50000,
    deadline: '2024-10-31',
    categories: ['STEM', 'Education', 'Youth'],
  },
  {
    id: 'grant-2',
    title: 'Community Arts & Culture Fund',
    funder: 'Creative Futures Collective',
    description: 'Supports local arts projects that foster community engagement, cultural preservation, and public art installations.',
    amount: 25000,
    deadline: '2024-09-15',
    categories: ['Arts', 'Community', 'Culture'],
  },
  {
    id: 'grant-3',
    title: 'Green Spaces Initiative',
    funder: 'The Earth Alliance',
    description: 'Grants for creating or improving urban green spaces, community gardens, and promoting environmental sustainability.',
    amount: 75000,
    deadline: '2024-11-20',
    categories: ['Environment', 'Community', 'Health'],
  },
  {
    id: 'grant-4',
    title: 'Healthy Habits Grant',
    funder: 'Wellness For All',
    description: 'Funding for programs that promote physical activity, nutritional education, and mental wellness in local communities.',
    amount: 30000,
    deadline: '2024-10-01',
    categories: ['Health', 'Community', 'Youth'],
  },
  {
    id: 'grant-5',
    title: 'Digital Literacy for Seniors',
    funder: 'Generations Connect',
    description: 'Supports programs aimed at improving digital literacy and access to technology for senior citizens.',
    amount: 15000,
    deadline: '2024-12-01',
    categories: ['Seniors', 'Technology', 'Education'],
  },
   {
    id: 'grant-6',
    title: 'Youth Entrepreneurship Challenge',
    funder: 'Future Founders Org',
    description: 'A challenge grant for programs that teach entrepreneurship and business skills to high school students.',
    amount: 40000,
    deadline: '2025-01-15',
    categories: ['Youth', 'Education', 'Business'],
  },
];
