export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
export const K8S_CLUSTER = process.env.K8S_CLUSTER || 'alpha';
export const PODLET_PORT = process.env.PODLET_PORT || 7100;
export const PODLET_VERSION = process.env.PODLET_VERION || '1.0.0';
export const PODLET_PATH_NAME = process.env.PODLET_PATHNAME || '/';
export const LOGGING_LEVEL = process.env.LOGGING_LEVEL || 'info';
