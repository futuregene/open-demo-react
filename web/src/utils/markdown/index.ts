import MarkdownIt from 'markdown-it'
import MILA from 'markdown-it-link-attributes'
import './index.css'

export const md = new MarkdownIt({
  linkify: true,
})

md.use(MILA, { attrs: { target: '_blank', rel: 'noopener' } })
