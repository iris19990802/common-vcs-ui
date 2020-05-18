import React, { useState } from 'react';
import { connect } from 'dva';
import { Row, Col, Progress, Button } from 'antd';
import SysVersionDetail from './sysVersionDetail';
import styles from './styles.less';

function sysVersion(props) {
  const { dashboard, dispatch } = props;
  const { sysVersion } = dashboard;
  const [showDetail, setShowDetail] = useState(false);

  const wipVersion = sysVersion.find(item => item.isHistory === 0);
  const historyVersion = sysVersion.filter(item => item.isHistory === 1);

  if (showDetail) {
    return (
      <>
        <Button onClick={() => setShowDetail(false)}>返回</Button>
        <SysVersionDetail />
      </>
    );
  }

  return (
    <div className={styles.sysVersion}>
      <Row span={24}>
        <Col span={3}>
          <b>开发中版本：</b>
          {wipVersion.osVersion}
        </Col>
        <Col span={10}>
          <Progress percent={wipVersion.osProgress * 100} />
        </Col>
        <Col offset={1}>
          <a
            onClick={() => {
              dispatch({
                type: 'sysDetail/getOsDetailByVersion',
                payload: {
                  osName: wipVersion.osName,
                  osVersion: wipVersion.osVersion,
                },
              });
              dispatch({
                type: 'sysDetail/queryServiceListByOsVersion',
                payload: {
                  osName: wipVersion.osName,
                  osVersion: wipVersion.osVersion,
                  page: 1,
                  pageSize: 100,
                },
              });
              setShowDetail(true);
            }}
          >
            详情
          </a>
        </Col>
      </Row>
      <Row>
        <Col>
          <b>计划release日期：</b>
          {wipVersion.osDate}
        </Col>
      </Row>
      <Row>
        <Col>
          <b>版本特性：</b>
          {wipVersion.osRemark}
        </Col>
      </Row>
      <Row>
        <Col>
          <b>历史版本列表：</b>
        </Col>
        <Col>
          {historyVersion.map(item => (
            <div key={item.osVersion}>
              > {item.osDate} {item.osName} {item.osVersion}
              <a
                onClick={() => {
                  dispatch({
                    type: 'sysDetail/getOsDetailByVersion',
                    payload: {
                      osName: item.osName,
                      osVersion: item.osVersion,
                    },
                  });
                  dispatch({
                    type: 'sysDetail/queryServiceListByOsVersion',
                    payload: {
                      osName: item.osName,
                      osVersion: item.osVersion,
                      page: 1,
                      pageSize: 100,
                    },
                  });
                  setShowDetail(true);
                }}
              >
                详情
              </a>
            </div>
          ))}
        </Col>
      </Row>
    </div>
  );
}

export default connect(({ dashboard, router }) => ({
  dashboard,
  location: router.location,
}))(sysVersion);
