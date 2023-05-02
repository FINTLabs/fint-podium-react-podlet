export class Options {
  /**
   * Determent if we run in development mode or not. It is `true` if `NODE_ENV === 'development'`
   */
  isDevelopment: boolean = false;
  /**
   *  Sets the K8S environment. Is used to build production asset url's.
   * @see {@link createBaseAssetUri} for more information
   * @default `alpha`
   */
  k8sCluster: string = "alpha";
  /**
   * Port for the podlet service.
   * @default `7100`
   */
  podletPort: string = "7100";
  /**
   * The current version of the podlet.
   * @default `1.0.0`
   */
  podletVersion: string = "1.0.0";
  /**
   * Pathname of where a Podlet is mounted in an HTTP server.
   * @default `/`
   */
  podletPathName: string = "/";
  /**
   * Name of the podlet.
   */
  podletName: string;
  /**
   * Logging level.
   * @default `info`
   */
  loggingLevel: string = "info";


  constructor(podletName: string, podletPort: string = "7100", isDevelopment: boolean = false) {
    this.podletName = podletName;
    this.podletPort = podletPort;
    this.isDevelopment = isDevelopment;
  }


}