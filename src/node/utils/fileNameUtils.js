// src/node/utils/fileNameUtils.js 

/**
 * 从 URL 自动提取文件名
 * @param {string} url - 要处理的文件 URL
 * @param {string} type - 代表符号，默认为 '*'，表示使用原始文件名
 * @param {string} prefix - 文件名前缀
 * @returns {string} 处理后的文件名
 */
export function autoFileName(url, type = '*', prefix = '') {
  try {
    const urlObject = new URL(url);
    const pathParts = urlObject.pathname.split('/');
    const originalFileName = pathParts[pathParts.length - 1];

    switch (type) {
      case '*':
        // 使用原始文件名（包含扩展名）
        return `${prefix}${originalFileName}`;
      case '&':
        // 使用时间戳和唯一标识符生成文件名
        const timestamp = Date.now();
        const uniqueSuffix = Math.random().toString(36).substr(2, 9);
        const fileExtension = originalFileName.split('.').pop();
        return `${prefix}${timestamp}_${uniqueSuffix}.${fileExtension}`;
      default:
        // 默认返回原始文件名
        return `${prefix}${originalFileName}`;
    }
  } catch (error) {
    console.error('URL 处理错误:', error);
    return `${prefix}unknown_file_${Date.now()}.bin`;
  }
}

/**
 * 批量处理文件名的函数
 * @param {Object} fileMap - 原始文件映射
 * @param {Object} options - 配置选项
 * @returns {Object} 处理后的文件映射
 */
export function processFileNames(fileMap, options = {}) {
  const processedMap = {};

  Object.entries(fileMap).forEach(([originalPath, url]) => {
    if (originalPath.includes('*') || originalPath.includes('&')) {
      const wildcardType = originalPath.includes('*') ? '*' : '&';
      const newFileName = autoFileName(url, wildcardType, options.prefix || '');

      // 替换路径中的通配符符号
      let newPath = originalPath;
      if (originalPath.includes('*')) {
        newPath = newPath.replace('*', newFileName);
      }
      if (originalPath.includes('&')) {
        newPath = newPath.replace('&', newFileName);
      }
      processedMap[newPath] = url;
    } else {
      // 保持原路径和 URL 不变
      processedMap[originalPath] = url;
    }
  });

  return processedMap;
}