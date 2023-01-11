const fs = require("fs")
const Podlet = require("@podium/podlet");
const {
    PODLET_VERSION, PODLET_PATH_NAME, IS_DEVELOPMENT
} = require("./environment");
const {createBaseUri} = require("./utils");
const log = require("./logger");


const ensureAssets = () => {
    if (!fs.existsSync("./asset-manifest.json")) {
        log.info("asset-manifest.json not found!")
        if (fs.existsSync("../build/asset-manifest.json")) {
            log.info("Copying asset-manifest.json from build directory...")
            fs.copyFileSync("../build/asset-manifest.json", "asset-manifest.json")
        } else {
            log.info("No asset-manifest.json found. Aborting!")
            process.exit(1)
        }
    } else {
        log.info("Found asset-manifest.json")
    }

    return JSON.parse(fs.readFileSync('./asset-manifest.json'))
}

const createPod = (podletName) => {

    log.info('Creating podlet...')
    const podlet = new Podlet({
        name: podletName,
        version: PODLET_VERSION,
        pathname: PODLET_PATH_NAME,
        development: IS_DEVELOPMENT,
    });

    ensureAssets().entrypoints.forEach((file) => {
        if (file.indexOf(".css") !== -1) {

            const filename = IS_DEVELOPMENT ? file : "main.css"
            podlet.css({
                value: createBaseUri(podletName) + filename
            });
        }
        if (file.indexOf(".js") !== -1) {
            const filename = IS_DEVELOPMENT ? file : "main.js"

            podlet.js({
                value: createBaseUri(podletName) + filename,
                defer: true
            });
        }
    });

    log.info('Podlet created:', JSON.stringify(podlet));
    return podlet
}


module.exports = {
    createPod
}
