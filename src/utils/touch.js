/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */

function closest(el, selector) {
    const matchesSelector = el.matches
        || el.webkitMatchesSelector
        || el.mozMatchesSelector
        || el.msMatchesSelector;
    while (el) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}

/**
 * 修复antd-mobile Modal组件touch事件穿透
 * 需要滚动的地方请加class: 'scroller'
 * 参考代码:
 * https://mobile.ant.design/components/modal-cn/
 * http://www.zhangxinxu.com/study/201612/mobile-scroll-prevent-window-scroll.html
 */

function fixModal() {
    const data = {
        scroller: null,
        posY: 0,
        scrollY: 0,
        maxscroll: 0
    };

    function isIosModalVisible() {
        return (
            /iPhone|iPod|iPad/i.test(navigator.userAgent)
            && document.body.style.overflow === 'hidden'
            && document.querySelectorAll('.am-modal').length > 0
        );
    }

    document.body.addEventListener(
        'touchstart',
        (e) => {
            if (!isIosModalVisible()) return;

            const scroller = closest(e.target, '.scroller');
            if (!scroller) return;

            data.scroller = scroller;
            // 垂直位置标记
            data.posY = e.touches[0].pageY;
            data.scrollY = scroller.scrollTop;
            // 是否可以滚动
            data.maxscroll = scroller.scrollHeight - scroller.clientHeight;
        }, {
            passive: false
        }
    );

    document.body.addEventListener(
        'touchmove',
        (e) => {
            if (!isIosModalVisible()) return;

            if (!data.scroller) {
                return e.preventDefault();
            }

            const scrollTop = data.scroller.scrollTop;
            const distanceY = e.touches[0].pageY - data.posY;

            // 上下边缘检测
            if (distanceY > 0 && scrollTop === 0) {
                // 往上滑，并且到头
                // 禁止滚动的默认行为
                return e.preventDefault();
            }

            // 下边缘检测
            if (distanceY < 0 && scrollTop + 1 >= data.maxscroll) {
                // 往下滑，并且到头
                // 禁止滚动的默认行为
                return e.preventDefault();
            }
        }, {
            passive: false
        }
    );

    document.body.addEventListener(
        'touchend',
        () => {
            if (!isIosModalVisible()) return;
            data.scroller = null;
            data.maxscroll = 0;
        }, {
            passive: false
        }
    );
}

export {
    closest,
    fixModal,
};
