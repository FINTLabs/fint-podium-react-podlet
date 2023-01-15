import fs from "fs";
import Podlet from "@podium/podlet";
import {IS_DEVELOPMENT, PODLET_PATH_NAME, PODLET_VERSION} from "./environment";
import {createBaseUri} from "./utils";
import log from "./logger";
import type {AssetCss, AssetJs} from "@podium/utils";

/**
 * Copies the asset-manifest.json file from assetManifestFile to current directory.
 * @param assetManifestFile Relative or absolut path of asset-manifest.json file.
 * @throws If no asset-manifest.json file is found.
 */
export const copyAssetManifestFromBuildDirectoryIfExist = (assetManifestFile: string = "../build/asset-manifest.json") => {
    if (fs.existsSync(assetManifestFile)) {
        log.info("Copying asset-manifest.json from build directory...");
        fs.copyFileSync(assetManifestFile, "asset-manifest.json");
    } else {
        throw new Error("No asset-manifest.json found. Aborting!");
    }
};
/**
 * Returns the asset-manifest.json file.
 * @param assetManifestFile Relative or absolut path of asset-manifest.json file.
 */
export const ensureAssets = (assetManifestFile: string): any => {

    if (!fs.existsSync(assetManifestFile)) {
        log.info("asset-manifest.json not found!");
        copyAssetManifestFromBuildDirectoryIfExist();
    } else {
        log.info("Found asset-manifest.json")
    }

    return require(assetManifestFile);
}

/**
 * Creates the Podlet.
 * @param podletName
 * @param assetManifestFile
 */
export const createPod = (podletName: string, assetManifestFile: string): Podlet => {

    log.info('Creating podlet...')
    const podlet = new Podlet({
        name: podletName,
        version: PODLET_VERSION,
        pathname: PODLET_PATH_NAME,
        development: IS_DEVELOPMENT,
    });


    ensureAssets(assetManifestFile).entrypoints.forEach((file: any) => {
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



