import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { history } from 'umi';
import { useLocation } from 'react-router-dom';
import { Table, Breadcrumb, Input, Button, Form } from 'antd';
import EditCell from './components/editorCell';
import { setQuery } from '@/utils/utils';

function saVersion(props) {
  const { dashboard, dispatch, app2Version } = props;
  const { saData } = dashboard;
  const { query } = useLocation();
  const [moduleVersion, setModuleVersion] = useState(undefined);
  const [moduleName, setModuleName] = useState(undefined);
  const [osVersion, setOsVersion] = useState(undefined);

  const modelMap = saData.rows.reduce(
    (prev, curr) =>
      (prev[curr.moduleId] = prev[curr.moduleId]
        ? prev[curr.moduleId] + 1
        : 1) && prev,
    {},
  );
  console.log(modelMap);

  const onQuery = ({
    page,
    pageSize,
    moduleVersion,
    moduleName,
    osVersion,
  }) => {
    history.push(
      `?${setQuery({
        ...query,
        page,
        pageSize,
        moduleVersion,
        moduleName,
        osVersion,
      })}`,
    );
  };

  useEffect(() => {
    if (query.moduleVersion || query.moduleName || query.osVersion) {
      setModuleName(query.moduleName);
      setModuleVersion(query.moduleVersion);
      setOsVersion(query.osVersion);
    } else {
      setModuleName(undefined);
      setModuleVersion(undefined);
      setOsVersion(undefined);
    }
  }, [query]);

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

  const showAppDetail = ({ moduleId, serviceName }) => {
    history.push(
      `?tab=app2Version&moduleId=${moduleId}&serviceName=${serviceName}`,
    );
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
      title: '操作系统版本',
      dataIndex: 'os',
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
    <div>
      <Breadcrumb separator=">">
        <Breadcrumb.Item>SA版本</Breadcrumb.Item>
        <Breadcrumb.Item>SA列表</Breadcrumb.Item>
      </Breadcrumb>
      <Form layout="inline">
        <Form.Item label="模块版本">
          <Input
            value={moduleVersion}
            onChange={e => setModuleVersion(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="模块名">
          <Input
            value={moduleName}
            onChange={e => setModuleName(e.target.value)}
          />
        </Form.Item>
        <Form.Item label="系统版本">
          <Input
            value={osVersion}
            onChange={e => setOsVersion(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            onClick={() => {
              onQuery({ moduleVersion, moduleName, osVersion });
            }}
          >
            查询
          </Button>
        </Form.Item>
      </Form>
      <Table
        rowKey="id"
        dataSource={saData.rows}
        columns={column}
        bordered
        pagination={{
          defaultCurrent: saData.page,
          defaultPageSize: 100,
          total: saData.records,
          onChange: (page, pageSize) =>
            onQuery({
              page,
              pageSize,
              moduleVersion,
              moduleName,
              osVersion,
            }),
        }}
      />
    </div>
  );
}

export default connect(({ dashboard, app2Version, router }) => ({
  app2Version,
  dashboard,
  location: router.location,
}))(saVersion);

// export default appVersion;
