import express from "express";
import prometheusMiddleware from "express-prometheus-middleware";
import log from "./logger";
import {createPod} from "./pod-factory";
import {IS_DEVELOPMENT, PODLET_PORT} from "./environment";
import morgan from "morgan";

/**
 *
 * @param podletName
 * @param assetManifestFile
 */
const startPodService = (podletName: string, assetManifestFile: string = "./asset-manifest.json") => {

    const app = express();

    app.use(morgan("combined"))
    app.use(prometheusMiddleware({
        collectDefaultMetrics: true,
    }));

    const podlet = createPod(podletName, assetManifestFile)


    app.use(podlet.middleware());


    IS_DEVELOPMENT && app.use("/static", express.static('../build/static'));

    app.get(podlet.content(), (req, res) => {
        res.status(200).podiumSend(`<div id="${podletName}"></div>`);
    });

    app.get(podlet.manifest(), (req, res) => {
        res.status(200).send(podlet);
    });

    app.listen(PODLET_PORT, () => {
        log.info("Podlet  started!")
        log.info(`http://localhost:${PODLET_PORT}/manifest.json`)
    });

}

export default startPodService;

