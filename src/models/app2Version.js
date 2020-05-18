import app2Service from '@/service/app2Version';

export default {
  namespace: 'app2Version',

  state: {
    serviceDetail: {
      serviceName: 'test',
      function: 'test',
      serviceProgress: 1,
      codeBranch: 'v0.9.4',
      serviceTag: 'v0.9.4',
      manager: 'lyx',
      isCloud: 1,
      localContainerPort: 8900,
      cloudContainerPort: 8900,
      localPort: 8900,
      cloudPort: 8900,
      serviceKind: '微服务',
      githubLocation: 'test',
      configLocal: 'test',
      configCloud: 'test',
      isServer: 1,
      dependency: 'redis,mysql',
      loadPriority: 0,
      duplication: 1,
      logDir: 'test',
      dataDir: 'test',
      remarks: 'test',

      moduleId: '111',
      moduleName: 'test',
      moduleVersion: 'v1.0.4',
      moduleProgress: 0.683,
    },
  },

  effects: {
    *getOneServiceByModule({ payload }, { put, call }) {
      const { serviceName, moduleId } = payload;

      const { data } = yield call(app2Service.getOneServiceByModule, {
        serviceName,
        moduleId,
      });
      yield put({ type: 'serviceDetail', payload: data });
    },
  },

  reducers: {
    serviceDetail(state, { payload }) {
      return {
        ...state,
        serviceDetail: payload,
      };
    },
  },

  subscriptions: {},
};
