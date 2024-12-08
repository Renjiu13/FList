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
    const fileExtension = originalFileName.split('.').pop();

    // 生成一个唯一的标识符
    const uniqueSuffix = Date.now() + Math.random().toString(36).substr(2, 9);

    switch(type) {
      case '*':
        // 使用原始文件名
        return `${prefix}${originalFileName}`;
      case '&':
        // 使用时间戳和唯一后缀作为文件名，避免重复
        return `${prefix}${Date.now()}_${uniqueSuffix}.${fileExtension}`;
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
      // 处理含有代表符号的路径
      const wildcardType = originalPath.includes('*') ? '*' : '&';
      const newFileName = autoFileName(url, wildcardType, options.prefix || '');
      
      // 用唯一的文件名替换路径中的代表符号
      const newPath = originalPath.replace(/[*&]/, newFileName);
      processedMap[newPath] = url;
    } else {
      // 保持原样
      processedMap[originalPath] = url;
    }
  });

  return processedMap;
}