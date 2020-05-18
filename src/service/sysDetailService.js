/* eslint-disable import/prefer-default-export */
import Fetch from '@/utils/fetch';

export function getOsDetailByVersion({ osVersion, osName }){
    return Fetch.get('/api/OS/getOsDetailByVersion',{osVersion: osVersion , osName: osName});
}

export function queryServiceListByOsVersion({ osVersion, osName, page, pageSize }){
    return Fetch.get('/api/OS/queryServiceListByOsVersion',{osVersion: osVersion , osName: osName , page: page , pageSize: pageSize});
}
export default {
    getOsDetailByVersion,
    queryServiceListByOsVersion,
};
