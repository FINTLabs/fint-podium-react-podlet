import {startPodService, Options} from "../src";

startPodService(new Options("test", "beta", '9000'), __dirname + "/asset-manifest.json");