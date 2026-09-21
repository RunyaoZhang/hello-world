#!/usr/bin/env python3
import json,re,html,pathlib
ROOT=pathlib.Path(__file__).resolve().parents[1]
TITLES={20:'持有待售、处置组和终止经营',21:'企业合并与合并财务报表',22:'会计政策、会计估计变更和差错更正',23:'资产负债表日后事项',24:'政府会计',25:'民间非营利组织会计'}
items={}

def add(word,ch,kind,tip):
    word=(word or '').strip(); kind=(kind or '专业术语').strip(); tip=(tip or '').strip()
    if not word or not tip:return
    items.setdefault(word,[])
    rec={'chapter':ch,'kind':kind,'tip':tip}
    if rec not in items[word]:items[word].append(rec)

# 第20章：术语直接写在 HTML 的 data-* 中
p=ROOT/'chapter20'/'learn.html'
if p.exists():
    s=p.read_text(encoding='utf-8')
    pat=re.compile(r'<span[^>]*class="[^"]*\bterm\b[^"]*"[^>]*data-kind="([^"]*)"[^>]*data-word="([^"]*)"[^>]*data-tip="([^"]*)"[^>]*>',re.S)
    for kind,word,tip in pat.findall(s): add(html.unescape(word),20,html.unescape(kind),html.unescape(tip))

# 第21—25章：统一 TERM_GLOSSARY 对象
for ch in range(21,26):
    p=ROOT/f'chapter{ch}'/'learn.html'
    if not p.exists():continue
    s=p.read_text(encoding='utf-8')
    m=re.search(r'window\.TERM_GLOSSARY\s*=\s*(\{.*?\})\s*;</script>',s,re.S)
    if not m:continue
    try:data=json.loads(m.group(1))
    except Exception:continue
    for word,val in data.items():
        if not isinstance(val,list) or len(val)<2:continue
        add(word,ch,val[0],val[1])

def group(kind):
    k=kind
    if any(x in k for x in ['计量','减值','核算']):return 'measure'
    if any(x in k for x in ['控制','合并','投资','权益']):return 'control'
    if any(x in k for x in ['报表','列报','损益','时间']):return 'report'
    if any(x in k for x in ['变更','差错','调整']):return 'change'
    if any(x in k for x in ['预算','政府']):return 'budget'
    if any(x in k for x in ['科目','资产','负债','收入','费用','净资产']):return 'account'
    return 'core'

cards=[]
for word in sorted(items,key=lambda x:(len(x),x)):
    entries=items[word]
    chapters=sorted({x['chapter'] for x in entries})
    search=' '.join([word]+[x['kind']+' '+x['tip'] for x in entries]+[TITLES.get(c,'') for c in chapters])
    body=[]
    for x in entries:
        body.append(f'<div class="def"><div class="meta"><span class="type {group(x["kind"])}">{html.escape(x["kind"])}</span><a href="chapter{x["chapter"]}/learn.html">第{x["chapter"]}章 · {html.escape(TITLES[x["chapter"]])}</a></div><p>{html.escape(x["tip"])}</p></div>')
    cards.append(f'<article class="term-card" data-search="{html.escape(search.lower())}"><h2>{html.escape(word)}</h2>{"".join(body)}</article>')

page=f'''<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>全站会计术语库</title><style>
:root{{--bg:#f4f1eb;--paper:#fffdf9;--ink:#25221f;--muted:#6f6961;--line:#e2d9cd;--green:#246b5a}}*{{box-sizing:border-box}}body{{margin:0;background:var(--bg);color:var(--ink);font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",system-ui,sans-serif;line-height:1.72}}.wrap{{width:min(1020px,100%);margin:auto;padding:28px 18px 70px}}.back{{text-decoration:none;color:var(--muted);font-size:14px}}h1{{font-size:clamp(38px,6vw,60px);line-height:1.08;margin:20px 0 8px;letter-spacing:-.035em}}.lead{{font-size:18px;color:var(--muted);max-width:760px}}.search{{position:sticky;top:0;z-index:10;padding:12px 0;background:rgba(244,241,235,.94);backdrop-filter:blur(12px)}}input{{width:100%;border:1px solid var(--line);border-radius:15px;background:#fff;padding:13px 15px;font:inherit;font-size:16px;outline:none}}input:focus{{border-color:#9a8a76;box-shadow:0 0 0 3px rgba(154,138,118,.12)}}.count{{font-size:12px;color:var(--muted);margin:7px 4px}}.grid{{display:grid;grid-template-columns:1fr 1fr;gap:12px}}.term-card{{background:var(--paper);border:1px solid var(--line);border-radius:18px;padding:16px 17px;box-shadow:0 8px 28px rgba(58,47,35,.05)}}.term-card h2{{font-size:21px;margin:0 0 9px}}.def+ .def{{border-top:1px dashed var(--line);margin-top:11px;padding-top:11px}}.def p{{margin:7px 0 0;font-size:14px}}.meta{{display:flex;align-items:center;gap:7px;flex-wrap:wrap}}.meta a{{color:var(--green);text-decoration:none;font-size:12px;font-weight:800}}.type{{font-size:11px;font-weight:900;padding:4px 7px;border-radius:999px}}.core{{background:#f1eafb;color:#7652a6}}.measure{{background:#e8f3fb;color:#216a96}}.control{{background:#e8f4ee;color:#277357}}.report{{background:#fbefe0;color:#a2601d}}.change{{background:#fae9ee;color:#a34e60}}.budget{{background:#e6f5f3;color:#18726d}}.account{{background:#f6eddc;color:#7a5a22}}.empty{{display:none;padding:40px 0;text-align:center;color:var(--muted)}}@media(max-width:720px){{.grid{{grid-template-columns:1fr}}.wrap{{padding:20px 12px 50px}}}}</style></head><body><main class="wrap"><a class="back" href="index.html">← 会计学习站</a><h1>全站会计术语库</h1><p class="lead">把第20—25章出现的核心术语放到一起。搜索一个词，可以看到它属于哪类概念、在哪一章出现，以及大白话解释。</p><div class="search"><input id="q" placeholder="搜索：控制、追溯调整、预算收入、限定性净资产……" autocomplete="off"><div class="count" id="count"></div></div><section class="grid" id="grid">{''.join(cards)}</section><div class="empty" id="empty">没有找到匹配术语。</div></main><script>const q=document.getElementById('q'),cards=[...document.querySelectorAll('.term-card')],count=document.getElementById('count'),empty=document.getElementById('empty');function run(){{const s=q.value.trim().toLowerCase();let n=0;cards.forEach(c=>{{const ok=!s||c.dataset.search.includes(s);c.hidden=!ok;if(ok)n++}});count.textContent=`显示 ${{n}} / ${{cards.length}} 个术语`;empty.style.display=n?'none':'block'}}q.addEventListener('input',run);run();</script></body></html>'''
(ROOT/'glossary.html').write_text(page,encoding='utf-8')
print(f'generated glossary.html with {len(cards)} terms')
