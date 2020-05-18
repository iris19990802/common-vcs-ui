import { useMemo } from 'react';
import menuConfig from '@config/menu.config.js';

/**
 *  扁平化菜单（主要是剔除group菜单）
 * @param {*} menus
 */
const flattenMenu = menus => menus.reduce((arr, item) => {
    if (item.type === 'group') {
        return arr.concat(flattenMenu(item.children));
    }
    return arr.concat(item);
}, []);

/**
 * 显示当前路径所有能匹配的路由信息
 * @param {*} pathname
 * @param {*} menuConfig
 * @description /a/b/c，则返回/, /a, /a/b, /a/b/c 以及他们分别对应的名称
 */

function pathChange() {
    // 缓存数据
    let mainMenu = [];
    let selectMainMenu = null;
    let subMenu = [];
    let paths = [];
    let prePath = '';
    let prePathName = '';
    return (pathname, config, type) => {
        // 只有当pathName不一致的时候才计算, 包括多次执行，只返回第一次的结果
        if (prePathName !== pathname) {
            let sub = '';
            const pathArr = pathname.split('/');
            paths = [];

            // 获取当前的subdomain信息，可能是其主菜单
            if (pathArr[1]) {
                sub = pathArr[1];
            }

            const filterMenu = (menus) => {
                if (menus) {
                    return menus
                        .filter(menu => menu.show !== false)
                        .map(menu => ({ ...menu, children: filterMenu(menu.children) }));
                }
                return undefined;
            };

            const newMenuConfig = filterMenu(config);

            // 当前主菜单只有以下两种情况:
            // - subPath能匹配的
            // - '/'
            // 如果都没找到，说明没有匹配的主菜单

            if (type === 'top-side') {
                mainMenu = newMenuConfig;
                selectMainMenu = newMenuConfig.find(
                    menu => menu.showMenu !== false && menu.path === sub
                )
                    || newMenuConfig.find(menu => menu.path === '/') || {
                    path: '/',
                    name: '首页'
                };
                subMenu = selectMainMenu.children;
            } else if (type === 'side') {
                subMenu = newMenuConfig;
            }

            /**
             * 开始设置paths
             */
            // 查找'/'有没有重定向
            const indexRedirect = config.find(menu => menu.path === '/');
            paths.push({
                path: '/',
                name: '首页',
                redirect: indexRedirect && indexRedirect.redirect
            });
            // 如果当前选中的不是'/'，则将其加入paths
            if (selectMainMenu && selectMainMenu.path !== '/') {
                paths.push({
                    name: selectMainMenu.name,
                    path: `/${selectMainMenu.path}`,
                    redirect: selectMainMenu.redirect
                });
            }
            // 确定初始化的path,以便后面路径拼接，需要把'/'转换成''
            const initPrePath = selectMainMenu && selectMainMenu.path !== '/' ? `/${selectMainMenu.path}` : '';

            pathname.split('/').reduce(
                (pre, curPath) => {
                    // eslint-disable-next-line no-shadow
                    const { menus, prePath } = pre;
                    if (menus) {
                        const newMenus = flattenMenu(menus);
                        const find = newMenus
                        // eslint-disable-next-line max-len
                            && newMenus.find(menu => menu.showMenu !== false && menu.path === curPath);
                        const path = `${prePath}/${curPath}`;
                        if (find) {
                            paths.push({ path, name: find.name, redirect: find.redirect });
                            return { menus: find.children, prePath: path };
                        }
                        return { menus: newMenus, prePath };
                    }
                    return { menus, prePath };
                },
                { menus: subMenu, prePath: initPrePath }
            );
            prePath = initPrePath;
            prePathName = pathname;
        }
        return {
            selectMainMenu,
            mainMenu,
            subMenu,
            paths,
            prePath
        };
    };
}
const usePathChange = pathChange();
// 通过useMemo，保证重渲染但pathname不变的时候，不重新计算数据
// eslint-disable-next-line max-len
export default (pathname, config = menuConfig, type = 'side') => useMemo(() => usePathChange(pathname, config, type), [pathname]);
