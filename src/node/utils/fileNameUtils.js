// src/node/utils/fileNameUtils.js

import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

/**
 * 处理文件名，避免 URL 冲突。使用哈希值来确保唯一性。
 * @param {Object} fileNames 文件名映射对象
 * @returns {Object} 新的文件名映射对象
 */
export function processFileNames(fileNames) {
  const result = {};
  const seenUrls = new Map(); // 用来存储已见过的 URL

  // 遍历每个文件路径及对应的 URL
  for (const [filePath, url] of Object.entries(fileNames)) {
    // 获取文件名，使用正则提取文件名部分
    const fileName = filePath.split('/').pop();
    
    // 检查 URL 是否已经出现过
    let uniqueFileName;
    if (seenUrls.has(url)) {
      uniqueFileName = seenUrls.get(url); // 如果 URL 已经存在，使用存储的文件名
    } else {
      // 生成 8 位 UUID 或哈希来避免文件名冲突
      uniqueFileName = filePath.replace('*', fileName).replace('&', generateHash(url));
      seenUrls.set(url, uniqueFileName); // 记录这个 URL 的文件名
    }

    // 创建新的文件名映射
    result[uniqueFileName] = url;
  }

  return result;
}

/**
 * 生成一个基于 URL 的哈希值（前 8 位）
 * @param {string} url 要哈希化的 URL
 * @returns {string} 生成的哈希值
 */
function generateHash(url) {
  return crypto.createHash('md5').update(url).digest('hex').slice(0, 8);
}
