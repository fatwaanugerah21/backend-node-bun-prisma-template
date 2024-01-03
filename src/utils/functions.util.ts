import { TJobPosting, TGetJobsParams } from "../types/job.type";

export function searchJobs(
  jobs: TJobPosting[],
  filter: TGetJobsParams
): TJobPosting[] {
  return jobs.filter((job) => {
    const termMatch =
      !filter.description ||
      job.title.toLowerCase().includes(filter.description.toLowerCase());
    const locationMatch =
      !filter.location ||
      job.location.toLowerCase().includes(filter.location.toLowerCase());
    const fullTimeMatch =
      filter.fullTime === undefined ||
      job.type.toLowerCase() === (filter.fullTime ? "full time" : "part time");

    return termMatch && locationMatch && fullTimeMatch;
  });
}
