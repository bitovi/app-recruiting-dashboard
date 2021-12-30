import config from '../../auth_config_prod.json';
import { IEnvironment } from '../app/core/interfaces';

const { domain, clientId, apiUri, errorPath } = config as {
  domain: string;
  clientId: string;
  audience?: string;
  apiUri: string;
  errorPath: string;
};

export const environment: IEnvironment = {
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
  api: 'https://recruiting-dashboard-api.onrender.com',
  apiKey: 'h84j90wdcbiy23c563r4n80brtypom',
};
