import md5 from 'js-md5'


export const name: Readonly<string> = 'Val.istar.Guo'
export const email: Readonly<string> = 'val.istar.guo@gmail.com'
export const avatar: Readonly<string> = `https://www.gravatar.com/avatar/${md5(email)}`
export const company: Readonly<Record<string, Readonly<string>>> = {
  name: 'SHEIN',
  domain: 'https://www.shein.com',
}

export const description: Readonly<string>[] = [
  '我热衷于创造一些有趣的玩物，给生活增添乐趣。',
  '专注于前端技术，也喜爱玩弄单片机，甚至是工匠活。',
  '有趣的不是技术，是用它们创造的那些给生活带来乐趣的新鲜事物。',
]
