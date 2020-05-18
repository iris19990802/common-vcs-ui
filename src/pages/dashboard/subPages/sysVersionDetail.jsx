import React from 'react';
import { connect } from 'dva';
import { history } from 'umi';
import { Row, Col, Table } from 'antd';
import EditCell from './components/editorCell';
import styles from './styles.less';

function sysVersionDetail(props) {
  const { sysDetail, dispatch } = props;
  const { OSDetail, saData } = sysDetail;

  const modelMap = saData.rows.reduce(
    (prev, curr) =>
      (prev[curr.moduleId] = prev[curr.moduleId]
        ? prev[curr.moduleId] + 1
        : 1) && prev,
    {},
  );

  const showAppDetail = ({ moduleId, serviceName }) => {
    history.push(
      `?tab=app2Version&moduleId=${moduleId}&serviceName=${serviceName}`,
    );
  };

  const mergeModelColumn = (text, record, index) => {
    if (index > 0) {
      return {
        children: text,
        props: {
          rowSpan:
            record.moduleId === saData.rows[index - 1].moduleId
              ? 0
              : modelMap[record.moduleId],
        },
      };
    }
    return {
      children: text,
      props: {
        rowSpan: modelMap[record.moduleId],
      },
    };
  };

  const column = [
    {
      title: '模块名',
      dataIndex: 'moduleName',
      render: mergeModelColumn,
    },
    {
      title: '模块版本',
      dataIndex: 'moduleVersion',
      render: mergeModelColumn,
    },
    {
      title: '模块进度',
      dataIndex: 'moduleProgress',
      render: (text, record, index) =>
        mergeModelColumn(
          <EditCell
            display={`${Math.floor(text * 100)}%`}
            value={text}
            onChange={v => {
              dispatch({
                type: 'dashboard/editModuleProgress',
                payload: {
                  moduleId: record.moduleId,
                  moduleProgress: parseFloat(v),
                },
              });
            }}
          />,
          record,
          index,
        ),
    },
    {
      title: '服务名',
      dataIndex: 'serviceName',
    },
    {
      title: '服务进度',
      dataIndex: 'serviceProgress',
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
        <a onClick={() => showAppDetail({ ...record })}>详情</a>
      ),
    },
  ];

  return (
    <div className={styles.sysVersion}>
      <Row>
        <Col>
          <b>计划release日期：</b>
          {OSDetail.osDate}
        </Col>
      </Row>
      <Row>
        <Col>
          <b>版本特性：</b>
          {OSDetail.osRemark}
        </Col>
      </Row>
      <Table
        rowKey="id"
        dataSource={saData.rows}
        columns={column}
        bordered
        pagination={{
          defaultCurrent: saData.page,
          defaultPageSize: 100,
          total: saData.records,
          onChange: (page, defaultPageSize) =>
            dispatch({
              type: 'sysDetail/queryServiceListByOsVersion',
              payload: {
                osVersion: OSDetail.osVersion,
                osName: OSDetail.osName,
                page: page,
                pageSize: defaultPageSize,
              },
            }),
        }}
      />
    </div>
  );
}

export default connect(({ sysDetail, router }) => ({
  sysDetail,
  location: router.location,
}))(sysVersionDetail);
