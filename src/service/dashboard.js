/* eslint-disable import/prefer-default-export */
import Fetch from '@/utils/fetch';

export function getAllOS() {
  return Fetch.get('/api/OS/getAllOS');
}

export function getAllService({ page, pageSize }) {
  return Fetch.get('/api/service/getAllService', {
    page: page,
    pageSize: pageSize,
  });
}

export function getServiceByCondition({
  page,
  pageSize,
  moduleVersion,
  moduleName,
  osVersion,
}) {
  return Fetch.get('/api/service/getServiceByCondition', {
    page: page,
    pageSize: pageSize,
    moduleVersion,
    moduleName,
    osVersion,
  });
}

export function editModuleProgress({ moduleId, moduleProgress }) {
  return Fetch.post('/api/module/changeModuleProgress', {
    moduleId,
    moduleProgress,
  });
}

export default {
  getAllOS,
  getAllService,
  getServiceByCondition,
  editModuleProgress,
};
