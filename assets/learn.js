(function(){
 const tip=document.getElementById('tip');
 const ch=Number(document.body.dataset.chapter||0);
 function classifyAccount(name){
   const n=name||'';
   if(['收到的现金','支付的现金','现金流入项目','现金流出项目','年初现金及现金等价物余额'].some(x=>n.includes(x)))
     return ['合并现金流量表项目（非日常会计科目）','这里是合并现金流量表抵销或调整用的报表项目，不要用普通资产/负债账户的增减规则硬套。','抵销/调整方向','抵销/调整方向'];
   if(n.includes('以前年度损益调整')) return ['损益调整类','用于更正以前年度损益或处理资产负债表日后调整事项，最后通常转入留存收益。','通常调减以前年度利润或记录费用型调整','通常调增以前年度利润或记录收入型调整'];
   if(['累计折旧','累计摊销','坏账准备','减值准备','存货跌价准备'].some(x=>n.includes(x))) return ['资产类备抵科目','用来冲减相关资产账面价值。','减少备抵＝相关资产净额增加','增加备抵＝相关资产净额减少'];
   if(n.includes('资金结存')) return ['预算结余类·资金结存','预算会计中反映可用资金结存，功能上类似预算体系中的资金余额。','增加','减少'];
   if(['银行存款','库存现金','固定资产','无形资产','存货','库存商品','应收','预付款','长期股权投资','债权投资','其他权益工具投资','递延所得税资产','受托代理资产','政府储备物资','零余额账户用款额度'].some(x=>n.includes(x)))
     return ['资产类','企业或单位控制、预期能带来经济利益或服务潜力的资源。','增加','减少'];
   if(['应付','预计负债','合同负债','递延所得税负债','应交税','应交增值税','其他应交税费','受托代理负债','应付职工薪酬'].some(x=>n.includes(x)))
     return ['负债类','过去事项形成、未来需要交付资源或履行义务的现时义务。','减少','增加'];
   if(['股本','实收资本','资本公积','盈余公积','未分配利润','少数股东权益','限定性净资产','非限定性净资产','无偿调拨净资产','本年盈余分配'].some(x=>n.includes(x)))
     return ['所有者权益 / 净资产类','资产扣除负债后的剩余权益；政府和非营利组织更多使用“净资产”。','减少','增加'];
   if(ch===24 && ['结余','结转'].some(x=>n.includes(x))) return ['预算结余类','政府预算会计中反映预算资金结转、结余或内部转结关系。','通常减少或结转出去','通常增加或结转进来'];
   if(['收入','收益','补助预算收入','预算收入','捐赠收入','事业收入','商品销售收入'].some(x=>n.includes(x)))
     return ['收入 / 利得类','本期经济利益或净资产的增加项目。','减少或结转','增加'];
   if(['成本','费用','损失','支出','少数股东损益'].some(x=>n.includes(x)))
     return ['费用 / 损失 / 支出类','本期经济利益流出、净资产减少或预算资金支出的项目。','增加','减少或结转'];
   if(n.includes('其他综合收益')) return ['其他综合收益 / 权益类','不直接计入当期损益、而计入其他综合收益的权益变动项目。','减少','增加'];
   if(n.includes('专用基金')) return ['净资产类·专用基金','政府财务会计中按规定提取或设置、具有特定用途的净资产项目。','减少','增加'];
   return ['会计科目','这是本章分录中使用的会计科目。具体性质结合本章用途判断。','结合科目性质判断','结合科目性质判断'];
 }
 function show(el,x,y){
   let kind=el.dataset.kind||'', plain=el.dataset.tip||'', debit=el.dataset.debit, credit=el.dataset.credit;
   const word=el.dataset.word||el.textContent.trim();
   if(el.classList.contains('acct') && !kind){[kind,plain,debit,credit]=classifyAccount(word)}
   let extra='';
   if(debit||credit) extra=`<div style="margin-top:7px;padding-top:7px;border-top:1px solid rgba(255,255,255,.18)"><b>借方：</b>${debit||'—'}<br><b>贷方：</b>${credit||'—'}</div>`;
   tip.innerHTML=`<div class="kind">${kind}</div><div class="word">${word}</div><div>${plain}</div>${extra}`;
   tip.style.display='block';
   const pad=10, r=tip.getBoundingClientRect();
   tip.style.left=Math.min(window.innerWidth-r.width-pad,Math.max(pad,(x||20)+12))+'px';
   tip.style.top=Math.min(window.innerHeight-r.height-pad,Math.max(pad,(y||20)+14))+'px';
 }
 function hide(){tip.style.display='none'}
 document.addEventListener('mouseover',e=>{const el=e.target.closest('.term,.acct');if(el)show(el,e.clientX,e.clientY)});
 document.addEventListener('mousemove',e=>{const el=e.target.closest('.term,.acct');if(el&&tip.style.display==='block')show(el,e.clientX,e.clientY)});
 document.addEventListener('mouseout',e=>{if(e.target.closest('.term,.acct'))hide()});
 document.addEventListener('focusin',e=>{const el=e.target.closest('.term,.acct');if(el){const r=el.getBoundingClientRect();show(el,r.left,r.bottom)}});
 document.addEventListener('focusout',e=>{if(e.target.closest('.term,.acct'))hide()});
 document.addEventListener('click',e=>{const el=e.target.closest('.term,.acct');if(el){e.preventDefault();const r=el.getBoundingClientRect();show(el,r.left,r.bottom)} else if(!e.target.closest('#tip')) hide()});
 const glossary=window.TERM_GLOSSARY||{};
 const terms=Object.keys(glossary).sort((a,b)=>b.length-a.length);
 if(terms.length){
   const esc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'), re=new RegExp(terms.map(esc).join('|'),'g');
   const root=document.querySelector('.study-content');
   const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(n){
     if(!n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
     if(n.parentElement.closest('.term,.acct,.entry,.sidebar,script,style')) return NodeFilter.FILTER_REJECT;
     re.lastIndex=0; return re.test(n.nodeValue)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
   }});
   const nodes=[]; while(walker.nextNode()) nodes.push(walker.currentNode);
   nodes.forEach(n=>{const frag=document.createDocumentFragment();let last=0,m;re.lastIndex=0;
     while((m=re.exec(n.nodeValue))){if(m.index>last)frag.append(n.nodeValue.slice(last,m.index));const [k,t,c]=glossary[m[0]];const s=document.createElement('span');s.className='term term-'+(c||'core');s.tabIndex=0;s.dataset.kind=k;s.dataset.tip=t;s.dataset.word=m[0];s.textContent=m[0];frag.append(s);last=m.index+m[0].length}
     if(last<n.nodeValue.length)frag.append(n.nodeValue.slice(last));n.replaceWith(frag);
   });
 }
 document.querySelectorAll('.mastery').forEach((b,i)=>{const key=`acct_learn_${ch}_${b.dataset.key||i}`;if(localStorage.getItem(key)==='1'){b.classList.add('done');b.textContent='✓ 已掌握'}b.addEventListener('click',()=>{const d=b.classList.toggle('done');localStorage.setItem(key,d?'1':'0');b.textContent=d?'✓ 已掌握':'标记已掌握'})});
})();
