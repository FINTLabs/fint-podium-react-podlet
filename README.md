# FINT Podium React Podlet

![npm (scoped)](https://img.shields.io/npm/v/@fintlabs/fint-podium-react-podlet)
[![TypeDocs](https://img.shields.io/badge/Typedocs-documentation-brightgreen.svg?)](https://fintlabs.github.io/fint-podium-react-podlet/)

This is a small helper library to help create a podlet for you react project to run in the FINTLabs/FLAIS environment.

Checkout the awesome [Podium project](https://podium-lib.io/docs/podium/conceptual_overview) to learn more
about `Podlets` and `podium-lib`.

# Usage

To run your React app as a Podium podlet in FLAIS you need to do the following:

1. Create a sub folder in your project called `podlet`
2. Run `yarn init -y`
3. Run `yarn add @fintlabs/fint-podium-react-podlet @podium/podlet express` to install dependencies:
4. Create a podlet service:

**Javascript**
```javascript
const {podlet} = require("@fintlabs/fint-podium-react-podlet");
const packageJson = require("./package.json");

const PODLET_NAME = process.env.PODLET_NAME || packageJson.name;


startPodService(PODLET_NAME, `${__dirname}/asset-manifest.json`);
```
**Typescript**
```ts
import {startPodService} from "@fintlabs/fint-podium-react-podlet";

startPodService(PODLET_NAME, `${__dirname}/asset-manifest.json`);
```

In addition, you need to:

* Deploy React build files, main.js and main.css, to a CDN service
* Create a deployment for the podlet server, e.g. Docker.

# Properties

| Property         | Default | Description                                                                        |
|------------------|---------|------------------------------------------------------------------------------------|
| PODLET_VERSION   | 1.0.0   |                                                                                    |
| IS_DEVELOPMENT   | `false` | This is set with the following expression `process.env.NODE_ENV === 'development'` |
| PODLET_PATH_NAME | `/`     |                                                                                    |
| PODLET_PORT      | `7100`  |                                                                                    |  
| LOGGING_LEVEL    | `info`  |                                                                                    |  
