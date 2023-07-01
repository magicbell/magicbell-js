import ConfigStore from 'configstore';

type Project = {
  id: string;
  name: string;
  apiKey: string;
  apiSecret: string;
  userEmail?: string;
  userExternalId?: string;
  host?: string;
};

type Store = InstanceType<typeof ConfigStore> & {
  profile: string;
  color: boolean;
  host?: string;
  getProject: () => Project;
  setProject: (project: Project) => void;
  unsetProject: () => void;
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

configStore.profile = 'default';
configStore.color = true;
configStore.host = undefined;

configStore.getProject = function getProject() {
  const alias = configStore.profile;
  return configStore.get(`projects.${alias}`);
};

configStore.setProject = function setProject(project: Project) {
  const alias = configStore.profile;
  if (configStore.host) {
    project.host = project.host || configStore.host;
  }

  configStore.set(`projects.${alias}`, project);
};

configStore.unsetProject = function unsetProject() {
  const alias = configStore.profile;
  configStore.delete(`projects.${alias}`);
};

configStore.clearProjects = function clearProjects() {
  configStore.delete('projects');
};
