import ConfigStore from 'configstore';

type Project = {
  id: string;
  name: string;
  apiKey: string;
  apiSecret: string;
  userEmail?: string;
  userExternalId?: string;
};

type Store = InstanceType<typeof ConfigStore> & {
  profile: string;
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

const _state = {
  profile: 'default',
};

configStore.getProfile = function getProfile() {
  return _state.profile;
};

Object.defineProperty(configStore, 'profile', {
  get() {
    return _state.profile;
  },
  set(value) {
    _state.profile = value;
  },
});

configStore.getProject = function getProject() {
  const alias = configStore.profile;
  return configStore.get(`projects.${alias}`);
};

configStore.setProject = function setProject(project: Project) {
  const alias = configStore.profile;
  configStore.set(`projects.${alias}`, project);
};

configStore.unsetProject = function unsetProject() {
  const alias = configStore.profile;
  configStore.delete(`projects.${alias}`);
};

configStore.clearProjects = function clearProjects() {
  configStore.delete('projects');
};
