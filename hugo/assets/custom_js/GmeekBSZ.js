function createBSZ() {
    var postBody = document.querySelector('.post-meta');
    if (postBody){
        postBody.insertAdjacentHTML('beforeend','<span id="busuanzi_container_page_pv" style="display:none;">&nbsp;·&nbsp;本文浏览量<span id="busuanzi_value_page_pv"></span>次</span>');
    }
}

document.addEventListener("DOMContentLoaded", function() {
    createBSZ();
    var element = document.createElement('script');
    element.src = '//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js';
    document.head.appendChild(element);
});
