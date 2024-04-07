import { Context,Schema, h } from 'koishi'
import { promises as fs } from 'fs'
import { resolve } from 'path'
import { randomInt } from 'crypto'
import { pathToFileURL } from 'url'
export const name = 'skland-meme'

export interface Config {}

export const Config = Schema.object({})

export const usage = `<div class="skland-container">
<p>
    <a href="https://www.skland.com/" class="skland-text">森空岛</a>社区是鹰角网络旗下的类似于米游社的社区，这里有明日方舟等游戏的讨论板块。
</p>
<p>
    使用“<span class="skland-command" onClick="navigator.clipboard.writeText('森空岛表情包')">森空岛表情包</span>”指令即可随机获取一张来自<a href="https://www.skland.com/" class="skland-text">森空岛</a>社区的表情包。<br>
    使用<span class="skland-param">-l</span>参数可以指定获取的表情包。<br>
    使用“<span class="skland-command" onClick="navigator.clipboard.writeText('森空岛表情包列表')">森空岛表情包列表</span>”指令可以查看所有可用的表情包及其编号。<br><br>
    使用“<span class="skland-command" onClick="navigator.clipboard.writeText('森空岛头像')">森空岛头像</span>”指令即可随机获取一张来自<a href="https://www.skland.com/" class="skland-text">森空岛</a>社区的头像。<br>
    使用<span class="skland-param">-l</span>参数可以指定获取的头像。<br>
    使用“<span class="skland-command" onClick="navigator.clipboard.writeText('森空岛头像列表')">森空岛头像列表</span>”指令可以查看所有可用的头像及其编号。
    <h1>点击指令可进行复制</h1>
</p>
<style>
    .skland-container {
        font-family: 'Arial', sans-serif;
        color: white;
        background-color: rgb(64,64,64); 
        border-radius: 10px;
        padding: 10px;
        box-shadow: 0 0 15px 15px rgb(64,64,64); 
        margin: 10px;
    }
    .skland-text {
        color: #008000;
        text-decoration: none;
    }
    .skland-text:hover {
        text-decoration: underline;
    }
    .skland-command {
        border-radius: 5px;
        padding: 2px 4px;
        font-family: monospace;
    }
    .skland-command:hover {
        background-color: white;
        color: black;
        cursor: pointer; 
    }
    .skland-param {
        font-weight: bold;
    }
</style>
</div>
`
export function apply(ctx: Context) {
  ctx.command('森空岛表情包', '获取森空岛表情包')
    .option('line', '-l <line:number> 指定行数')
    .action(async ({ session, options }) => {
      const filePath = resolve(__dirname, 'img/webp_links.txt');
      try {
        const data = await fs.readFile(filePath, 'utf8')
        const lines = data.split('\n').filter(line => line.trim() !== '')
        let selectedLine: string
        if (options.line) {
          selectedLine = lines[options.line - 1]
        } else {
          const randomLineIndex = randomInt(lines.length)
          selectedLine = lines[randomLineIndex]
        }
        if (!selectedLine) {
          await session.send('指定表情包不存在或文件错误')
          return
        }
        await session.send(`<img src="${selectedLine}"/>`)
      } catch (error) {
        await session.send('读取文件时发生错误')
      }
    })
  ctx.command('森空岛表情包列表', '获取森空岛表情包预览列表')
  .action(() => {
    return h.image(pathToFileURL(resolve(__dirname, 'img/preview.png')).href)
  })
  ctx.command('森空岛头像', '获取森空岛头像')
    .option('line', '-l <line:number> 指定行数')
    .action(async ({ session, options }) => {
      const filePath = resolve(__dirname, 'img/txs.txt');
      try {
        const data = await fs.readFile(filePath, 'utf8')
        const lines = data.split('\n').filter(line => line.trim() !== '')
        let selectedLine: string
        if (options.line) {
          selectedLine = lines[options.line - 1]
        } else {

          const randomLineIndex = randomInt(lines.length)
          selectedLine = lines[randomLineIndex]
        }
        if (!selectedLine) {
          await session.send('指定头像不存在或文件错误')
          return
        }
        
        await session.send(`<img src="${selectedLine}"/>`)
      } catch (error) {
        await session.send('读取文件时发生错误')
      }
    })
  ctx.command('森空岛头像列表', '获取森空岛头像预览列表')
  .action(() => {
    return h.image(pathToFileURL(resolve(__dirname, 'img/preview2.png')).href)
  })
}
