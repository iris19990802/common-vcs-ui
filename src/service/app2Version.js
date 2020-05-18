/* eslint-disable import/prefer-default-export */
import Fetch from '@/utils/fetch';

export function getOneServiceByModule({ serviceName, moduleId }) {
  return Fetch.get('/api/service/getOneServiceByModule', {
    serviceName,
    moduleId,
  });
}

export default {
  getOneServiceByModule,
};
