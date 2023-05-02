import express from "express";
import prometheusMiddleware from "express-prometheus-middleware";
import { log } from "./logger";
import { createPod } from "./pod-factory";
import morgan from "morgan";
import { Options } from "./types";

/**
 * Start the podlet service and serves the podlet.
 * @param options
 * @param assetManifestFile Relative or absolut path of asset-manifest.json file.
 * @example
 * ```ts
 * import {startPodService} from "@fintlabs/fint-podium-react-podlet";
 *
 * startPodService("example", `${__dirname}/asset-manifest.json`);
 * ```
 */
export const startPodService = (
  options: Options,
  assetManifestFile = `${__dirname}/asset-manifest.json`
) => {
  const app = express();

  app.use(morgan("combined"));
  app.use(
    prometheusMiddleware({
      collectDefaultMetrics: true
    })
  );

  const podlet = createPod(options, assetManifestFile);

  app.use(podlet.middleware());

  options.isDevelopment && app.use("/static", express.static("../build/static"));

  app.get(podlet.content(), (req, res) => {
    res.status(200).podiumSend(`<div id="${options.podletName}"></div>`);
  });

  app.get(podlet.manifest(), (req, res) => {
    res.status(200).send(podlet);
  });

  app.listen(options.podletPort, () => {
    log.info("Podlet started 🚜!");
    log.info(`http://localhost:${options.podletPort}/manifest.json`);
  });
};

