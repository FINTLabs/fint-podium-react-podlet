const {PODLET_PORT, IS_DEVELOPMENT, K8S_CLUSTER} = require("./environment");


const createBaseUri = (podletName) => {
    return IS_DEVELOPMENT ? `http://localhost:${PODLET_PORT}/` : `https://cdn.flais.io/${K8S_CLUSTER}/${podletName}/`
}

module.exports = {
    createBaseUri
}
