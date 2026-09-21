(function(){
  if(Number(document.body.dataset.chapter||0)!==23) return;
  if(document.querySelector('.audit23-core')) return;
  const bodyText=(document.querySelector('.study-content')||document.body).innerText.replace(/\s+/g,'');
  const has=(...xs)=>xs.some(x=>bodyText.includes(x.replace(/\s+/g,'')));
  const blocks=[];
  const card=(title,text)=>`<div class="map2-step"><b>${title}</b><span>${text}</span></div>`;

  if(!has('再次批准','重新批准','4月26日')) blocks.push(card('批准报出日会“顺延”','日后期间的终点是财务报告批准报出日。若批准后、实际报出前又发生重大事项，报表因此重新调整或说明并再次获批，则日后事项期间延长到新的批准报出日，而不是原批准日或实际公布日。'));
  if(!has('现金收支','货币资金项目','现金流量表')) blocks.push(card('调整事项≠把报告年度现金也改掉','日后调整事项即使后来已经实际付款或收款，也不调整报告年度资产负债表的货币资金和现金流量表正表；报告年度只调整形成于资产负债表日的债权债务、损益等，实际收付款作为次年事项。'));
  if(!has('汇算清缴后','汇算清缴完成后')) blocks.push(card('所得税要先看汇算清缴时点','调整事项发生在报告年度所得税汇算清缴前，符合税法的可调整报告年度应交所得税；若发生在汇算清缴后，则通常不再改报告年度应纳税额，而按暂时性差异/当期所得税规则处理。'));
  if(!has('每股收益')) blocks.push(card('报表联动不只资产负债表','调整事项涉及损益时，要同步调整报告年度利润表、资产负债表和所有者权益变动表；需要披露每股收益的企业，还要相应重算基本及稀释每股收益。'));
  if(!has('利润分配方案','现金股利','现时义务')) blocks.push(card('日后审议股利：通常是非调整事项','资产负债表日后才审议通过的现金股利/利润分配方案，在资产负债表日尚未形成现时义务，所以不调整报告年度负债，但属于重要非调整事项时应披露。'));
  if(!has('销售退回','2 400 000','2712000')) blocks.push(card('报告年度销售在日后退回','如果退货证明报告年度销售状态已经存在问题，属于调整事项：冲回报告年度收入和销项税、恢复存货并冲回成本，同时处理报告年度所得税、未分配利润和盈余公积。'));
  if(!has('破产清算','坏账准备','700 000')) blocks.push(card('客户日后破产：看它是不是旧风险的新证据','若客户在资产负债表日已经财务恶化，日后宣告破产只是进一步证明原有信用风险，应补提报告年度坏账准备，并同步调整递延所得税和留存收益。若风险完全由日后新事件造成，则不能倒回去调。'));
  if(!has('自然灾害','火灾','非调整事项')) blocks.push(card('日后火灾/自然灾害','资产负债表日后才发生的火灾、自然灾害等导致重大资产损失，通常是非调整事项：不改报告年度数字；重大时在附注披露性质和财务影响。'));

  const entries=[];
  if(!has('不调整报告年度资产负债表的货币资金','第二笔分录作为')) entries.push(`
    <div class="entry"><div class="entry-head">诉讼判决后实际付款：付款属于次年事项</div><div class="entry-grid">
      <div class="entry-row"><span class="dc debit">借</span><span><span class="acct" tabindex="0" data-kind="负债类" data-word="其他应付款" data-tip="已经形成、尚未支付的其他付款义务。" data-debit="减少" data-credit="增加">其他应付款</span></span><span class="amount">实际支付额</span></div>
      <div class="entry-row"><span class="dc credit">贷</span><span><span class="acct" tabindex="0" data-kind="资产类" data-word="银行存款" data-tip="企业存放在银行等金融机构的货币资金。" data-debit="增加" data-credit="减少">银行存款</span></span><span class="amount">实际支付额</span></div>
    </div><div class="entry-note">这笔现金分录记在次年，不回头改报告年度货币资金和现金流量表。</div></div>`);
  if(!has('应交增值税（销项税额）','库存商品——A商品')) entries.push(`
    <div class="entry"><div class="entry-head">报告年度销售在日后全部退回 · 课件例23-6</div><div class="entry-grid">
      <div class="entry-row"><span class="dc debit">借</span><span><span class="acct" tabindex="0" data-kind="损益调整类" data-word="以前年度损益调整——主营业务收入" data-tip="冲回报告年度已经确认、现需更正的收入。" data-debit="减少以前年度利润" data-credit="增加以前年度利润">以前年度损益调整——主营业务收入</span></span><span class="amount">2 400 000</span></div>
      <div class="entry-row"><span class="dc debit">借</span><span><span class="acct" tabindex="0" data-kind="负债类" data-word="应交税费——应交增值税（销项税额）" data-tip="销售退回时冲减原确认的销项税额。" data-debit="减少" data-credit="增加">应交税费——应交增值税（销项税额）</span></span><span class="amount">312 000</span></div>
      <div class="entry-row"><span class="dc credit">贷</span><span><span class="acct" tabindex="0" data-kind="资产类" data-word="应收账款" data-tip="企业因销售商品、提供服务等应向客户收取的款项。" data-debit="增加" data-credit="减少">应收账款</span></span><span class="amount">2 712 000</span></div>
      <div class="entry-row"><span class="dc debit">借</span><span><span class="acct" tabindex="0" data-kind="资产类" data-word="库存商品" data-tip="已经完成生产、可供销售的商品。" data-debit="增加" data-credit="减少">库存商品</span></span><span class="amount">2 000 000</span></div>
      <div class="entry-row"><span class="dc credit">贷</span><span><span class="acct" tabindex="0" data-kind="损益调整类" data-word="以前年度损益调整——主营业务成本" data-tip="冲回报告年度因该销售结转的成本。" data-debit="增加以前年度成本" data-credit="减少以前年度成本">以前年度损益调整——主营业务成本</span></span><span class="amount">2 000 000</span></div>
    </div></div>`);

  if(!blocks.length && !entries.length) return;
  const anchor=document.querySelector('#why')||document.querySelector('.study-content section');
  if(!anchor) return;
  const s=document.createElement('section'); s.className='audit23-core';
  s.innerHTML=`<div class="kicker">PDF 完整性补漏</div><h2>日后事项：先问“旧状况的新证据，还是日后才发生的新事情？”</h2>${blocks.length?`<div class="map2-grid">${blocks.join('')}</div>`:''}${entries.join('')}`;
  anchor.insertAdjacentElement('afterend',s);
})();
