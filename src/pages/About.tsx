import Layout from '../components/Layout';
import Head from 'next/head';
import config from '../config';
import Breadcrumb from '../components/Breadcrumb';
import GiscusComments from '../components/GiscusComments';
import { useState } from 'react';

const About = () => {
  const [showComments, setShowComments] = useState(false);

  return (
    <Layout>
      <Head>
        <title>关于我和suiyan.cc | SuiYan 碎言</title>
        <meta name="description" content="关于碎言博客和博主J.sky的个人介绍" />
      </Head>

      <Breadcrumb type="about" />

      <article>
        <section>
          <h2>愿景</h2>
          <ul>
            <li><strong>坚持深度阅读，持续写作输出，复盘技术实践。</strong></li>
            <li><strong>以终生学习对抗不确定性，</strong></li>
            <li><strong>把固执与坚持，All in 在值得的事情上。</strong></li>
          </ul>
        </section>

        <section>
          <h2>关于我</h2>
          <p>
            你好，J.sky这个网名没有什么太多含义，当年在自学Java编程语言，可以说成Java.Sky的简写，又或是对当年魔兽争霸3的人族之王J.sky的崇拜之情，继而使用了此网名。
          </p>
          <p>一个喜欢哲学、画画和写代码的老年<mark>程序猿</mark></p>
        </section>

        <section>
          <h2>关于博客</h2>
          <p>
            碎言博客的名字，取自于碎言片语。很早就建立过很多杂七杂八的网站，具体页面底下有详细的博客更新日志。
          </p>
          <ul>
            <li>采用 Next.js 16 编写的博客源代码，生成纯静态的页面，托管于 Vercel。开源代码仓库：<a href="https://github.com/bosichong/suiyanblog" target="_blank" rel="noopener noreferrer">https://github.com/bosichong/suiyanblog</a></li>
            <li>样式采用 Pico CSS 框架，配合少量的自定义 CSS 样式，实现简洁优雅的视觉效果。PageSpeed Insights 基本满分，只为追求更好的用户浏览体验。</li>
            <li>Markdown 文章渲染使用 react-markdown，配合 remark-gfm 和 rehype-raw 插件，支持完整的 Markdown 语法和 HTML 嵌入。</li>
            <li>图标系统使用 lucide-react，提供精美且轻量的 SVG 图标。</li>
            <li>评论系统集成 Giscus，基于 GitHub Discussions 实现轻量级的评论功能。</li>
          </ul>
        </section>

        <section>
          <h2>RSS订阅</h2>
          <p>
            <a href="https://www.suiyan.cc/feed.xml" target="_blank" rel="noopener noreferrer">https://www.suiyan.cc/feed.xml</a>
          </p>
        </section>

        <section>
          <h2>AI 创作等级标识</h2>
          <p>
            本站所有文章均标注 AI 创作等级，让读者清楚了解每篇文章的创作方式。
          </p>
          <ul>
            <li><strong>HAND · 手写</strong> — 每一个字都由作者亲手敲出</li>
            <li><strong>VOICE · 口述</strong> — 语音转文字，仅修正语法和错别字</li>
            <li><strong>POLISH · 润色</strong> — 核心由作者完成，AI 辅助修饰优化</li>
            <li><strong>DUET · 协奏</strong> — 人机共创作，平等对话互相启发</li>
            <li><strong>AUTO · 自动</strong> — AI 主导生成，人类审核把关</li>
          </ul>
          <p>
            详见：<a href="/AI-Label">AI 创作等级标识说明</a>
          </p>
        </section>

        <section>
          <h2>联系我</h2>
          <p>方式很多，详见页面底部的sns图标，也可以在这个页面的底部给我留言。</p>
        </section>

        <section>
          <h2>网站构建优化日志</h2>
          <details name="about-accordion">
            <summary role="button">网站构建优化日志</summary>
            <ul>
              <li>
                <strong>2026-03-20</strong> 重构 AI 创作等级标识系统：从 4 级扩展为 5 级（HAND/VOICE/POLISH/DUET/AUTO），新增「VOICE · 口述」等级用于语音转文字场景；更新组件 <code>AILabelBadge.tsx</code> 和说明页面 <code>AI-Label.tsx</code>；在 About 页面添加 AI 创作等级标识简介及链接。
              </li>
              <li>
                <strong>2026-03-09</strong> 创建独立的 About 页面，将原本嵌入在博客文章中的关于页面内容独立出来。更新了技术栈描述，移除了过时的 Tailwind CSS 相关内容，改为实际使用的 Pico CSS 框架、react-markdown 和 lucide-react 等技术。同时更新了导航菜单配置，将"关于"链接指向新的 About 页面。
              </li>
              <li>
                <strong>2026-02-12</strong> 经过一段时间的打磨，最新的极简亮色主题优化基本完毕。
              </li>
              <li>
                <strong>2026-01-31</strong> 推翻之前所有的设计方案，直接构建了一套极简主题。
              </li>
              <li>
                <strong>2026-01-18</strong> 继续修改优化了一些主题的细节，为每一篇文章添加了「那年今日」文章列表，怀念致敬曾经的过往。
              </li>
              <li>
                <strong>2026-01-18</strong> 📋 本次更新内容总结
                <ol style={{ marginTop: '0.5rem', marginLeft: '1.5rem' }}>
                  <li>移除 NextUI 依赖 - 使用原生组件和 Tailwind CSS 重构</li>
                  <li>组件重构 - 所有 NextUI 组件替换为原生实现</li>
                  <li>移动端导航优化 - 使用 framer-motion 实现流畅动画</li>
                  <li>桌面端导航动画 - 添加逐一显示效果</li>
                  <li>标签功能增强 - 创建标签详情页，支持静态生成</li>
                  <li>友情链接页面优化 - 采用简约列表式布局</li>
                  <li>样式和主题 - 保留原有配色，优化全局样式</li>
                  <li>依赖更新 - 安装 lucide-react，更新 sitemap 生成</li>
                </ol>
              </li>
              <li>
                <strong>2026-01-15</strong> 使用AI优化了博客的代码，从JavaScript换到了TypeScript。优化一些细节和样式，把图标都换成<code>lucide-animated</code>动态的图标。
              </li>
              <li>
                <strong>2025-01-25</strong> 持续优化了一阵子blog的细节，目前来说当前的主题基本定型了。
              </li>
              <li>
                <strong>2025-01-16</strong> 更新了一些主题的细节，网站样式的修改先告一段落。
              </li>
              <li>
                <strong>2025-01-01</strong> 新的一年，希望自己可以更加努力，更加努力。使用next.js + nextUI复刻重构了之前使用python制作的静态博客生成器，为什么要这么做，就是想体验现代前端框架的魅力，学到前端的一些新东西。
                还没有测试Google的LCP，但是明显感觉页面的打开速度比以前快多了，网站部署在vercel，太方便了。
                目前是写博客的流程：<code>npm run nb</code> 新建一个博客文章，写完后运行<code>python push.py</code>，会自动生成<code>rss.xml</code>、<code>sitemap.xml</code>到public目录下，然后自动提交到GitHub仓库，vercel自动部署，然后就可以访问了。相比之前python写的静态博客生成器是在本地生成静态文件，现在是在服务端生成的，而且之前的生成器的细节都是自己编写，这次使用的next.js的SSG生成静态页面。
              </li>
              <li>
                <strong>2023-07-29</strong> 之前使用tailwind+daisyUI构建了博客前端的静态页面，但是静态文件的下载速度对于部署在GitHub pages的博客来说有些慢了，通过 <a href="https://search.google.com/test/mobile-friendly?hl=zh_CN" target="_blank" rel="noopener noreferrer">https://search.google.com/test/mobile-friendly?hl=zh_CN</a> 测试，发现daisyUI的full.css文件很大，本地看了一下竟然有1M+，这对于一个缓慢的GitHub博客来说是一个很沉重的负担，所以就取消了daisyUI的相关依赖，这下减轻了页面加载的压力，LCP首页的评分也达到了99的爽快分值，很是满意。
              </li>
              <li>
                <strong>2023-06-16</strong> 花了几个小时基于daisyUI + Tailwind CSS做了一个博客主题，很早就想把博客的样式换成基于Tailwind CSS为基础框架的，今天终于实现了。
              </li>
              <li>
                <strong>2023-05-30</strong> 之前做了几个主题都不太满意，目前的"复古跑马灯"自我感觉良好，挺适合中老年人那种怀旧审美的。
              </li>
              <li>
                <strong>2023-05-09</strong> 网站再次改版，重回静态博客（3.0），之前的碎言静态博客也进行了比较大的重构改版，做了几个主题。
              </li>
              <li>
                <strong>2023-04-05</strong> 今天折腾了一天把网站换成了自己开发的碎言静态博客（2.0），生命在于折腾。
              </li>
              <li>
                <strong>2020-01-07</strong> 把原来由Django构建的博客换成了自己的新开发的碎言静态博客(1.0版本)
              </li>
              <li>
                <strong>2017-12-22</strong> 添加原创及转载标识，添加站点统计、热门文章功能。
              </li>
              <li>
                <strong>2017-10-06</strong> 更新博客功能，为博客添加了标签云、日志归档功能。
              </li>
              <li>
                <strong>2017-09-04</strong> 公安备案也搞定了，相对来说，公安的备案要快些，辽宁通信管理局的审核大约是10工作日+，公安备案审核我这次是二个工作日就搞定了。备案完毕，接下来就是坚持写作更新blog了，继续深入学习Python。
                腾讯公益404
                本站演示地址404 Not-Found
                不解释，希望更多的站长加入吧，传送门请点这里，希望走失的宝宝将来都能找到自己的亲人。
              </li>
              <li>
                <strong>2017-08-25</strong> 今天是个好日子
                折腾了一个晚上，终于把网站上线了，明天要把这几天的折腾记下来，不然用不了几天就会忘掉。这阵子自学Python Django感触很多，中间也是遇到了无数的坑，还好自己都挺过来了，以后学习Python的日子还长，学习还是要继续的，给自己打气加油！
                耐心等待备案下来
                希望这次备案能顺利一些，前一阵子提交备案相关信息还是挺顺利的了，就差管局审批了！等待的这些天先总结一下这次blog搭建的经验。
              </li>
            </ul>
          </details>
          
          <details name="about-accordion">
            <summary role="button">旧版的陈年往事</summary>
            <div>
              <ul>
                <li>2vv.net</li>
                <li>sogame.net</li>
                <li>17Python.com</li>
              </ul>
              <p>都已经注销了。这些大多发生在2000-2015年之间。</p>
              <p>通过<a href="https://web.archive.org/" target="_blank" rel="noopener noreferrer">https://web.archive.org/</a> 来查询网页快照，进而查到了一下信息。</p>
              <ol>
                <li>
                  <strong>2vv.net</strong> 注册于2001年，最终于2007年左右逐渐逝去，具体是哪年停止续费的，由于太久远我也忘了。
                </li>
                <li>
                  <strong>sogame.net</strong> 注册于2004年，其域名停止续费的时间大约和2vv.net一样。
                </li>
              </ol>
              <p>
                2vv.net、sogame.net，那是我刚刚接触互联网的时候，那时候不会编程，不会Python也不会web方面的技能，程序都是买的。后来会了PHP，使用WordPress建过一个博客，被黑之后关了，数据也没保存。国内租用服务器的环境比较糟糕，备案等一套流程下来很费时间，而且使用服务器端SSR的话容易被黑，也容易被人攻击，一旦发生这类事情是很沮丧的，最后还是选择了GitHub部署静态博客，免去了很多的烦恼，这样可以专注写作博文了。
              </p>
              <p>
                <strong>17python.com</strong> 2017-2020年吧，后来和阿里云一起停止了续费。2017年左右学习了Python，使用Django构建了一个博客，期间也有被黑过。三年后阿里云服务器到期，懒得续费，但数据保留了下来。之后使用Python编写了一个静态博客生成器，依托国内的码云Gitee提供的静态页面服务继续托管博客。后来因为国情，码云大部分时间都是关闭静态页面服务，且关键词替换屏蔽太严重，最后直接关掉了博客。
              </p>
            </div>
          </details>
        </section>

        {!showComments ? (
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <button onClick={() => setShowComments(true)}>
              <span>加载评论</span>
            </button>
          </div>
        ) : (
          <div style={{ marginTop: '2rem' }}>
            <GiscusComments />
          </div>
        )}
      </article>
    </Layout>
  );
};

export default About;