const IS_DEVELOPMENT = process.env.NODE_ENV === 'development'
const K8S_CLUSTER = process.env.K8S_CLUSTER || 'alpha'

const PODLET_PORT = process.env.PODLET_PORT || 7100


const PODLET_VERSION = process.env.PODLET_VERION || '1.0.0'
const PODLET_PATH_NAME = process.env.PODLET_PATHNAME || '/'

module.exports = {
    IS_DEVELOPMENT,
    K8S_CLUSTER,
    PODLET_VERSION,
    PODLET_PATH_NAME,
    PODLET_PORT
}
