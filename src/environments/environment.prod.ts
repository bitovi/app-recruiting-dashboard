import config from '../../auth_config.json';
import {Environment} from "./environment";

const {domain, clientId, audience, apiUri, errorPath} = config as {
  domain: string;
  clientId: string;
  audience?: string;
  apiUri: string;
  errorPath: string;
};

export const environment: Environment = {
  production: true,
  auth: {
    domain,
    clientId,
    redirectUri: window.location.origin,
    errorPath,
  },
  httpInterceptor: {
    allowedList: [`${apiUri}/*`],
  },
};
