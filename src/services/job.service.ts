import FetcherLibs from "../libs/fetcher.lib";
import { TJobPosting, TGetJobsParams } from "../types/job.type";
import { TPaginationParams } from "../types/common.type";
import { searchJobs } from "../utils/functions.util";

class JobService {
  static jobsUrl =
    "https://dev6.dansmultipro.com/api/recruitment/positions.json";
  static jobDetailUrl =
    "http://dev3.dansmultipro.co.id/api/recruitment/positions";

  static async getJob(id: string): Promise<TJobPosting> {
    try {
      const job = (await FetcherLibs.GetData(
        `${this.jobsUrl}/${id}`
      )) as TJobPosting;

      return job;
    } catch (error) {
      console.error(error);

      throw error;
    }
  }

  static async getJobs(
    paginationParams: TPaginationParams,
    params: TGetJobsParams
  ): Promise<TJobPosting[]> {
    try {
      const jobs = (await FetcherLibs.GetData(this.jobsUrl)) as TJobPosting[];

      return searchJobs(jobs, params).slice(
        paginationParams.offset,
        paginationParams.offset + paginationParams.limit
      );
    } catch (error) {
      console.error(error);

      throw error;
    }
  }
}

export default JobService;
