function createTOC() {
    var tocElement = document.createElement('div');
    tocElement.className = 'toc';
    var contentContainer = document.querySelector('.post-content');

    if (!contentContainer) {
        return; // 如果找不到内容容器,则不创建TOC
    }

    const headings = contentContainer.querySelectorAll('h1, h2, h3, h4, h5, h6');

    if (headings.length === 0) {
        return;  // 如果没有标题元素，则不创建TOC
    }

    tocElement.insertAdjacentHTML('afterbegin', '<div class="toc-title">目录</div>');

    headings.forEach(heading => {
        if (!heading.id) {
            heading.id = heading.textContent.trim().replace(/\s+/g, '-').toLowerCase();
        }
        const link = document.createElement('a');
        link.href = '#' + heading.id;
        link.textContent = heading.textContent.replace(/#\s*$/, ''); // 删除标题末尾的 "#" 符号
        link.className = 'toc-link';
        link.style.paddingLeft = `${(parseInt(heading.tagName.charAt(1)) - 1) * 10}px`;
        tocElement.appendChild(link);
    });

    tocElement.insertAdjacentHTML('beforeend', '<a class="toc-end" onclick="window.scrollTo({top:0,behavior: \'smooth\'});">↑</a>');
    contentContainer.parentNode.insertBefore(tocElement, contentContainer);

    // 添加高亮当前目录项的功能
    highlightTOCOnScroll();
}

function highlightTOCOnScroll() {
    const headings = Array.from(document.querySelectorAll('.post-content h1, .post-content h2, .post-content h3, .post-content h4, .post-content h5, .post-content h6'));
    const tocLinks = document.querySelectorAll('.toc-link');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + 50; // 添加一个小偏移量

        let currentHeadingIndex = headings.findIndex(heading => {
            return heading.offsetTop > scrollPosition;
        });

        if (currentHeadingIndex === -1) {
            currentHeadingIndex = headings.length - 1;
        } else if (currentHeadingIndex > 0) {
            currentHeadingIndex--;
        }

        // 移除所有链接的高亮
        tocLinks.forEach(link => link.classList.remove('active'));

        // 高亮当前标题及其直接相关的上级标题
        if (currentHeadingIndex >= 0) {
            let currentLevel = parseInt(headings[currentHeadingIndex].tagName.charAt(1));
            tocLinks[currentHeadingIndex].classList.add('active');

            for (let i = currentHeadingIndex - 1; i >= 0; i--) {
                const headingLevel = parseInt(headings[i].tagName.charAt(1));
                if (headingLevel < currentLevel) {
                    tocLinks[i].classList.add('active');
                    currentLevel = headingLevel;
                }
                if (headingLevel === 1) break; // 如果到达最高级标题，停止循环
            }
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    createTOC();
    var css = `
    .toc {
        position: fixed;
        top: 130px;
        right: calc(50% + 400px); // 修改这里
        width: 300px;
        border: 1px solid #e1e4e8;
        border-radius: 6px;
        padding: 10px;
        overflow-y: auto;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        max-height: 70vh;
        background-color: rgba(255, 255, 255, 0.9); // 添加透明度
    }
    .toc-title{
        font-weight: bold;
        text-align: center;
        border-bottom: 1px solid #ddd;
        padding-bottom: 8px;
    }
    .toc-end{
        font-weight: bold;
        text-align: center;
        cursor: pointer;
        visibility: hidden;
    }  
    .toc a {
        display: block;
        color: var(--color-diff-blob-addition-num-text);
        text-decoration: none;
        padding: 5px 0;
        font-size: 14px;
        line-height: 1.5;
        border-bottom: 1px solid #e1e4e8;
    }
    .toc a:last-child {
        border-bottom: none;
    }
    .toc a:hover {
        background-color:var(--color-select-menu-tap-focus-bg);
    }
    .toc a.active {
        background-color: var(--color-select-menu-tap-focus-bg);
        font-weight: bold;
    }
    @media (max-width: 1249px) 
    {
        .toc{
            position:static;
            top:auto;
            left:auto;
            transform:none;
            padding:10px;
            margin-bottom:20px;
        }
    }`;

    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    window.onscroll = function () {
        const backToTopButton = document.querySelector('.toc-end');
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopButton.style = "visibility: visible;"
        } else {
            backToTopButton.style = "visibility: hidden;"
        }
    };

});
