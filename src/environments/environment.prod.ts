import config from '../../auth_config.json';
import { Environment } from './environment.model';

const { domain, clientId, apiUri, errorPath } = config as {
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
  api: 'http://localhost:3030',
};
