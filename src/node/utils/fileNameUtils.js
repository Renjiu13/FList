
// src/node/utils/fileNameUtils.js

/**
 * 从 URL 自动提取文件名
 * @param {string} url - 要处理的文件 URL
 * @param {Object} options - 可选配置
 * @param {boolean} options.preserveOriginal - 是否保留原始文件名
 * @param {string} options.prefix - 文件名前缀
 * @returns {string} 处理后的文件名
 */
export function autoFileName(url, options = {}) {
  const {
    preserveOriginal = false,
    prefix = ''
  } = options;

  try {
    const urlObject = new URL(url);
    const pathParts = urlObject.pathname.split('/');
    const originalFileName = pathParts[pathParts.length - 1];

    if (preserveOriginal) {
      return `${prefix}${originalFileName}`;
    }

    // 使用 UUID 或时间戳作为文件名
    const timestamp = Date.now();
    const fileExtension = originalFileName.split('.').pop();
    return `${prefix}${timestamp}.${fileExtension}`;
  } catch (error) {
    console.error('URL 处理错误:', error);
    return `${prefix}unknown_file_${Date.now()}.bin`;
  }
}

/**
 * 批量处理文件名的函数
 * @param {Object} fileMap - 原始文件映射
 * @returns {Object} 处理后的文件映射
 */
export function processFileNames(fileMap, options = {}) {
  const processedMap = {};
  
  Object.entries(fileMap).forEach(([originalPath, url]) => {
    if (originalPath.includes('*')) {
      // 通配符处理
      const newFileName = autoFileName(url, options);
      const newPath = originalPath.replace('*', newFileName);
      processedMap[newPath] = url;
    } else {
      // 保持原样
      processedMap[originalPath] = url;
    }
  });

  return processedMap;
}
