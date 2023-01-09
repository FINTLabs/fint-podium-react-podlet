# FINT Podium React Podlet

[![npm version](https://badge.fury.io/js/@fintlabs%2Ffint-podium-react-podlet.svg)](https://badge.fury.io/js/@fintlabs%2Ffint-podium-react-podlet)

This is a small helper library to help create a podlet for you react project to run in the FINTLabs/FLAIS environment.

Checkout the awesome [Podium project](https://podium-lib.io/docs/podium/conceptual_overview) to learn more
about `Podlets` and `podium-lib`.

# Usage

To run your React app as a Podium podlet in FLAIS you need to do the following:
1. Create a sub folder in your project called `podlet`
2. Run `yarn init`
3. Install the following packages:
    * `yarn add @fintlabs/fint-podium-react-podlet`
    * `yarn add @podium/podlet`
    * `yarn add express`
4. Create a podlet server file called `podlet.js` with the following code:
```javascript
const {podlet} = require("@fintlabs/fint-podium-react-podlet");
const packageJson = require("./package.json");

const PODLET_NAME = process.env.PODLET_NAME || packageJson.name;


podlet.runPod(PODLET_NAME);
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
