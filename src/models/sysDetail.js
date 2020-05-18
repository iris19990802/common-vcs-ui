import sysDetailService from '@/service/sysDetailService';

export default {
  namespace: 'sysDetail',

  state: {
    OSDetail: {
      osVersion: 'V0.9.0',
      osName: '上线版',
      isHistory: '1',
      osDate: '2020-03-17',
      osProgress: 1.0,
      osRemark: '历史版本',
    },
    saData: {
      page: 1,
      record: 1,
      total: 1,
      rows: [
        {
          id: 1,
          moduleId: 'test',
          moduleName: 'test',
          moduleVersion: 'test',
          moduleProgress: 0,
          serviceName: 'test',
          serviceProgress: 0.2,
          function: 'test',
          codeBranch: 'test',
          serviceTag: 'test',
          manager: 'test',
          os: ['os_test1', 'os_test2'],
          appName: 'route_service',
        },
      ],
    },
  },

  effects: {
    *getOsDetailByVersion({ payload }, { put, call }) {
      const { osName, osVersion } = payload;

      const { data } = yield call(sysDetailService.getOsDetailByVersion, {
        osVersion,
        osName,
      });
      yield put({ type: 'setOSDetail', payload: data });
    },

    *queryServiceListByOsVersion({ payload }, { put, call }) {
      const { osName, osVersion, page, pageSize } = payload;

      const { data } = yield call(
        sysDetailService.queryServiceListByOsVersion,
        { osVersion, osName, page, pageSize },
      );
      yield put({ type: 'setSaData', payload: data });
    },
  },

  reducers: {
    setOSDetail(state, { payload }) {
      return {
        ...state,
        OSDetail: payload,
      };
    },

    setSaData(state, { payload }) {
      return {
        ...state,
        saData: payload,
      };
    },
  },

  subscriptions: {}
};
