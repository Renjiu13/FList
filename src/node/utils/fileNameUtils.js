// src/node/utils/fileNameUtils.js

/**
 * 提取文件名信息
 * @param {string} fileName - 原始文件名
 * @returns {Object} 包含文件名详细信息的对象
 */
function extractFileInfo(fileName) {
  // 处理特殊情况和多点文件名
  const parts = fileName.split('.');
  
  // 没有扩展名的情况
  if (parts.length === 1) {
    return {
      baseName: fileName,
      extension: '',
      fullName: fileName
    };
  }
  
  // 标准情况：最后一个作为扩展名
  const extension = parts.pop().toLowerCase();
  const baseName = parts.join('.');
  
  return {
    baseName,
    extension, 
    fullName: fileName
  };
}

/**
 * 生成指定长度的 UUID
 * @param {number} length - 生成 UUID 的长度
 * @returns {string} 生成的 UUID 字符串
 */
function generateUUID(length = 8) {
  // 生成一个标准的 UUID 字符串并返回前 `length` 个字符
  const uuid = crypto.randomUUID();  // 使用浏览器内置的 crypto API 生成 UUID
  return uuid.replace(/-/g, '').slice(0, length);  // 去除 '-' 并取前 `length` 位
}

/**
 * 从 URL 自动提取文件名
 * @param {string} url - 要处理的文件 URL
 * @param {string} placeholder - 占位符类型，'*' 表示原始文件名，'&' 表示8位UUID文件名
 * @param {string} prefix - 文件名前缀
 * @returns {string} 处理后的文件名
 */
export function autoFileName(url, placeholder = '*', prefix = '') {
  try {
    const urlObject = new URL(url);
    const pathParts = urlObject.pathname.split('/');
    const originalFileName = decodeURIComponent(pathParts[pathParts.length - 1]);
    
    // 使用新的文件名解析方法
    const { baseName, extension, fullName } = extractFileInfo(originalFileName);

    switch (placeholder) {
      case '*':
        // 使用原始文件名
        return `${prefix}${fullName}`;
      case '&':
        // 使用 8 位 UUID 作为文件名
        const uuid = generateUUID(8);
        return extension 
          ? `${prefix}${uuid}.${extension}`  // 有扩展名
          : `${prefix}${uuid}`;  // 无扩展名
      default:
        return `${prefix}${fullName}`;
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
 * //   "/路径/prefix_8e4c63d0.zip": "https://example.com/file2.zip",  // 8 位 UUID
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
      // 使用 8 位 UUID 替换 "&"
      const newFileName = autoFileName(url, '&', prefix);
      newPath = newPath.replace('&', newFileName);
    }

    // 将新路径与 URL 映射
    processedMap[newPath] = url;
  });

  return processedMap;
}