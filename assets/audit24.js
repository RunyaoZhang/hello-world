(function(){
  if(Number(document.body.dataset.chapter||0)!==24) return;
  if(document.querySelector('.audit24-core')) return;
  const root=document.querySelector('.study-content')||document.body;
  const txt=root.innerText.replace(/\s+/g,'');
  const has=(...xs)=>xs.some(x=>txt.includes(x.replace(/\s+/g,'')));
  const blocks=[];
  const card=(t,x)=>`<div class="map2-step"><b>${t}</b><span>${x}</span></div>`;

  if(!has('双功能','双基础','双报告')) blocks.push(card('政府会计的三组“双”','双功能：预算会计 + 财务会计；双基础：预算会计原则上收付实现制，财务会计权责发生制；双报告：决算报告主要来自预算会计，财务报告主要来自财务会计。'));
  if(!has('纳入部门预算管理的现金收支','平行记账')) blocks.push(card('什么时候才要“平行记账”','纳入部门预算管理的现金收支业务，财务会计和预算会计同时核算；不属于这类现金收支的业务通常只做财务会计。预算会计不是把银行存款再记一遍，而是用“资金结存”等预算科目反映预算资金运动。'));
  if(!has('财政直接支付','财政授权支付','零余额账户用款额度')) blocks.push(card('财政支付两条线','财政直接支付通常由财政部门直接向收款人付款；财政授权支付通过单位零余额账户额度支付。年末额度注销、次年恢复时，财务会计与预算会计按各自科目恢复，不能把两套科目混写。'));
  if(!has('预收账款','事业预算收入','合同完成进度')) blocks.push(card('事业收入：收钱和确认收入可能不是同一天','预收款方式下，收到款时财务会计先确认预收账款，预算会计按实际现金流确认事业预算收入；以后按合同完成进度，财务会计再确认事业收入。'));
  if(!has('捐赠收入','其他支出','运输费')) blocks.push(card('接受非现金捐赠时，附带现金支出仍可能触发预算会计','受赠设备按凭据/公允价值等规则计入资产并确认捐赠收入；为取得该资产实际支付的运输费等现金支出计入资产成本，预算会计同步确认“其他支出—资金结存”。'));
  if(!has('非财政拨款结转','非财政拨款结余','结转转入')) blocks.push(card('专项资金先“结转”，项目结束后才可能变“结余”','非财政专项资金年末先在“非财政拨款结转”内部归集。项目完成、剩余资金经批准留归单位使用后，才从累计结转转入“非财政拨款结余——结转转入”。'));
  if(!has('专用结余','专用基金','职工福利基金')) blocks.push(card('专用结余 vs 专用基金不是一回事','提取职工福利基金时，预算会计从“非财政拨款结余分配”转入“专用结余”；财务会计同时从“本年盈余分配”转入“专用基金”。一个是预算口径，一个是财务口径。'));
  if(!has('无偿调拨净资产','资产处置费用')) blocks.push(card('无偿调出资产：资产账面价值和现金运费分开看','无偿调出固定资产时，账面净值进入“无偿调拨净资产”；调拨过程中实际支付的运输费等进入资产处置费用，同时因发生预算管理现金支出而做预算会计“其他支出”。'));
  if(!has('计提固定资产折旧','预算会计：不作处理','预算会计不作处理')) blocks.push(card('买固定资产双记，后续折旧只做财务会计','购买固定资产发生纳入预算管理的现金支出时两套会计同时记；以后按月折旧属于非现金消耗，只做财务会计“业务活动费用—固定资产累计折旧”，预算会计不再记支出。'));
  if(!has('无权参与被投资单位','成本法','长期股权投资')) blocks.push(card('事业单位长期股权投资方法','无权参与被投资单位财务和经营决策的长期股权投资采用成本法；能够实施控制或具有重大影响等情形按政府会计准则规定采用相应方法，不能机械照搬企业会计的判断口径。'));
  if(!has('政府储备物资','发出','在库')) blocks.push(card('政府储备物资：可回收和一次性消耗要分开','一次消耗性物资发出时直接转业务活动费用；预期大部分可收回的物资发出时只在“在库→发出”明细间转，等实际收回时才把未收回部分转入业务活动费用。'));
  if(!has('受托代理资产','受托代理负债')) blocks.push(card('受托代理业务不属于自己的净资产','收到受托保管/转交的资产时，同时确认受托代理资产和受托代理负债；按委托方指令发出时二者同步冲减。它反映“代别人管”，不是本单位的收入或净资产。'));
  if(!has('应纳入政府部门合并财务报表','脱钩的行业协会','挂靠')) blocks.push(card('政府部门合并范围看实际管理关系','纳入本部门预决算管理的行政事业单位和社会组织，以及本部门所属未纳入预决算管理的事业单位，按课件规则纳入；所属企业、与机关脱钩的行业协会、无财政预算拨款关系的挂靠组织等不纳入。'));

  const entries=[];
  if(!has('固定资产累计折旧','业务活动费用','预算会计：不作处理')) entries.push(`
  <div class="entry"><div class="entry-head">固定资产后续折旧：只有财务会计</div><div class="entry-grid">
    <div class="entry-row"><span class="dc debit">借</span><span><span class="acct" tabindex="0" data-kind="费用类（政府财务会计）" data-word="业务活动费用" data-tip="单位履行职能或开展专业业务活动发生的费用。" data-debit="增加" data-credit="减少或结转">业务活动费用</span></span><span class="amount">本期折旧额</span></div>
    <div class="entry-row"><span class="dc credit">贷</span><span><span class="acct" tabindex="0" data-kind="资产类备抵科目（政府财务会计）" data-word="固定资产累计折旧" data-tip="固定资产累计计提的折旧，抵减固定资产账面价值。" data-debit="减少备抵" data-credit="增加备抵">固定资产累计折旧</span></span><span class="amount">同额</span></div>
  </div><div class="entry-note">预算会计不作处理，因为这里没有新的现金收支。</div></div>`);
  if(!has('受托代理资产18','受托代理负债18')) entries.push(`
  <div class="entry"><div class="entry-head">受托代理物资：收到时成对确认</div><div class="entry-grid">
    <div class="entry-row"><span class="dc debit">借</span><span><span class="acct" tabindex="0" data-kind="资产类（政府财务会计）" data-word="受托代理资产" data-tip="受托管理但不属于本单位所有的资产。" data-debit="增加" data-credit="减少">受托代理资产</span></span><span class="amount">受托资产价值</span></div>
    <div class="entry-row"><span class="dc credit">贷</span><span><span class="acct" tabindex="0" data-kind="负债类（政府财务会计）" data-word="受托代理负债" data-tip="因受托代理资产而承担的交付、返还或按指令处置义务。" data-debit="减少" data-credit="增加">受托代理负债</span></span><span class="amount">同额</span></div>
  </div></div>`);

  if(!blocks.length&&!entries.length) return;
  const anchor=document.querySelector('#why')||document.querySelector('.study-content section');
  if(!anchor) return;
  const s=document.createElement('section'); s.className='audit24-core';
  s.innerHTML=`<div class="kicker">PDF 完整性补漏</div><h2>政府会计最核心：同一笔业务要先判断“财务口径、预算口径，还是两边都记”</h2>${blocks.length?`<div class="map2-grid">${blocks.join('')}</div>`:''}${entries.join('')}`;
  anchor.insertAdjacentElement('afterend',s);
})();
