import ConfigStore from 'configstore';

type Project = {
  apiKey: string;
  apiSecret: string;
  userEmail?: string;
  userExternalId?: string;
  host?: string;
  token?: string;
};

type Store = InstanceType<typeof ConfigStore> & {
  profile: string;
  color: boolean;
  host?: string;
  getProject: (profile: string) => Project;
  setProject: (profile: string, project: Project) => void;
  unsetProject: (profile: string) => void;
  clearProjects: () => void;
};

export const configStore = new ConfigStore(
  'magicbell',
  {
    projects: {},
  },
  {
    globalConfigPath: true,
  },
) as Store;

configStore.color = true;

configStore.getProject = function getProject(profile: string) {
  return configStore.get(`projects.${profile}`);
};

configStore.setProject = function setProject(profile: string, project: Project) {
  for (const key of Object.keys(project)) {
    if (project[key] === undefined) {
      delete project[key];
    }
  }

  configStore.set(`projects.${profile}`, project);
};

configStore.unsetProject = function unsetProject(profile: string) {
  configStore.delete(`projects.${profile}`);
};

configStore.clearProjects = function clearProjects() {
  configStore.delete('projects');
};
