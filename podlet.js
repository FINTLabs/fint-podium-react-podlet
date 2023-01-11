const express = require("express");
const promMid = require('express-prometheus-middleware');
const log = require('./logger');
const podFactory = require("./pod-factory");
const {
    IS_DEVELOPMENT,
    PODLET_PORT,
} = require("./environment");
const morgan = require("morgan");


 const runPod = (podletName) => {

    const app = express();

     app.use(morgan("combined"))
     app.use(promMid({
         collectDefaultMetrics: true,
     }));

     const podlet = podFactory.createPod(podletName)


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

module.exports = {
     runPod
}
