import React from 'react';
import { Form, Progress } from 'antd';
import styles from './styles.less';

function app2Version(props) {
  const { data } = props;

  const keyMap = {
    serviceId: '服务ID',
    serviceName: '服务名称',
    function: '功能',
    serviceProgress: {
      label: '开发进度',
      component: value => <Progress percent={value * 100} />,
    },
    codeBranch: '代码分支',
    serviceTag: '计划Tag',
    manager: '负责人',
    domain: 'domain',
    isCloud: '是否是',
    localContainerPort: '本地容器端口',
    cloudContainerPort: '云端容器端口',
    localPort: '本地端口',
    cloudPort: '云端端口',
    serviceKind: '微服务',
    githubLocation: 'gitlab项目地址',
    configLocal: '本地配置地址',
    isServer: '前端/服务端',
    dependency: '依赖服务',
    loadPriority: '启动优先级',
    duplication: '部署副本数量',
    logDir: '日志目录',
    dataDir: '数据目录挂载',
    moduleName: '所属模块名称',
    moduleVersion: '所属模块版本',
  };
  return (
    <div className={styles.sysVersion}>
      {Object.entries(keyMap).map(([key, value]) => (
        <Form.Item
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 6 }}
          label={typeof value === 'object' ? value.label : value}
        >
          {typeof value === 'object' ? value.component(data[key]) : data[key]}
        </Form.Item>
      ))}
    </div>
  );
}

export default app2Version;
