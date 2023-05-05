export class Options {
    /**
     * Determent if we run in development mode or not. It is `true` if `NODE_ENV === 'development'`
     */
    isDevelopment = false;
    /**
     *  Sets the K8S environment. Is used to build production asset url's.
     * @see {@link createBaseAssetUri} for more information
     * @default `alpha`
     */
    k8sCluster = 'alpha';
    /**
     * Port for the podlet service.
     * @default `7100`
     */
    podletPort = '7100';
    /**
     * The current version of the podlet.
     * @default `1.0.0`
     */
    podletVersion = '1.0.0';
    /**
     * Pathname of where a Podlet is mounted in an HTTP server.
     * @default `/`
     */
    podletPathName = '/';
    /**
     * Name of the podlet.
     */
    podletName: string;
    /**
     * Logging level.
     * @default `info`
     */
    loggingLevel = 'info';

    constructor(
        podletName: string,
        environment = 'alpha',
        podletPort = '7100',
        isDevelopment = false
    ) {
        this.podletName = podletName;
        this.k8sCluster = environment;
        this.podletPort = podletPort;
        this.isDevelopment = isDevelopment;
    }
}
