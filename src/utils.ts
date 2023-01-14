const {PODLET_PORT, IS_DEVELOPMENT, K8S_CLUSTER} = require("./environment");


/**
 *
 * @param podletName
 */
export const createBaseUri = (podletName: string) => {
    return IS_DEVELOPMENT ? `http://localhost:${PODLET_PORT}/` : `https://cdn.flais.io/${K8S_CLUSTER}/${podletName}/`
}


