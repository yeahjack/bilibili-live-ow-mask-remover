// ==UserScript==
// @name         Bilibili Live Overwatch Area Mask Remover
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  In Bilibili live streams, an overlay mask on the left side in the Overwatch area can impact the viewing experience. This script automatically removes the mask after the webpage has fully loaded.
// @author       YeahJack
// @match        https://live.bilibili.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 创建一个观察者对象，配置观察选项：
    const observer = new MutationObserver((mutationsList, observer) => {
        // 尝试获取直播分区链接元素
        let areaLink = document.querySelector('a.area-link');

        // 检查元素是否存在以及areaId是否匹配
        if (areaLink && areaLink.href.includes('areaId=87')) {
            // 找到匹配的分区，执行删除操作
            let maskPanel = document.getElementById('web-player-module-area-mask-panel');
            if (maskPanel) {
                maskPanel.parentNode.removeChild(maskPanel);
                console.log('Specified element has been removed.');
                // 一旦完成操作，断开观察者
                observer.disconnect();
            }
        }
    });

    // 使用默认的配置(观察子节点变化)开始对body元素进行观察
    observer.observe(document.body, { childList: true, subtree: true });
})();
