import makingCareerChange from './making-career-change.md?raw';
import redFlagsHiringManagers from './red-flags-hiring-managers.md?raw';
import linkedinPersonalBrand from './linkedin-personal-brand.md?raw';
import salaryNegotiation from './salary-negotiation.md?raw';
import remoteWorkSuccess from './remote-work-success.md?raw';
import layoffRecovery from './layoff-recovery.md?raw';

export interface PostData {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  readTime: string;
  content: string;
}

export const posts: PostData[] = [
  {
    slug: 'making-career-change',
    title: 'Making a Career Change: A Strategic Approach',
    date: '2025-11-04',
    excerpt: 'Thinking about switching industries or roles? Learn how to make a smooth transition while leveraging your skills.',
    category: 'Career Transitions',
    readTime: '8 min read',
    content: makingCareerChange,
  },
  {
    slug: 'red-flags-hiring-managers',
    title: '10 Red Flags Hiring Managers Always Look For',
    date: '2025-11-03',
    excerpt: 'Avoid common mistakes that immediately disqualify candidates. Learn what hiring managers really notice.',
    category: 'Job Search',
    readTime: '6 min read',
    content: redFlagsHiringManagers,
  },
  {
    slug: 'linkedin-personal-brand',
    title: 'Building Your Personal Brand on LinkedIn',
    date: '2025-11-02',
    excerpt: 'Your LinkedIn profile is often the first impression you make. Master the art of professional networking online.',
    category: 'Professional Development',
    readTime: '10 min read',
    content: linkedinPersonalBrand,
  },
  {
    slug: 'salary-negotiation',
    title: 'The Art of Salary Negotiation: The Do\'s and Don\'ts',
    date: '2025-11-01',
    excerpt: 'Negotiating salary can be uncomfortable, but it\'s essential. Learn proven techniques to maximize your earning potential.',
    category: 'Compensation',
    readTime: '7 min read',
    content: salaryNegotiation,
  },
  {
    slug: 'remote-work-success',
    title: 'Remote Work: Standing Out in a Virtual Team',
    date: '2025-10-31',
    excerpt: 'Working remotely requires different strategies to showcase your value. Learn how to excel in a distributed environment.',
    category: 'Remote Work',
    readTime: '5 min read',
    content: remoteWorkSuccess,
  },
  {
    slug: 'layoff-recovery',
    title: 'Recovering from a Layoff: Your Comeback Strategy',
    date: '2025-10-30',
    excerpt: 'Layoffs happen to great professionals. Here\'s how to bounce back stronger and land an even better opportunity.',
    category: 'Career Transitions',
    readTime: '9 min read',
    content: layoffRecovery,
  },
];
