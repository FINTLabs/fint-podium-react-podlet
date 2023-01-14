import fs from "fs";
import Podlet from "@podium/podlet";
import {IS_DEVELOPMENT, PODLET_PATH_NAME, PODLET_VERSION} from "./environment";
import {createBaseUri} from "./utils";
import log from "./logger";
import type {AssetCss, AssetJs} from "@podium/utils";

/**
 *
 */
export const ensureAssets = (): any => {
    if (!fs.existsSync("./asset-manifest.json")) {
        log.info("asset-manifest.json not found!");
        if (fs.existsSync("../build/asset-manifest.json")) {
            log.info("Copying asset-manifest.json from build directory...");
            fs.copyFileSync("../build/asset-manifest.json", "asset-manifest.json");
        } else {
            //log.info("No asset-manifest.json found. Aborting!");
            throw new Error("No asset-manifest.json found. Aborting!");
        }
    } else {
        log.info("Found asset-manifest.json")
    }

    return fs.readFileSync('./asset-manifest.json').toJSON();
}

/**
 *
 * @param podletName
 */
export const createPod = (podletName: string): Podlet => {

    log.info('Creating podlet...')
    const podlet = new Podlet({
        name: podletName,
        version: PODLET_VERSION,
        pathname: PODLET_PATH_NAME,
        development: IS_DEVELOPMENT,
    });

    ensureAssets().entrypoints.forEach((file: any) => {
        if (file.indexOf(".css") !== -1) {

            const filename = IS_DEVELOPMENT ? file : "main.css"
            podlet.css({
                value: createBaseUri(podletName) + filename
            } as AssetCss);
        }
        if (file.indexOf(".js") !== -1) {
            const filename = IS_DEVELOPMENT ? file : "main.js"

            podlet.js({
                value: createBaseUri(podletName) + filename,
                defer: true
            } as AssetJs);
        }
    });


    log.info('Podlet created:', JSON.stringify(podlet));
    return podlet
}



