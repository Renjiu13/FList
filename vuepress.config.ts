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
  mainFiles: {
    mountPath: "/",
    analysis: fileUrlTreeAnalysis(processFileNames({
      "/Github/Github汉化工具.7z": "https://github.com/robotze/GithubDesktopZhTool/releases/download/3.4.9/GithubDesktop.7z",
      "/Github/*": "https://github.com/BluePointLilac/ContextMenuManager/releases/download/3.3.3.1/ContextMenuManager.zip",
      "/Alist/虚拟机.exe": "http:/%BA%91/VMware/VMware-workstation-17.6.1-24319023.exe",
      "/Github/网盘图标删除器.exe": "https://github.com/Return-Log/Drive-Icon-Manager/releases/download/v2.2/Drive.Icon.Manager-v2.2-Windows-x64.exe",
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
      "/*": "https://img.confused.us.kg/file/1733632212214_fabric-installer-1.0.1.exe"
    }))
  },
  
  // 视频资源
  videoFiles: {
    mountPath: "/视频",
    analysis: fileUrlTreeAnalysis(processFileNames({
      "/*": "https://highlight-video.cdn.bcebos.com/video/6s/7c95a6be-95bb-11ef-80ee-6c92bf81a74c.mp4",
      "/&": "https://highlight-video.cdn.bcebos.com/video/6s/7c95a6be-95bb-11ef-80ee-6c92bf81a74c.mp4",
      "/老师不要跑.mp4": "https://ccp-bj29-video-preview.oss-enet.aliyuncs.com/lt/29AC9873F1239ADFCF6BF8135B688DE0C6A7A74E_1332508639__sha1_bj29_1b841d41/SD/media.m3u8?di=bj29&dr=1236922520&f=65fe199b71d74d32e2814cbfb2781c4c596cfa70&pds-params=%7B%22ap%22%3A%2276917ccccd4441c39457a04f6084fb2f%22%7D&security-token=CAISvgJ1q6Ft5B2yfSjIr5bCIePuuax40qqORlPhiTcHXPdDgpLbjTz2IHhMf3NpBOkZvvQ1lGlU6%2Fcalq5rR4QAXlDfNWbGJxyFq1HPWZHInuDox55m4cTXNAr%2BIhr%2F29CoEIedZdjBe%2FCrRknZnytou9XTfimjWFrXWv%2Fgy%2BQQDLItUxK%2FcCBNCfpPOwJms7V6D3bKMuu3OROY6Qi5TmgQ41Uh1jgjtPzkkpfFtkGF1GeXkLFF%2B97DRbG%2FdNRpMZtFVNO44fd7bKKp0lQLs0ARrv4r1fMUqW2X543AUgFLhy2KKMPY99xpFgh9a7j0iCbSGyUu%2FhcRm5sw9%2Byfo34lVYneAzbd20qV7uHwufJ7FxfIREfquk63pvSlHLcLPe0Kjzzleo2k1XRPVFF%2B535IaHXuToXDnvSi0fwRTvXtuMkagAFuGKHa4gEcJylp21YGenQupv3hfZrraU%2FTvSnDjmSywuSh4JrGMHfjj35myZYB1PJV51s%2BdvC4gKdlgYP5ejKf%2FZikMm7calNDUBX8ZJ2Osh9LxBd0V0EkkYQsg07wXRU08mk%2Fy5KlIf84tcRf8UOZbyjEY2py9LR6OrlsoQJIJyAA&u=b34708dd2cf84ae5ac0b0f022a5aa8fe&x-oss-access-key-id=STS.NUwjYZTsYeheDuPm7RPxomWpo&x-oss...",
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