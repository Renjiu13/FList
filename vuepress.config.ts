// 导入必要的模块
import { viteBundler } from '@vuepress/bundler-vite';
import { defineUserConfig } from 'vuepress';
import { FileList } from './src/node/index.js';
import { githubReleasesFilesAnalysis } from "./src/node/analysis/githubReleasesFilesAnalysis/index.js";
import { cloudflarePagesDownProxy } from "./src/node/proxy/cloudflarePagesDownProxy/index.js";
import { fileUrlTreeAnalysis } from "./src/node/analysis/fileUrlTreeAnalysis/index.js";
import { huggingFaceDatasetsAnalysis } from "./src/node/analysis/huggingFaceDatasetsAnalysis/index.js";
import { vercelDownProxy } from './src/node/proxy/vercelDownProxy/index.js';
import { netlifyDownProxy } from './src/node/proxy/netlifyDownProxy/index.js';
import { giteeReleasesFilesAnalysis } from './src/node/analysis/giteeReleasesFilesAnalysis/index.js';
import { githubReposAnalysis } from './src/node/analysis/githubReposAnalysis/index.js';
import { giteeReposAnalysis } from './src/node/analysis/giteeReposAnalysis/index.js';

/**
 * 站点配置文件，没有注释的选项如果不知道有什么作用不建议修改，有注释的选项可以根据注释修改
 */
export default defineUserConfig({
  // 使用 Vite 作为构建工具
  bundler: viteBundler(),
  // 页面文件的匹配模式
  pagePatterns: [],
  // 网站的主要语言
  lang: 'zh-CN',
  // 静态资源文件夹路径
  public: `./public`,
  // 网站标题，标题颜色可在 src/client/css/main.css 中修改
  title: 'FList',
  // 网站的简介，有助于搜索引擎收录
  description: 'FList_个人url地址',
  // 页面 <head> 标签内添加的额外标签。不要修改/logo.png，可以替换掉这个文件，删除logo.png会导致构建出错。
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  // 页面预加载，所有其它页面所需的文件都会被预拉取。这对于小型站点来说是十分有帮助的，因为它会大大提升页面切换的速度。但是在你的网站有很多页面时不建议你这么做。
  // 简单来说就是，如果你的文件不多就可以打开这个选项，可以大大提高页面切换的速度，如果文件非常多就不建议打开这个选项。
  shouldPrefetch: true,
  // 主题配置 FileList 是 vuepress 的一个主题，文件展示的功能全部由这个主题提供。
  theme: FileList([
    // 挂载路径为 /example
    {
      mountPath:"/",
      analysis:fileUrlTreeAnalysis({
        "/123网盘/下载解压软件打开.jpg":"https://img.confused.us.kg/file/1732684784448_merged_123网盘.png",
        "/Github/Github汉化工具.7z":"https://github.com/robotze/GithubDesktopZhTool/releases/download/3.4.9/GithubDesktop.7z"
        "":"https://i2.hdslb.com/bfs/face/0770025cfefed3043df126872f026c2ea94128b3.jpg@120w_120h_1c",
      })
    }
  ])
});
