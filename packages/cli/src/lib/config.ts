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
  getProfile: () => string;
  setProfile: (profile: string) => void;
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

configStore.setProfile = function setProfile(profile) {
  _state.profile = profile;
};

configStore.getProject = function getProject() {
  const alias = configStore.getProfile();
  return configStore.get(`projects.${alias}`);
};

configStore.setProject = function setProject(project: Project) {
  const alias = configStore.getProfile();
  configStore.set(`projects.${alias}`, project);
};

configStore.unsetProject = function unsetProject() {
  const alias = configStore.getProfile();
  configStore.delete(`projects.${alias}`);
};

configStore.clearProjects = function clearProjects() {
  configStore.delete('projects');
};
