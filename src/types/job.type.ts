export type TGetJobsParams = {
  description?: string;
  location?: string;
  fullTime?: boolean;
};

export type TJobPosting = {
  id: string;
  type: string;
  url: string;
  created_at: string;
  company: string;
  company_url: string;
  location: string;
  title: string;
  description: string;
  how_to_apply: string;
  company_logo: string | null;
};
