(function(){
 const ch=Number(document.body.dataset.chapter||0); if(![21,22,23,24,25].includes(ch)) return;
 function kindOf(name){
  const n=name||'';
  if(n.includes('其他综合收益')) return ['其他综合收益 / 权益类','减少','增加'];
  if(n.includes('库存股')) return ['所有者权益备抵项目','增加库存股/减少所有者权益','减少库存股/增加所有者权益'];
  if(['累计折旧','累计摊销','坏账准备','减值准备','存货跌价准备'].some(x=>n.includes(x))) return ['资产类备抵科目','减少备抵＝相关资产净额增加','增加备抵＝相关资产净额减少'];
  if(n.includes('资金结存')) return ['预算结余类·资金结存','增加','减少'];
  if(['银行存款','库存现金','固定资产','无形资产','存货','库存商品','应收','预付款','长期股权投资','债权投资','受托代理资产','政府储备物资','零余额账户用款额度','持有待售资产'].some(x=>n.includes(x))) return ['资产类','增加','减少'];
  if(['应付','预计负债','合同负债','递延所得税负债','应交税','应交增值税','受托代理负债','应付职工薪酬'].some(x=>n.includes(x))) return ['负债类','减少','增加'];
  if(['股本','实收资本','资本公积','盈余公积','未分配利润','少数股东权益','限定性净资产','非限定性净资产','无偿调拨净资产','本年盈余分配'].some(x=>n.includes(x))) return ['所有者权益 / 净资产类','减少','增加'];
  if(n.includes('以前年度损益调整')) return ['损益调整类','费用型调整/调减以前年度利润','收入型调整/调增以前年度利润'];
  if(ch===24 && ['结余','结转'].some(x=>n.includes(x))) return ['预算结余类','通常减少或转出','通常增加或转入'];
  if(['收入','投资收益','处置收益','公允价值变动收益'].some(x=>n.includes(x))) return ['收入 / 利得类','减少或结转','增加'];
  if(['成本','费用','损失','支出','少数股东损益','资产处置损益'].some(x=>n.includes(x))) return ['费用 / 损失 / 支出类','增加','减少或结转'];
  return ['会计科目','结合科目性质判断','结合科目性质判断'];
 }
 function parseAmt(t){const m=(t||'').replace(/[,，\s]/g,'').match(/-?\d+(?:\.\d+)?/);return m?m[0]:''}
 function normalizeEffect(row){
   const dc=(row.querySelector('.dc')?.textContent||'').trim(); const acct=row.querySelector('.acct'); if(!acct)return null;
   const name=acct.dataset.word||acct.textContent.trim(); const [kind,db,cr]=kindOf(name); const effect=dc.includes('借')?db:cr; const amount=parseAmt(row.querySelector('.amount')?.textContent||'');
   return {dc,name,kind,effect,amount};
 }
 function story(items){
   const has=(k,e)=>items.some(x=>x.kind.includes(k)&&x.effect.includes(e));
   if(has('资产类','增加')&&has('收入 / 利得类','增加')) return '组织收到或形成了一项资产，同时确认了一项收入/利得。大白话：资源进来了，而且这部分不是借来的，所以形成收益。';
   if(has('资产类','增加')&&has('负债类','增加')) return '资产增加的同时负债也增加。大白话：资源拿到了，但同时欠下了对应义务，净资产并没有因此直接增加。';
   if(has('费用 / 损失 / 支出类','增加')&&items.some(x=>x.kind==='资产类'&&x.effect==='减少')) return '确认费用/损失，同时减少资产。大白话：这次业务消耗了资源，或者付出了现金/资产，所以当期成果被压低。';
   if(has('费用 / 损失 / 支出类','增加')&&has('负债类','增加')) return '费用已经发生，但还没有完全支付，于是同时形成负债。';
   if(items.filter(x=>x.kind==='资产类').some(x=>x.effect==='增加')&&items.filter(x=>x.kind==='资产类').some(x=>x.effect==='减少')) return '资产内部发生形态转换：一种资产增加，另一种资产减少。大白话：不是凭空赚了或亏了，而是资源从一种形式换成另一种形式。';
   if(has('负债类','减少')&&items.some(x=>x.kind==='资产类'&&x.effect==='减少')) return '用资产偿还或结清了一项负债：义务减少，同时现金等资产流出。';
   if(items.some(x=>x.kind.includes('净资产类')&&x.effect==='减少')&&items.some(x=>x.kind.includes('净资产类')&&x.effect==='增加')) return '这是净资产/权益内部结转。总额未必改变，重点是不同权益项目之间重新分类。';
   if(items.some(x=>x.effect.includes('结转'))) return '这条分录主要是在做期末结转或内部重分类，不要把借贷机械理解成“赚/亏”。';
   return '把每一行先翻译成“哪类科目发生了什么变化”，再把这些变化连起来，就是这条分录的经济含义。';
 }
 function upgradeEntry(entry){
   const panel=entry.querySelector('.entry-explain'); if(!panel||panel.querySelector('.entry-story'))return;
   const items=[...entry.querySelectorAll('.entry-row')].map(normalizeEffect).filter(Boolean); if(!items.length)return;
   const effectRows=[...panel.querySelectorAll('.effect-row')];
   items.forEach((it,i)=>{const r=effectRows[i];if(!r)return;const small=r.querySelector('small');if(small)small.textContent=it.kind;const meaning=r.querySelector('.effect-meaning');if(meaning)meaning.textContent=it.effect+(it.amount?' · '+Number(it.amount).toLocaleString():'')});
   const box=document.createElement('div');box.className='entry-story';box.innerHTML='<b>整条分录翻成大白话</b><p>'+story(items)+'</p>';
   panel.querySelector('.balance-check')?.before(box);
 }
 document.addEventListener('click',e=>{if(e.target.closest('.entry-explain-btn'))setTimeout(()=>upgradeEntry(e.target.closest('.entry')),0)});

 const MAPS={
  21:{title:'先判“合并是什么”，再做“合并报表怎么抵”',steps:[['① 有没有形成控制？','没有形成控制，就先别套企业合并里的控股合并逻辑。形成控制后再进入同一控制/非同一控制判断。'],['② 是否受同一最终控制方控制且不是暂时性的？','是：同一控制下企业合并，强调账面价值和原有商誉延续；否：非同一控制下企业合并，进入购买法、公允价值和新商誉逻辑。'],['③ 是控股合并还是吸收合并？','控股合并：被合并方仍是独立法人，后面需要合并财务报表；吸收合并：资产负债直接进入合并方本身。'],['④ 到合并报表，再把集团当成“一个人”','先统一口径/做购买日调整，再抵投资与权益、内部债权债务、内部收入成本、未实现内部损益等。']]},
  22:{title:'最容易混的三个边界',steps:[['① 以前本来就错了？','是 → 前期差错。核心是“当时已有信息，但没有正确使用”。'],['② 以前没错，只是现在换了规则？','是 → 会计政策变更。改变的是确认、计量、列报的一套原则或基础。'],['③ 规则没换，只是参数被新信息更新？','是 → 会计估计变更。以前估计可以合理，所以不翻旧账，未来适用。'],['补一句','首次发生的交易，或本期交易与以前具有本质差别而采用新政策，并不当然属于会计政策变更。']]},
  23:{title:'用一条时间线判断日后事项',steps:[['资产负债表日','先把“年末当时已经存在什么状况”钉死。'],['↓ 日后期间','从资产负债表日后第一天开始，到财务报告批准报出日结束；若财报重新批准，截止日随新的批准报出日改变。'],['得到新信息','如果新信息证明年末旧状况 → 调整；如果年后才新产生状况 → 非调整。'],['最后看重大性','重大非调整事项不改年末数字，但需要在附注中披露，避免使用者被旧数字误导。']]},
  24:{title:'政府会计的“双问题”框架',steps:[['问题 A：经济上发生了什么？','财务会计回答：资产、负债、净资产、收入、费用怎样变化，主要采用权责发生制。'],['问题 B：预算执行到哪了？','预算会计回答：预算收入、预算支出、预算结余和资金结存怎样变化，主要采用收付实现制。'],['什么时候两套一起记？','纳入部门预算管理的现金收支业务通常平行记账：财务会计一套 + 预算会计一套。'],['什么时候别硬凑预算分录？','没有预算现金收支的事项，例如部分折旧等，只按财务会计处理，不因为“政府单位”就机械做两套。']]},
  25:{title:'非营利组织收到资源时，连续问三个问题',steps:[['① 现在已经满足确认条件了吗？','只有捐赠承诺、还不满足非交换交易收入确认条件 → 先不确认捐赠收入。'],['② 资源归组织控制，还是只是代别人中转？','指定受益人、组织不能改变受益人或用途 → 受托代理资产 + 受托代理负债，不是自己的捐赠收入。'],['③ 如果归组织控制，外部捐赠人有没有时间/用途限制？','有 → 限定性；没有 → 非限定性。这里看外部限制，不是组织内部自己作出的限制。'],['④ 限制后来解除怎么办？','按本章规则把相应限定性净资产重分类为非限定性净资产。']]}
 };
 function addMap(){const data=MAPS[ch],anchor=document.querySelector('.decision-lab')||document.querySelector('#why');if(!data||!anchor||document.querySelector('.chapter-map2'))return;const s=document.createElement('section');s.className='chapter-map2';s.innerHTML='<div class="kicker">本章最小判断框架</div><h2>'+data.title+'</h2><div class="map2-grid">'+data.steps.map(x=>'<div class="map2-step"><b>'+x[0]+'</b><span>'+x[1]+'</span></div>').join('')+'</div>';anchor.insertAdjacentElement('afterend',s)} addMap();
})();
