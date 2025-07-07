import type { Database } from './database.types';

export type Proposal = Database['public']['Tables']['proposals']['Row'];

// Since Supabase returns content as a JSON object, we define its shape.
// You'll need to cast proposal.content to this type after fetching.
export type ProposalContent = {
  overview: string;
  abstract: string;
  problemStatement: string;
  objectives: string;
  methodology: string;
  budget: string;
};
