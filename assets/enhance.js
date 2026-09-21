(function(){
 const ch=Number(document.body.dataset.chapter||0);
 if(![21,22,23,24,25].includes(ch))return;

 function classifyAccount(name){
   const n=name||'';
   if(['累计折旧','累计摊销','坏账准备','减值准备','存货跌价准备'].some(x=>n.includes(x))) return ['资产类备抵科目','减少备抵＝相关资产净额增加','增加备抵＝相关资产净额减少'];
   if(n.includes('资金结存')) return ['预算结余类·资金结存','增加','减少'];
   if(['银行存款','库存现金','固定资产','无形资产','存货','库存商品','应收','预付款','长期股权投资','递延所得税资产','受托代理资产','政府储备物资','零余额账户用款额度','持有待售资产'].some(x=>n.includes(x))) return ['资产类','增加','减少'];
   if(['应付','预计负债','合同负债','递延所得税负债','应交税','受托代理负债','应付职工薪酬'].some(x=>n.includes(x))) return ['负债类','减少','增加'];
   if(['股本','实收资本','资本公积','盈余公积','未分配利润','少数股东权益','限定性净资产','非限定性净资产','无偿调拨净资产','本年盈余分配'].some(x=>n.includes(x))) return ['所有者权益 / 净资产类','减少','增加'];
   if(n.includes('以前年度损益调整')) return ['损益调整类','通常记录费用型调整/调减以前年度利润','通常记录收入型调整/调增以前年度利润'];
   if(ch===24 && ['结余','结转'].some(x=>n.includes(x))) return ['预算结余类','通常减少或转出','通常增加或转入'];
   if(['收入','收益','补助预算收入','预算收入','捐赠收入','事业收入','商品销售收入'].some(x=>n.includes(x))) return ['收入 / 利得类','减少或结转','增加'];
   if(['成本','费用','损失','支出','少数股东损益'].some(x=>n.includes(x))) return ['费用 / 损失 / 支出类','增加','减少或结转'];
   if(n.includes('其他综合收益')) return ['其他综合收益 / 权益类','减少','增加'];
   if(n.includes('专用基金')) return ['净资产类·专用基金','减少','增加'];
   return ['会计科目','结合科目性质判断','结合科目性质判断'];
 }
 function parseAmount(text){
   const m=(text||'').replace(/[,\s，]/g,'').replace(/[()（）]/g,'').match(/-?\d+(?:\.\d+)?/);
   return m?Number(m[0]):null;
 }
 function explainEntry(entry){
   let panel=entry.querySelector('.entry-explain');
   if(panel){panel.hidden=!panel.hidden;return}
   const rows=[...entry.querySelectorAll('.entry-row')];
   if(!rows.length)return;
   let debitTotal=0,creditTotal=0,numericRows=0,amountRows=0;
   const info=[];
   rows.forEach(row=>{
     const dc=(row.querySelector('.dc')?.textContent||'').trim();
     const acct=row.querySelector('.acct');if(!acct)return;
     const word=acct.dataset.word||acct.textContent.trim();
     let kind=acct.dataset.kind, debit=acct.dataset.debit, credit=acct.dataset.credit;
     if(!kind){[kind,debit,credit]=classifyAccount(word)}
     const amt=parseAmount(row.querySelector('.amount')?.textContent||'');
     amountRows++;if(amt!==null){numericRows++;if(dc.includes('借'))debitTotal+=amt;if(dc.includes('贷'))creditTotal+=amt}
     info.push({dc,word,kind,effect:dc.includes('借')?(debit||'结合科目性质判断'):(credit||'结合科目性质判断'),amt});
   });
   const complete=numericRows===amountRows&&numericRows>0;
   const balanced=complete&&Math.abs(debitTotal-creditTotal)<0.005;
   panel=document.createElement('div');panel.className='entry-explain';
   const check=complete?(balanced?`借方合计 ${debitTotal.toLocaleString()} = 贷方合计 ${creditTotal.toLocaleString()}，分录平衡。`:`可识别金额：借方 ${debitTotal.toLocaleString()}，贷方 ${creditTotal.toLocaleString()}。课件可能存在省略金额、倒挤项或片段未完整列示。`):'这组分录有未标金额的行，所以这里只解释借贷方向，不强行判断金额是否平衡。';
   panel.innerHTML=`<div class="explain-title">这条分录到底发生了什么</div><div class="entry-effects">${info.map(d=>`<div class="effect-row"><span class="effect-dc ${d.dc.includes('借')?'is-debit':'is-credit'}">${d.dc||'—'}</span><div><b>${d.word}</b><small>${d.kind}</small></div><div class="effect-meaning">${d.effect}${d.amt!==null?` · ${d.amt.toLocaleString()}`:''}</div></div>`).join('')}</div><div class="balance-check ${balanced?'ok':''}">${check}</div><div class="explain-hint">读分录顺序：先认科目大类 → 再把借/贷翻译成增加、减少或结转 → 最后看为什么这个业务需要这种变化。</div>`;
   entry.append(panel);
 }
 document.querySelectorAll('.entry').forEach(entry=>{
   const head=entry.querySelector('.entry-head');if(!head||head.querySelector('.entry-explain-btn'))return;
   const btn=document.createElement('button');btn.className='entry-explain-btn';btn.type='button';btn.textContent='解释这条分录';
   btn.addEventListener('click',()=>explainEntry(entry));head.append(btn);
 });

 const DECISIONS={
  21:{title:'合并报表：先判断为什么要调整或抵销',intro:'把自己当成“集团”而不是某一家法人公司。先问：这件事对集团整体而言，真的发生了吗？',start:'q1',nodes:{
   q1:{q:'这笔事项发生在集团内部吗？',choices:[['不是，和集团外部第三方发生','r1'],['是，发生在母子公司或子公司之间','q2']]},
   q2:{q:'个别报表里是否留下相互对应的投资/权益、债权/债务、收入/成本等项目？',choices:[['有','r2'],['没有，更多是购买日公允价值、政策或期间口径问题','r3']]},
   r1:{result:'集团外部交易不属于内部抵销。先按各公司的正常会计处理确认，再纳入合并。'},
   r2:{result:'从集团整体看，内部双方不能把“自己欠自己、自己卖给自己、自己投自己”重复保留，所以要做抵销；随后继续检查未实现内部损益及其后续影响。'},
   r3:{result:'先做合并前调整：统一会计政策和会计期间；非同一控制下还要处理购买日可辨认资产、负债的公允价值及后续影响，再进入抵销。'}
  }},
  22:{title:'政策、估计、差错：三步判断',intro:'别先背定义。先判断“以前是不是错了”，再判断“规则有没有换”。',start:'q1',nodes:{
   q1:{q:'以前期间的处理，当时依据已经存在的信息，本来就是错的吗？',choices:[['是，本来就做错了','r1'],['不是，当时处理合理','q2']]},
   q2:{q:'现在改变的是确认原则、计量基础、列报口径或一套会计处理规则吗？',choices:[['是，规则层面发生变化','r2'],['不是，只是新信息让参数、寿命或方法估得更准','r3']]},
   r1:{result:'前期差错。重要差错通常采用追溯重述，把比较数据和期初留存收益改回“当时就做对”的状态。'},
   r2:{result:'会计政策变更。满足条件时通常采用追溯调整；追溯确实不可行时，从最早可行日期开始。'},
   r3:{result:'会计估计变更。因为是新信息带来的新估计，所以采用未来适用法，不把以前合理作出的估计翻回去重做。'}
  }},
  23:{title:'日后事项：先看时间，再看事实属于哪一天',intro:'最核心的问题不是“事情严重不严重”，而是年后的信息在证明年末旧事实，还是年后才新发生一个事实。',start:'q1',nodes:{
   q1:{q:'事项是否发生在资产负债表日至财务报告批准报出日之间？',choices:[['不是','r1'],['是','q2']]},
   q2:{q:'年后的信息，是否为资产负债表日已经存在的状况提供新的或进一步证据？',choices:[['是，年末事实本来就已经存在','r2'],['不是，状况是在年后才新发生','r3']]},
   r1:{result:'不属于本章定义的资产负债表日后事项，按它实际所属期间的正常规则处理。'},
   r2:{result:'调整事项。把年后取得的新证据反映回年末财务报表；课件中的年末诉讼、年后判决就是典型逻辑。'},
   r3:{result:'非调整事项。通常不改年末数字；如果重大到会影响报表使用者判断，则在附注中披露。'}
  }},
  24:{title:'政府会计：一笔业务到底记一套还是两套',intro:'政府单位既要说明“经济业务发生了什么”，又要说明“预算资金执行到哪了”。',start:'q1',nodes:{
   q1:{q:'这笔业务是否属于纳入部门预算管理的现金收支业务？',choices:[['是','r1'],['不是','r2']]},
   r1:{result:'通常同时做财务会计和预算会计。财务会计回答资产、负债、收入、费用等发生了什么；预算会计回答预算收入、预算支出、预算结余和资金结存怎么变化。'},
   r2:{result:'通常只做财务会计，不机械地再做一套预算分录。判断时先回到“是否属于预算管理现金收支”这个条件。'}
  }},
  25:{title:'非营利组织：先判断“这资源到底是不是我的”',intro:'先别急着确认捐赠收入。第一步先判断组织是真的控制这项资源，还是只替别人中转。',start:'q1',nodes:{
   q1:{q:'组织对资源拥有控制，还是只按委托人要求转交给指定受益人？',choices:[['只是中转，不能改变受益人或用途','r1'],['组织取得并控制该资源','q2']]},
   q2:{q:'捐赠人是否对资源设置了时间限制或用途限制？',choices:[['有限制','r2'],['没有限制','r3']]},
   r1:{result:'这是受托代理业务。核心不是捐赠收入，而是同时确认受托代理资产和受托代理负债；组织只是中介。'},
   r2:{result:'确认限定性捐赠收入，后续在限制解除或期末结转时按本章规则进入相应净资产。'},
   r3:{result:'确认非限定性捐赠收入。仅有捐赠承诺而不满足确认条件时，本章课件明确要求不确认捐赠收入。'}
  }}
 };
 function renderDecision(){
   const data=DECISIONS[ch],anchor=document.querySelector('#why');if(!data||!anchor)return;
   const sec=document.createElement('section');sec.className='decision-lab';sec.id='decision-lab';
   sec.innerHTML=`<div class="kicker">交互判断树</div><h2>${data.title}</h2><p>${data.intro}</p><div class="decision-path"></div><div class="decision-stage"></div><button type="button" class="decision-reset" hidden>重新判断</button>`;
   anchor.insertAdjacentElement('afterend',sec);
   const stage=sec.querySelector('.decision-stage'),path=sec.querySelector('.decision-path'),reset=sec.querySelector('.decision-reset');let trail=[];
   function go(id){const node=data.nodes[id];if(!node)return;if(node.result){stage.innerHTML=`<div class="decision-result"><span>结论</span><p>${node.result}</p></div>`;reset.hidden=false;return}
     stage.innerHTML=`<div class="decision-question">${node.q}</div><div class="decision-choices"></div>`;const box=stage.querySelector('.decision-choices');
     node.choices.forEach(([label,next])=>{const b=document.createElement('button');b.type='button';b.textContent=label;b.onclick=()=>{trail.push(label);path.innerHTML=trail.map((x,i)=>`<span>${i+1}. ${x}</span>`).join('');go(next)};box.append(b)})}
   reset.onclick=()=>{trail=[];path.innerHTML='';reset.hidden=true;go(data.start)};go(data.start);
 }
 renderDecision();

 const mastery=[...document.querySelectorAll('.mastery')];
 function saveProgress(){const done=mastery.filter(b=>b.classList.contains('done')).length;localStorage.setItem(`acct_learn_${ch}_total`,String(mastery.length));localStorage.setItem(`acct_learn_${ch}_done`,String(done));localStorage.setItem(`acct_learn_${ch}_visited`,'1')}
 setTimeout(saveProgress,0);
 mastery.forEach(b=>b.addEventListener('click',()=>setTimeout(saveProgress,0)));

 const key=`acct_learn_${ch}_scroll`,saved=Number(sessionStorage.getItem(key)||0);
 if(saved>700){const b=document.createElement('button');b.className='resume-reading';b.type='button';b.textContent='继续上次位置';b.onclick=()=>{window.scrollTo({top:saved,behavior:'smooth'});b.remove()};document.body.append(b)}
 let t;window.addEventListener('scroll',()=>{clearTimeout(t);t=setTimeout(()=>sessionStorage.setItem(key,String(window.scrollY)),120)},{passive:true});

 if(ch>=21&&ch<=25&&!document.querySelector('.review-cta')){
   const cta=document.createElement('section');cta.className='review-cta';
   cta.innerHTML=`<div class="kicker">学完测一下</div><h2>合上页面前，花 5 分钟自测</h2><p>主动回忆比再读一遍更能检验是否真的理解，只抓本章最容易混的分界点。</p><a href="../review.html?ch=${ch}">去自测第 ${ch} 章 →</a>`;
   const quick=document.querySelector('#quick');
   if(quick)quick.insertAdjacentElement('afterend',cta);
   else (document.querySelector('main')||document.body).append(cta);
 }
})();