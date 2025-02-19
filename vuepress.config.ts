// 导入基础模块
import { viteBundler } from '@vuepress/bundler-vite';
import { defineUserConfig } from 'vuepress';

// 导入自定义主题和分析模块
import { FileList } from './src/node/index.js';
import { fileUrlTreeAnalysis } from "./src/node/analysis/fileUrlTreeAnalysis/index.js";

// 导入代理模块
import { 
  githubReleasesFilesAnalysis, 
  giteeReleasesFilesAnalysis, 
  githubReposAnalysis, 
  giteeReposAnalysis,
  huggingFaceDatasetsAnalysis 
} from './src/node/analysis/index.js';

import { 
  cloudflarePagesDownProxy, 
  vercelDownProxy, 
  netlifyDownProxy 
} from './src/node/proxy/index.js';

// 新增导入 processFileNames 函数
import { processFileNames } from './src/node/utils/fileNameUtils.js';

/**
 * 站点基础配置
 */
const siteBaseConfig = {
  // 使用 Vite 作为构建工具
  bundler: viteBundler(),
  
  // 网站基本信息
  lang: 'zh-CN',
  title: 'FList',
  description: 'FList_个人url地址',
  
  // 静态资源和页面配置
  public: `./public`,
  pagePatterns: [],
  
  // 性能优化配置
  shouldPrefetch: true,
  
  // 网站图标配置
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
};

/**
 * 文件资源配置
 * 可以按类别组织不同的文件源
 */
const fileSourceConfigs = {
  // 主页文件列表

  // "/*"代表原始名称 "/&"代表时间戳名称

  mainFiles: {
    mountPath: "/",
    analysis: fileUrlTreeAnalysis(processFileNames({
      "/Github/Github汉化工具.7z": "https://github.com/robotze/GithubDesktopZhTool/releases/download/3.4.9/GithubDesktop.7z",
      "/Github/Windows右键菜单管理程序.zip": "https://github.com/BluePointLilac/ContextMenuManager/releases/download/3.3.3.1/ContextMenuManager.zip",
      "/Alist/虚拟机.exe": "http:/%BA%91/VMware/VMware-workstation-17.6.1-24319023.exe",
      "/我的世界/手机版启动器.apk": "https://github.com/FCL-Team/FoldCraftLauncher/releases/download/1.2.0.2/FCL-release-1.2.0.2-all.apk",
      "/Github/网盘图标删除器.exe": "https://github.com/Return-Log/Drive-Icon-Manager/releases/download/v2.2/Drive.Icon.Manager-v2.2-Windows-x64.exe"
    }))
  },
  
  // 图片资源
  imageFiles: {
    mountPath: "/图片",
    analysis: fileUrlTreeAnalysis(processFileNames({
      "/爱国.png": "https://img.confused.us.kg/file/1732357059559_爱国-红色.png",
      "/工作.png": "https://img.confused.us.kg/file/1732265239652_20241122164618.png"
    }))
  },

   // 软件资源
   imageFiles: {
    mountPath: "/软件",
    analysis: fileUrlTreeAnalysis(processFileNames({
      "/MC服务器核心_Win版fabric.exe": "https://img.confused.us.kg/file/1733632212214_fabric-installer-1.0.1.exe"
    }))
  },
  
  // 视频资源
  videoFiles: {
    mountPath: "/视频",
    analysis: fileUrlTreeAnalysis(processFileNames({
      "/*": "https://highlight-video.cdn.bcebos.com/video/6s/7c95a6be-95bb-11ef-80ee-6c92bf81a74c.mp4",
      "/&": "https://highlight-video.cdn.bcebos.com/video/6s/7c95a6be-95bb-11ef-80ee-6c92bf81a74c.mp4",
      "/哥哥.mp4": "https://img.confused.us.kg/file/1731225510419_哥哥.mp4"
    }))
  }
};

/**
 * VuePress 完整配置
 */
export default defineUserConfig({
  ...siteBaseConfig,
  theme: FileList([
    fileSourceConfigs.mainFiles,
    fileSourceConfigs.imageFiles,
    fileSourceConfigs.videoFiles
  ])
});