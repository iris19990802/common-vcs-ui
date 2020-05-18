import React from 'react';
import PropTypes from 'prop-types';
import Link from 'umi/link';
import { Breadcrumb } from 'antd';
import styles from './breadcrumbs.less';
import usePathChange from '@/utils/usePathChange';

function MyBreadcrumbs(props) {
    const {
        style, className, location
    } = props;
    const { pathname } = location;
    const { paths } = usePathChange(pathname);
    const len = paths.length;

    const breadcrumbs = paths.map((item, idx) => (
        <Breadcrumb.Item key={`${item.path}`}>
            {idx === len - 1 ? item.name : <Link to={`${item.path}`}>{item.name}</Link>}
        </Breadcrumb.Item>
    ));

    return (
        <div className={`${styles.container} ${className}`} style={{ ...style }}>
            <Breadcrumb style={{ margin: '16px 0' }}>{breadcrumbs}</Breadcrumb>
        </div>
    );
}

MyBreadcrumbs.propTypes = {
    menuConfig: PropTypes.shape({}),
    location: PropTypes.shape({}),
    style: PropTypes.shape({}),
    className: PropTypes.string
};

MyBreadcrumbs.defaultProps = {
    location: {},
    menuConfig: {},
    style: {},
    className: ''
};

export default MyBreadcrumbs;
