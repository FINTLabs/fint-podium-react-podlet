/**
 * Determent if we run in development mode or not. It is `true` if `NODE_ENV === 'development'`
 */
export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';
/**
 * Sets the K8S environment. Is used to build production asset url's.
 * @see {@link createBaseAssetUri} for more information
 * @default `alpha`
 */
export const K8S_CLUSTER = process.env.K8S_CLUSTER || 'alpha';
export const PODLET_PORT = process.env.PODLET_PORT || 7100;
export const PODLET_VERSION = process.env.PODLET_VERION || '1.0.0';
export const PODLET_PATH_NAME = process.env.PODLET_PATHNAME || '/';
export const LOGGING_LEVEL = process.env.LOGGING_LEVEL || 'info';

