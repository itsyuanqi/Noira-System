// 读取 Markdown 文件
async function loadMarkdown(path) {
  try {
    const resp = await fetch(path);

    if (!resp.ok) {
      // HTTP 错误：状态码 + 状态文本
      console.error(`HTTP 错误: ${resp.status} ${resp.statusText}`);
      return `# 加载失败\nHTTP 错误: ${resp.status} ${resp.statusText}`;
    }

    const text = await resp.text();
    if (!text) {
      console.warn(`文件为空: ${path}`);
      return `# 加载失败\n文件内容为空: ${path}`;
    }

    return text;

  } catch (err) {
    // 捕获网络错误或其他异常
    console.error(`无法读取文件 "${path}":`, err);
    return `# 加载失败\n无法读取文件 "${path}"\n错误信息: ${err.message}`;
  }
}


// 去掉 Front Matter
function stripFrontMatter(mdText) {
  return mdText.replace(/^---\n[\s\S]*?\n---\n/, '');
}

// 创建 Markdown-it 实例
function createMarkdownIt() {
  return window.markdownit({
    html: true,
    linkify: true,
    typographer: true
  })
    .use(window.markdownitEmoji)
    .use(window.markdownitFootnote)
    .use(window.markdownitTaskLists, { enabled: true })
    .use(window.markdownitSub)
    .use(window.markdownitSup)
    .use(window.markdownitMark)
    .use(markdownItCustomContainers);
}

// 替换 Mermaid 代码块
function convertMermaidBlocks(html) {
  return html.replace(/<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g, (match, code) => {
    code = code.replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&');
    return `<div class="mermaid">${code}</div>`;
  });
}

// 通用渲染逻辑
function renderHtmlFromMarkdownText(mdText) {
  mdText = stripFrontMatter(mdText);
  const md = createMarkdownIt();
  let html = md.render(mdText);
  html = convertMermaidBlocks(html);

  // 创建新节点
  const newContainer = document.createElement('div');
  newContainer.innerHTML = DOMPurify.sanitize(html);
  newContainer.style.opacity = 0;
  newContainer.style.transition = 'opacity 0.3s, transform 0.3s';
  newContainer.style.transform = 'translateY(10px)';

  const container = document.getElementById('markdown-container');

  // 插入新节点
  container.appendChild(newContainer);

  // 等一帧后触发过渡
  requestAnimationFrame(() => {
    newContainer.style.opacity = 1;
    newContainer.style.transform = 'translateY(0)';
  });

  // 删除旧节点
  const oldNodes = Array.from(container.children).filter(node => node !== newContainer);
  oldNodes.forEach(node => {
    node.style.transition = 'opacity 0.2s, transform 0.2s';
    node.style.opacity = 0;
    node.style.transform = 'translateY(-10px)';
    setTimeout(() => node.remove(), 200);
  });

  // Mermaid 和公式渲染
  if (window.mermaid) {
    mermaid.init(undefined, newContainer.querySelectorAll('.mermaid'));
  }

  if (window.renderMathInElement) {
    renderMathInElement(newContainer, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false }
      ]
    });
  }
}


// 渲染 Markdown 文件
async function renderMarkdown(path) {
  const mdText = await loadMarkdown(path);
  renderHtmlFromMarkdownText(mdText);
}

// 直接渲染 Markdown 文本
function renderDirectly(mdString) {
  renderHtmlFromMarkdownText(mdString);
}

function markdownItCustomContainers(md) {
  md.block.ruler.before('fence', 'custom_block', function (state, startLine, endLine, silent) {
    let pos = state.bMarks[startLine] + state.tShift[startLine];
    let max = state.eMarks[startLine];
    let marker = ':::';

    if (state.src.slice(pos, pos + marker.length) !== marker) return false;

    let markup = state.src.slice(pos, max).trim();
    if (!markup.startsWith(':::center')) return false;

    let nextLine = startLine;
    for (;;) {
      nextLine++;
      if (nextLine >= endLine) break;
      pos = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];
      if (state.src.slice(pos, max).trim() === ':::') break;
    }

    let token = state.push('center_open', 'div', 1);
    token.attrs = [['style', 'text-align:center']];

    state.md.block.tokenize(state, startLine + 1, nextLine);

    token = state.push('center_close', 'div', -1);

    state.line = nextLine + 1;
    return true;
  });

  md.renderer.rules.center_open = () => `<div style="text-align:center;">`;
  md.renderer.rules.center_close = () => `</div>`;
}

// 生成左侧文件树
function generateFileTree(tree) {
  const ul = document.createElement('ul');

  tree.forEach(item => {
    const li = document.createElement('li');

    const label = document.createElement('span');
    label.textContent = item.name;
    li.appendChild(label);

    if (item.path) {
      label.addEventListener('click', () => renderMarkdown(item.path));
    }

    if (item.children) {
      li.appendChild(generateFileTree(item.children));
    }

    ul.appendChild(li);
  });

  return ul;
}

async function loadFileTree() {
  try {
    const resp = await fetch('file-tree.json');
    if (!resp.ok) throw new Error(`加载文件树失败: ${resp.status}`);
    const tree = await resp.json();

    function prefixMdPath(nodeList) {
      nodeList.forEach(node => {
        if (node.path && node.path.endsWith('.md')) {
          node.path = 'md/' + node.path;
        }
        if (node.children) prefixMdPath(node.children);
      });
    }
    prefixMdPath(tree);

    return tree;
  } catch (err) {
    console.error(err);
    return [];
  }
}

// 初始化文件树
async function initFileTree() {
  const FILE_TREE = await loadFileTree();
  const container = document.getElementById('file-tree');
  const treeDom = generateFileTree(FILE_TREE);
  container.appendChild(treeDom);

  const firstFile = findFirstFile(FILE_TREE);
  if (firstFile) renderMarkdown(firstFile.path);
}

// 页面初始化
window.addEventListener('DOMContentLoaded', initFileTree);

// 查找第一个文件
function findFirstFile(tree) {
  for (const item of tree) {
    if (item.path) return item;
    if (item.children) {
      const found = findFirstFile(item.children);
      if (found) return found;
    }
  }
  return null;
}
