// src/node/utils/fileNameUtils.js

/**
 * 从 URL 自动提取文件名
 * @param {string} url - 要处理的文件 URL
 * @param {string} placeholder - 占位符类型，'*' 表示原始文件名，'&' 表示时间戳文件名
 * @param {string} prefix - 文件名前缀
 * @returns {string} 处理后的文件名
 */
export function autoFileName(url, placeholder = '*', prefix = '') {
  try {
    const urlObject = new URL(url);
    const pathParts = urlObject.pathname.split('/');
    const originalFileName = pathParts[pathParts.length - 1];
    const fileExtension = originalFileName.split('.').pop();

    switch (placeholder) {
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
 * @param {Object} fileMap - 原始文件映射对象，键为文件路径，值为文件 URL
 * @param {Object} options - 配置选项
 * @param {string} options.prefix - 文件名前缀
 * @returns {Object} 处理后的文件映射对象
 * 
 * @example
 * const fileMap = {
 *   "/路径/*": "https://example.com/file1.zip",
 *   "/路径/&": "https://example.com/file2.zip",
 *   "/路径/*_backup": "https://example.com/file3.zip"
 * };
 * const processedMap = processFileNames(fileMap, { prefix: 'prefix_' });
 * console.log(processedMap);
 * // 输出:
 * // {
 * //   "/路径/prefix_file1.zip": "https://example.com/file1.zip",
 * //   "/路径/prefix_1672531200000.zip": "https://example.com/file2.zip",
 * //   "/路径/prefix_file3.zip_backup": "https://example.com/file3.zip"
 * // }
 */
export function processFileNames(fileMap, options = {}) {
  const { prefix = '' } = options;
  const processedMap = {};

  Object.entries(fileMap).forEach(([originalPath, url]) => {
    let newPath = originalPath;

    if (originalPath.includes('*')) {
      // 使用原始文件名替换 "*"
      const newFileName = autoFileName(url, '*', prefix);
      newPath = newPath.replace('*', newFileName);
    }

    if (newPath.includes('&')) {
      // 使用时间戳文件名替换 "&"
      const newFileName = autoFileName(url, '&', prefix);
      newPath = newPath.replace('&', newFileName);
    }

    // 将新路径与 URL 映射
    processedMap[newPath] = url;
  });

  return processedMap;
}
