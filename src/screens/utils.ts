import { JobType } from "../types";
import axios from "axios";
import { parseDate } from "chrono-node";
import AsyncStorage from "@react-native-community/async-storage";

import api from "../api";
interface ParseHubInfo {
  url: string;
  token: string;
}

interface State {
  data: JobType[];
  keys: string[];
}

export const getAllJobs = async () => {
  const remoteOkJobs: JobType[] = await getRemoteOk();
  const indeedJobs: JobType[] = await getIndeed();
  const allJobs: JobType[] = remoteOkJobs.concat(indeedJobs);

  return sortJobs(allJobs);
};

export const getIndeed = async () => {
  const parseHubInfo: ParseHubInfo = await checkToken();
  const url: string = await parseHubInfo.url;
  const jobs = await getJobs(url);
  const withDate: JobType[] = addDate(jobs.Job);

  return addIdToJob(withDate);
};

export const getRemoteOk = async () => {
  const url: string = "https://remoteok.io/api";
  const jobs: JobType[] = await getJobs(url);
  jobs.shift(); // removes api information

  return jobs;
};

const getJobs = async (url: string): Promise<any> => {
  let data: JobType[] = [];
  await axios
    .get(url)
    .then((res) => (data = res.data))
    .catch((err) => {
      console.log(err, "getData error");

      return err;
    });

  return data;
};

const checkToken = async (): Promise<ParseHubInfo> => {
  const parseHubInfo: ParseHubInfo = { url: "", token: "" };

  await axios
    .get(
      `https://www.parsehub.com/api/v2/projects?api_key=${api}&offset=0&limit=20&include_options=1`
    )
    .then((res) => {
      const data = res.data.projects[0];
      const runToken = data.last_ready_run.run_token;
      const url = `https://www.parsehub.com/api/v2/runs/${runToken}/data?api_key=${api}`;
      parseHubInfo.url = url;
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
  return parseHubInfo;
};

export const storeState = async (state: State) => {
  await AsyncStorage.setItem("state", JSON.stringify(state));
};

export const getStateFromStorage = async () => {
  const state: State = { data: [], keys: [] };
  const storageKeys = await AsyncStorage.getAllKeys();

  if (storageKeys.includes("state")) {
    const storedState = await AsyncStorage.getItem("state");
    const parsedState: State = JSON.parse(storedState);
    const { data, keys } = parsedState;

    return { ...state, data, keys };
  }
  return state;
};

function sortJobs(allJobs: JobType[]) {
  return allJobs.sort((job1, job2) => {
    const firstDate = Date.parse(job1.date);
    const secondDate = Date.parse(job2.date);
    if (firstDate > secondDate) {
      return -1;
    } else if (firstDate < secondDate) {
      return 1;
    } else {
      return 0;
    }
  });
}

function addDate(jobs: JobType[]): JobType[] {
  return jobs.map((job: JobType) => {
    if (job.dateFormated === "Just posted")
      return { ...job, date: parseDate("a minute ago").toJSON() };
    return {
      ...job,
      date: parseDate(job.dateFormated || "a week ago").toJSON()
    };
  });
}

function addIdToJob(jobs: any[]) {
  const jobsWithId: JobType[] = [];
  jobs.forEach((job: JobType) => {
    job = { ...job, id: job.url };
    jobsWithId.push(job);
  });

  return removeDuplicates(jobsWithId);
}

function removeDuplicates(jobsWithId: JobType[]): JobType[] {
  return jobsWithId.reduce((acc: JobType[], current: JobType) => {
    const duplicated = acc.find((job) => job.id === current.id);
    if (!duplicated) {
      return acc.concat(current);
    }
    return acc;
  }, []);
}
