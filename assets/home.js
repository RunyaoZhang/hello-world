(function(){
 const chapters=[21,22,23,24,25];
 let totalDone=0,totalItems=0,visited=0;
 document.querySelectorAll('.chapter').forEach(card=>{
   const no=card.querySelector('.no')?.textContent||'';
   const m=no.match(/CHAPTER\s+(\d+)/i);if(!m)return;
   const ch=Number(m[1]);if(!chapters.includes(ch))return;
   const total=Number(localStorage.getItem(`acct_learn_${ch}_total`)||0);
   const done=Number(localStorage.getItem(`acct_learn_${ch}_done`)||0);
   const wasVisited=localStorage.getItem(`acct_learn_${ch}_visited`)==='1';
   if(wasVisited)visited++;
   if(total>0){totalItems+=total;totalDone+=Math.min(done,total)}
   const pct=total>0?Math.round(done/total*100):0;
   const box=document.createElement('div');box.className='home-progress';
   box.innerHTML=`<div class="home-progress-top"><span>学习进度</span><b>${total>0?pct+'%':(wasVisited?'已开始':'未开始')}</b></div><div class="home-progress-track"><i style="width:${pct}%"></i></div>${total>0?`<small>${done} / ${total} 个知识块已掌握</small>`:'<small>进入本章后自动开始记录</small>'}`;
   card.querySelector('.chapter-head')?.insertAdjacentElement('afterend',box);
 });
 const title=document.querySelector('.section-title');
 if(title){
   const overall=document.createElement('section');overall.className='overall-progress';
   const pct=totalItems?Math.round(totalDone/totalItems*100):0;
   overall.innerHTML=`<div><span>21—25 章总进度</span><strong>${totalItems?pct+'%':'尚未开始'}</strong></div><div class="overall-track"><i style="width:${pct}%"></i></div><small>${visited} / ${chapters.length} 章已打开${totalItems?` · ${totalDone} / ${totalItems} 个知识块已掌握`:''}</small><div class="study-tools"><a href="review.html"><b>主动回忆复习</b><span>先判断再看答案，专练最容易混的分界点 →</span></a><a href="glossary.html"><b>全站会计术语库</b><span>跨第20—25章搜索专业术语、大白话解释和所在章节 →</span></a><a href="entries.html"><b>全站分录库</b><span>按章节或科目搜索结构化分录，集中对照借贷方向 →</span></a></div>`;
   title.insertAdjacentElement('afterend',overall);
 }
 const style=document.createElement('style');style.textContent=`.overall-progress{background:#fffdf9;border:1px solid #e5ddd2;border-radius:20px;padding:16px 18px;margin:10px 0 18px;box-shadow:0 10px 30px rgba(60,48,33,.05)}.overall-progress>div:first-child,.home-progress-top{display:flex;justify-content:space-between;align-items:center;gap:12px}.overall-progress span,.home-progress-top span{font-size:12px;font-weight:900;color:#756f66;letter-spacing:.04em}.overall-progress strong{font-size:22px}.overall-track,.home-progress-track{height:7px;background:#eee8df;border-radius:999px;overflow:hidden;margin-top:9px}.overall-track i,.home-progress-track i{display:block;height:100%;background:#246b5a;border-radius:999px}.overall-progress small,.home-progress small{display:block;color:#756f66;font-size:11px;margin-top:6px}.home-progress{margin:12px 0 2px;padding:10px 12px;background:#faf6f0;border-radius:12px}.home-progress-top b{font-size:12px;color:#246b5a}.study-tools{margin-top:13px;padding-top:12px;border-top:1px dashed #e0d6c9;display:grid;gap:8px}.study-tools a{display:flex;justify-content:space-between;gap:14px;align-items:center;text-decoration:none;color:#22201d;padding:8px 9px;border-radius:11px}.study-tools a:hover{background:#f7f1e9}.study-tools b{font-size:14px}.study-tools span{font-size:12px;color:#246b5a;text-align:right}`;document.head.append(style);
})();