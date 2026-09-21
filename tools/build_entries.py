#!/usr/bin/env python3
from html.parser import HTMLParser
import pathlib,html,re
ROOT=pathlib.Path(__file__).resolve().parents[1]
TITLES={20:'持有待售、处置组和终止经营',21:'企业合并与合并财务报表',22:'会计政策、会计估计变更和差错更正',23:'资产负债表日后事项',24:'政府会计',25:'民间非营利组织会计'}

class EntryParser(HTMLParser):
    def __init__(self):
        super().__init__();self.entries=[];self.active=None;self.depth=0;self.stack=[]
    def handle_starttag(self,tag,attrs):
        d=dict(attrs);classes=set(d.get('class','').split())
        if self.active is None and tag=='div' and 'entry' in classes:
            self.active={'head':[],'note':[],'rows':[],'text':[]};self.depth=1;self.stack=[classes];return
        if self.active is not None:
            if tag=='div':self.depth+=1
            self.stack.append(classes)
            if tag=='div' and 'entry-row' in classes:self.active['rows'].append({'dc':[],'acct':[],'amount':[]})
    def handle_endtag(self,tag):
        if self.active is None:return
        if self.stack:self.stack.pop()
        if tag=='div':
            self.depth-=1
            if self.depth==0:
                self.entries.append(self.active);self.active=None;self.stack=[]
    def handle_data(self,data):
        if self.active is None:return
        txt=' '.join(data.split())
        if not txt:return
        self.active['text'].append(txt)
        classes=set().union(*self.stack) if self.stack else set()
        if 'entry-head' in classes:self.active['head'].append(txt)
        if 'entry-note' in classes:self.active['note'].append(txt)
        if self.active['rows']:
            row=self.active['rows'][-1]
            if 'dc' in classes:row['dc'].append(txt)
            if 'acct' in classes:row['acct'].append(txt)
            if 'amount' in classes:row['amount'].append(txt)

def clean(parts):return ' '.join(parts).replace('解释这条分录','').strip()

all_entries=[]
for ch in range(20,26):
    p=ROOT/f'chapter{ch}'/'learn.html'
    if not p.exists():continue
    parser=EntryParser();parser.feed(p.read_text(encoding='utf-8'))
    for i,e in enumerate(parser.entries,1):
        rows=[]
        for r in e['rows']:
            dc=clean(r['dc']);acct=clean(r['acct']);amt=clean(r['amount'])
            if dc or acct or amt:rows.append((dc,acct,amt))
        if not rows:continue
        all_entries.append({'ch':ch,'idx':i,'head':clean(e['head']) or f'第{i}组分录','note':clean(e['note']),'rows':rows})

cards=[]
counts={}
for e in all_entries:
    counts[e['ch']]=counts.get(e['ch'],0)+1
    acct_words=' '.join(r[1] for r in e['rows'])
    search=f"第{e['ch']}章 {TITLES[e['ch']]} {e['head']} {e['note']} {acct_words}".lower()
    rows=''.join(f'<div class="jr"><span class="dc {"d" if "借" in dc else "c"}">{html.escape(dc or "—")}</span><b>{html.escape(acct)}</b><span>{html.escape(amt)}</span></div>' for dc,acct,amt in e['rows'])
    cards.append(f'<article class="entry-card" data-ch="{e["ch"]}" data-search="{html.escape(search)}"><div class="entry-meta"><a href="chapter{e["ch"]}/learn.html">第{e["ch"]}章</a><span>{html.escape(TITLES[e["ch"]])}</span></div><h2>{html.escape(e["head"])}</h2><div class="journal">{rows}</div>{f"<p class=note>{html.escape(e["note"])}</p>" if e["note"] else ""}</article>')

chips=''.join(f'<button data-ch="{ch}">第{ch}章 <small>{counts.get(ch,0)}</small></button>' for ch in range(20,26) if counts.get(ch))
page=f'''<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>全站分录库</title><style>
:root{{--bg:#f4f1eb;--paper:#fffdf9;--ink:#25221f;--muted:#6f6961;--line:#e2d9cd;--green:#246b5a}}*{{box-sizing:border-box}}body{{margin:0;background:var(--bg);color:var(--ink);font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Microsoft YaHei",system-ui,sans-serif;line-height:1.7}}.wrap{{width:min(1080px,100%);margin:auto;padding:28px 18px 70px}}.back{{text-decoration:none;color:var(--muted);font-size:14px}}h1{{font-size:clamp(40px,6vw,62px);line-height:1.06;margin:20px 0 8px;letter-spacing:-.04em}}.lead{{font-size:18px;color:var(--muted);max-width:800px}}.tools{{position:sticky;top:0;z-index:10;background:rgba(244,241,235,.95);backdrop-filter:blur(12px);padding:12px 0}}input{{width:100%;padding:13px 15px;border:1px solid var(--line);border-radius:14px;background:#fff;font:inherit;font-size:16px;outline:none}}.chips{{display:flex;gap:7px;flex-wrap:wrap;margin-top:8px}}.chips button{{border:1px solid var(--line);background:#fff;border-radius:999px;padding:6px 9px;font:inherit;font-size:12px;font-weight:850;cursor:pointer}}.chips button.on{{background:#246b5a;color:#fff;border-color:#246b5a}}.chips small{{opacity:.7}}#count{{font-size:12px;color:var(--muted);margin:7px 3px}}.grid{{display:grid;grid-template-columns:1fr 1fr;gap:12px}}.entry-card{{background:var(--paper);border:1px solid var(--line);border-radius:18px;padding:15px 16px;box-shadow:0 8px 28px rgba(58,47,35,.05)}}.entry-meta{{display:flex;gap:8px;align-items:center;font-size:11px;color:var(--muted)}}.entry-meta a{{color:var(--green);font-weight:900;text-decoration:none}}.entry-card h2{{font-size:17px;line-height:1.45;margin:6px 0 10px}}.journal{{border:1px solid #e8dfd3;border-radius:12px;padding:8px 10px;background:#fff}}.jr{{display:grid;grid-template-columns:34px minmax(0,1fr) auto;gap:8px;padding:4px 0;border-bottom:1px dashed #eee5da;align-items:baseline}}.jr:last-child{{border:0}}.jr b{{font-size:14px}}.jr>span:last-child{{font-size:13px;font-variant-numeric:tabular-nums;white-space:nowrap}}.dc{{font-size:12px;font-weight:900}}.dc.d{{color:#245f96}}.dc.c{{color:#9a531b}}.note{{font-size:12px;color:var(--muted);margin:8px 2px 0}}.empty{{display:none;color:var(--muted);text-align:center;padding:40px}}@media(max-width:760px){{.grid{{grid-template-columns:1fr}}.wrap{{padding:20px 12px 50px}}.jr{{grid-template-columns:30px 1fr}}.jr>span:last-child{{grid-column:2}}}}</style></head><body><main class="wrap"><a class="back" href="index.html">← 会计学习站</a><h1>全站分录库</h1><p class="lead">把学习页里的结构化分录集中到一起。可以按章节筛选，也可以直接搜科目，比如“累计折旧”“以前年度损益调整”“资金结存”“限定性净资产”。</p><div class="tools"><input id="q" placeholder="搜索分录标题或会计科目……"><div class="chips"><button class="on" data-ch="all">全部 <small>{len(all_entries)}</small></button>{chips}</div><div id="count"></div></div><section class="grid">{''.join(cards)}</section><div class="empty" id="empty">没有找到匹配分录。</div></main><script>const q=document.getElementById('q'),cards=[...document.querySelectorAll('.entry-card')],buttons=[...document.querySelectorAll('.chips button')],count=document.getElementById('count'),empty=document.getElementById('empty');let active='all';function run(){{const s=q.value.trim().toLowerCase();let n=0;cards.forEach(c=>{{const ok=(active==='all'||c.dataset.ch===active)&&(!s||c.dataset.search.includes(s));c.hidden=!ok;if(ok)n++}});count.textContent=`显示 ${{n}} / ${{cards.length}} 组分录`;empty.style.display=n?'none':'block'}}buttons.forEach(b=>b.onclick=()=>{{buttons.forEach(x=>x.classList.remove('on'));b.classList.add('on');active=b.dataset.ch;run()}});q.oninput=run;run();</script></body></html>'''
(ROOT/'entries.html').write_text(page,encoding='utf-8')
print('generated entries.html',len(all_entries),counts)
