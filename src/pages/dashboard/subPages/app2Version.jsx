import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'dva';
import { history } from 'umi';
import { Table, Row, Col, Progress, Button, Form } from 'antd';
import styles from './styles.less';
import ServiceDetailModal from './serviceDetailModal';
import { useEffect } from 'react';

function app2Version(props) {
  const { app2Version, dashboard, dispatch } = props;
  const { saData } = dashboard;
  const { serviceDetail } = app2Version;
  const { query } = useLocation();

  const [showDetail, setShowDetail] = useState(false);

  const showAppDetail = ({ moduleId, serviceName }) => {
    history.push(
      `?tab=app2Version&moduleId=${moduleId}&serviceName=${serviceName}`,
    );
  };

  useEffect(() => {
    if (query.serviceName && query.moduleId) {
      dispatch({
        type: 'app2Version/getOneServiceByModule',
        payload: { ...query },
      });

      setShowDetail(true);
    } else {
      setShowDetail(false);
    }
  }, [query]);

  const column = [
    {
      title: '应用服务名',
      dataIndex: 'serviceName',
    },
    {
      title: '开发进度',
      dataIndex: 'serviceProgress',
      render: text => `${Math.floor(text * 100)}%`,
    },
    {
      title: '功能',
      dataIndex: 'function',
    },
    {
      title: '代码分支',
      dataIndex: 'codeBranch',
    },
    {
      title: '计划tag',
      dataIndex: 'serviceTag',
    },
    {
      title: '负责人',
      dataIndex: 'manager',
    },
    {
      title: '更多',
      dataIndex: 'more',
      render: (_, record) => (
        <a
          onClick={() => {
            showAppDetail({ ...record });
          }}
        >
          详情
        </a>
      ),
    },
  ];
  if (showDetail) {
    return (
      <>
        <Button onClick={() => history.goBack()}>返回</Button>
        <ServiceDetailModal data={serviceDetail} />
      </>
    );
  }

  return (
    <div className={styles.sysVersion}>
      <Table
        rowKey="serviceName"
        dataSource={saData.rows}
        columns={column}
        bordered
        pagination={{
          defaultCurrent: saData.page,
          defaultPageSize: 100,
          total: saData.records,
          onChange: (page, defaultPageSize) =>
            dispatch({
              type: 'dashboard/getAllService',
              payload: { page, defaultPageSize },
            }),
        }}
      />
    </div>
  );
}

export default connect(({ app2Version, dashboard, router }) => ({
  app2Version,
  dashboard,
  location: router.location,
}))(app2Version);
