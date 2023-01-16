import { IS_DEVELOPMENT, K8S_CLUSTER, PODLET_PORT } from './environment';

/**
 * Creates the base asset uri.
 * @param podletName
 * @returns Base asset uri.
 */
export const createBaseAssetUri = (podletName: string) : string => {
    return IS_DEVELOPMENT
        ? `http://localhost:${PODLET_PORT}/`
        : `https://cdn.flais.io/${K8S_CLUSTER}/${podletName}/`;
};
