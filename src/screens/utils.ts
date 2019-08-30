import { JobType } from "../types";
import axios from "axios";
import api from "../api";
import AsyncStorage from "@react-native-community/async-storage";

interface ParseHubInfo {
  url: string;
  token: string;
}

interface State {
  data: JobType[];
  favorites: JobType[];
  keys: string[];
}

export const getAllJobs = async () => {
  const remoteOkJobs: JobType[] = await getRemoteOk();
  const indeedJobs: JobType[] = await getIndeed();
  const allJobs: JobType[] = remoteOkJobs.concat(indeedJobs);

  return allJobs;
};

export const getIndeed = async () => {
  const parseHubInfo: ParseHubInfo = await checkToken();
  const url: string = await parseHubInfo.url;

  const jobs = await getJobs(url);
  return addIdToJob(jobs.Job);
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
  const { data, keys } = state;
  const favFilter = (job: JobType) => keys.includes(job.id);
  const dataWithFavorites = data.map((job: JobType) => {
    return { ...job, isFavorite: favFilter(job) };
  });

  await AsyncStorage.setItem(
    "state",
    JSON.stringify({ ...state, data: dataWithFavorites })
  );
};

export const getStateFromStorage = async () => {
  const state: State = { data: [], favorites: [], keys: [] };
  const storageKeys = await AsyncStorage.getAllKeys();

  if (storageKeys.includes("state")) {
    const storedState = await AsyncStorage.getItem("state");
    const parsedState: State = JSON.parse(storedState);
    const { data, favorites, keys } = parsedState;

    return { ...state, data, favorites, keys };
  }
  return state;
};

function addIdToJob(jobs: any[]) {
  const jobsWithId: JobType[] = [];
  jobs.forEach((job: JobType) => {
    job = { ...job, id: job.url };
    jobsWithId.push(job);
  });
  return jobsWithId;
}
