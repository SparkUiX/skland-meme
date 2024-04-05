import { Context,Schema, h } from 'koishi'
import { promises as fs } from 'fs'
import { resolve } from 'path'
import { randomInt } from 'crypto'
import { pathToFileURL } from 'url'
export const name = 'skland-meme'

export interface Config {}

export const Config = Schema.object({})

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
        console.error('Error reading file:', error)
        await session.send('读取文件时发生错误')
      }
    })
  ctx.command('森空岛表情包列表', '获取森空岛表情包预览列表')
  .action(() => {
    return h.image(pathToFileURL(resolve(__dirname, 'img/preview.png')).href)
  })
}
