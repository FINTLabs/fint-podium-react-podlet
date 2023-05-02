import fs from "fs";
import Podlet from "@podium/podlet";
import { createBaseAssetUri } from "./utils";
import { log } from "./logger";
import type { AssetCss, AssetJs } from "@podium/utils";
import { Options } from "./types";


/**
 * Represents the asset-manifest.json file.
 */
export interface AssetManifest {
  /**
   * Object containing a map of filenames and paths.
   */
  files: object,
  /**
   * An array of all files.
   */
  entrypoints: string[]
}

/**
 * Copies the asset-manifest.json file from assetManifestFile to current directory.
 * @param assetManifestFile Relative or absolut path of asset-manifest.json file.
 * @throws If no `asset-manifest.json` file is found.
 */
export const copyAssetManifestFromBuildDirectoryIfExist = (
  assetManifestFile = "../build/asset-manifest.json"
) => {
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
export const ensureAssets = (assetManifestFile: string): AssetManifest => {
  if (!fs.existsSync(assetManifestFile)) {
    log.info(`${assetManifestFile} not found!`);
    copyAssetManifestFromBuildDirectoryIfExist();
  } else {
    log.info(`Found ${assetManifestFile}`);
  }

  return require(assetManifestFile);
};

/**
 * Creates the Podlet.
 * @param options
 * @param assetManifestFile Relative or absolut path to asset-manifest.json file
 * @returns {Podlet} A podium podlet.
 */
export const createPod = (
  options: Options,
  assetManifestFile: string
): Podlet => {
  log.info(`Creating podlet ${options.podletName} from ${assetManifestFile}`);
  const podlet = new Podlet({
    name: options.podletName,
    version: options.podletVersion,
    pathname: options.podletPathName,
    development: options.isDevelopment,
    logger: log
  });

  options.isDevelopment && log.info("Running in development mode 🙅");

  ensureAssets(assetManifestFile).entrypoints.forEach((file: string) => {
    if (file.indexOf(".css") !== -1) {
      const filename = options.isDevelopment ? file : "main.css";
      log.info(`Adding ${filename} to podlet`);
      podlet.css({
        value: createBaseAssetUri(options) + filename
      } as AssetCss);
    }
    if (file.indexOf(".js") !== -1) {
      const filename = options.isDevelopment ? file : "main.js";
      log.info(`Adding ${filename} to podlet`);

      podlet.js({
        value: createBaseAssetUri(options) + filename,
        defer: true
      } as AssetJs);
    }
  });

  log.info("Podlet created:", JSON.stringify(podlet));
  return podlet;
};
