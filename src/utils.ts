import { Options } from "./types";

/**
 * Creates the base asset uri.
 * @returns Base asset uri.
 * @param options
 */
export const createBaseAssetUri = (options: Options): string => {
  return options.isDevelopment
    ? `http://localhost:${options.podletPort}/`
    : `https://cdn.flais.io/${options.k8sCluster}/${options.podletName}/`;
};
