// src/node/utils/fileNameUtils.js

/**
 * 从 URL 自动提取文件名
 * @param {string} url - 要处理的文件 URL
 * @param {Object} options - 可选配置
 * @returns {string} 处理后的文件名
 */
export function autoFileName(url, type = '*', prefix = '') {
  try {
    const urlObject = new URL(url);
    const pathParts = urlObject.pathname.split('/');
    const originalFileName = pathParts[pathParts.length - 1];
    const fileExtension = originalFileName.split('.').pop();

    switch(type) {
      case '*':
        // 使用原始文件名
        return `${prefix}${originalFileName}`;
      case '&':
        // 使用时间戳作为文件名
        const timestamp = Date.now();
        return `${prefix}${timestamp}.${fileExtension}`;
      default:
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
      // 通配符处理
      const wildcardType = originalPath.includes('*') ? '*' : '&';
      const newFileName = autoFileName(url, wildcardType, options.prefix || '');
      const newPath = originalPath.replace(/[*&]/, newFileName);
      processedMap[newPath] = url;
    } else {
      // 保持原样
      processedMap[originalPath] = url;
    }
  });

  return processedMap;
}