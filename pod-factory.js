const fs = require("fs")
const Podlet = require("@podium/podlet");
const {
    PODLET_VERSION, PODLET_PATH_NAME, IS_DEVELOPMENT
} = require("./environment");
const {createBaseUri} = require("./utils");

const ensureAssets = () => {
    if (!fs.existsSync("./asset-manifest.json")) {
        console.log("asset-manifest.json not found!")
        if (fs.existsSync("../build/asset-manifest.json")) {
            console.log("Copying asset-manifest.json from build directory...")
            fs.copyFileSync("../build/asset-manifest.json", "asset-manifest.json")
        } else {
            console.log("No asset-manifest.json found. Aborting!")
            process.exit(1)
        }
    } else {
        console.log("Found asset-manifest.json")
    }

    return JSON.parse(fs.readFileSync('./asset-manifest.json'))
}

const createPod = (podletName) => {

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

    return podlet
}


module.exports = {
    createPod
}
