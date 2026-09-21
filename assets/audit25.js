(function(){
  if(Number(document.body.dataset.chapter||0)!==25) return;
  if(document.querySelector('.audit25-core')) return;
  const root=document.querySelector('.study-content')||document.body;
  const txt=root.innerText.replace(/\s+/g,'');
  const has=(...xs)=>xs.some(x=>txt.includes(x.replace(/\s+/g,'')));
  const blocks=[];
  const card=(t,x)=>`<div class="map2-step"><b>${t}</b><span>${x}</span></div>`;

  if(!has('不取得经济回报','不保留或者享有任何财产权利')) blocks.push(card('先抓住民非会计的“为什么”','民间非营利组织以公益或其他非营利目的成立，资源提供者不取得经济回报，也不保留或享有组织财产的所有权。因此不设置“所有者权益/利润”，而用“净资产”反映积累。'));
  if(!has('资产负债表','业务活动表','现金流量表')) blocks.push(card('三张基本报表','民间非营利组织财务会计报告至少包括资产负债表、业务活动表和现金流量表，并附会计报表附注等资料。'));
  if(!has('捐赠承诺','不应予以确认')) blocks.push(card('捐赠承诺≠捐赠收入','书面协议或口头约定的捐赠承诺如果尚不满足非交换交易收入确认条件，不确认捐赠收入，只按要求在附注披露。'));
  if(!has('名义金额','人民币1元')) blocks.push(card('非现金捐赠的计量兜底','现金按实收金额；股权按有效凭据金额；其他非现金资产优先按凭据金额或公允价值。固定资产、无形资产等既无凭据又无法可靠计量公允价值时，课件口径按名义金额人民币1元入账。'));
  if(!has('服务捐赠','发票','公允价值')) blocks.push(card('服务捐赠不是一律确认','只有捐赠方提供发票等凭据，且凭据金额能反映受赠服务公允价值时，才按凭据金额同时确认费用和捐赠收入；其他服务捐赠不确认。'));
  if(!has('时间限制','用途限制','限定性收入')) blocks.push(card('限定性看外部限制，不看内部决定','捐赠人对时间或用途设限→限定性收入/限定性净资产；没有外部限制→非限定性。理事会等内部机构自己作出的用途限制可以自行撤销，不构成限定性净资产。'));
  if(!has('受托代理资产','受托代理负债','中介')) blocks.push(card('指定第三方受益人：你只是“中转站”','如果捐赠人已经指定最终受益人，民非组织只起中介作用，应确认受托代理资产和受托代理负债，不确认捐赠收入，也不把转交资产记成自己的业务活动成本。'));
  if(!has('限制已经完全解除','重分类','非限定性净资产')) blocks.push(card('限制解除不是“新收入”','时间限制届满、用途已经实现或捐赠人撤销限制时，将相应限定性净资产重分类为非限定性净资产。只是净资产内部搬家，不增加净资产总额。'));
  if(!has('退回未使用捐款','其他应付款','管理费用')) blocks.push(card('剩余限定捐款需要退回','如果因组织自身原因未按限制使用、剩余款需要退给捐赠人，课件例25-6通过费用确认退款义务，而不是继续留在净资产里。'));
  if(!has('业务活动成本——限定性费用','业务活动成本——非限定性费用')) blocks.push(card('费用也要跟限制口径走','使用仍受限制的资源时，业务活动成本/管理费用按限定性费用口径核算并与限定性净资产结转；限制已经解除后发生的后续费用按非限定性费用口径进入非限定性净资产。'));

  const entries=[];
  if(!has('借：限定性净资产','贷：非限定性净资产')) entries.push(`
  <div class="entry"><div class="entry-head">限制完全解除：净资产重分类</div><div class="entry-grid">
    <div class="entry-row"><span class="dc debit">借</span><span><span class="acct" tabindex="0" data-kind="净资产类" data-word="限定性净资产" data-tip="受到捐赠人等外部时间或用途限制的净资产。" data-debit="减少" data-credit="增加">限定性净资产</span></span><span class="amount">解除限制金额</span></div>
    <div class="entry-row"><span class="dc credit">贷</span><span><span class="acct" tabindex="0" data-kind="净资产类" data-word="非限定性净资产" data-tip="不存在外部时间或用途限制的净资产。" data-debit="减少" data-credit="增加">非限定性净资产</span></span><span class="amount">同额</span></div>
  </div><div class="entry-note">这不是收入确认，而是净资产内部重分类，总额不变。</div></div>`);
  if(!has('银行存款——受托代理资产','受托代理负债')) entries.push(`
  <div class="entry"><div class="entry-head">受托代理现金：收到时不确认捐赠收入</div><div class="entry-grid">
    <div class="entry-row"><span class="dc debit">借</span><span><span class="acct" tabindex="0" data-kind="资产类" data-word="银行存款——受托代理资产" data-tip="代委托方保管、等待按指令转交的货币资金。" data-debit="增加" data-credit="减少">银行存款——受托代理资产</span></span><span class="amount">收到金额</span></div>
    <div class="entry-row"><span class="dc credit">贷</span><span><span class="acct" tabindex="0" data-kind="负债类" data-word="受托代理负债" data-tip="因受托代理资产而承担的转交或返还义务。" data-debit="减少" data-credit="增加">受托代理负债</span></span><span class="amount">同额</span></div>
  </div></div>`);
  if(!has('管理费用——限制性费用','其他应付款')) entries.push(`
  <div class="entry"><div class="entry-head">未按限制使用而需退回剩余捐款 · 例25-6</div><div class="entry-grid">
    <div class="entry-row"><span class="dc debit">借</span><span><span class="acct" tabindex="0" data-kind="费用类" data-word="管理费用——限制性费用" data-tip="与仍受限制资源相关、按课件口径确认的管理费用。" data-debit="增加" data-credit="减少或结转">管理费用——限制性费用</span></span><span class="amount">50 000</span></div>
    <div class="entry-row"><span class="dc credit">贷</span><span><span class="acct" tabindex="0" data-kind="负债类" data-word="其他应付款" data-tip="应向其他单位或个人支付、返还的款项。" data-debit="减少" data-credit="增加">其他应付款</span></span><span class="amount">50 000</span></div>
  </div></div>`);

  if(!blocks.length&&!entries.length) return;
  const anchor=document.querySelector('#why')||document.querySelector('.study-content section');
  if(!anchor) return;
  const s=document.createElement('section'); s.className='audit25-core';
  s.innerHTML=`<div class="kicker">PDF 完整性补漏</div><h2>民非会计最核心：钱是谁给的、有没有外部限制、你是受赠人还是只是中转人</h2>${blocks.length?`<div class="map2-grid">${blocks.join('')}</div>`:''}${entries.join('')}`;
  anchor.insertAdjacentElement('afterend',s);

  // audit25-deep-map: PDF table rules that are easy to lose in extraction.
  {
    const x=document.createElement('section'); x.className='audit25-deep-map';
    x.innerHTML=`
      <div class="kicker">逐页复核补齐 · 判断顺序</div>
      <h2>捐赠题只按 4 个问题走：收到什么 → 怎么计量 → 有没有限制 → 谁真正受益</h2>
      <div class="map2-grid">
        <div class="map2-step"><b>捐赠和捐赠承诺先分开</b><span>捐赠是无偿转让现金或其他资产，或无偿清偿/取消受赠人的负债；捐赠承诺只是书面协议或口头约定。承诺本身不满足非交换交易收入确认条件，不确认收入，但按规定在附注披露。</span></div>
        <div class="map2-step"><b>受赠资产的计量顺序</b><span>现金按实收金额；股权按合法有效的捐赠票据等凭据金额。其他非现金资产优先用凭据金额；无凭据或凭据金额与公允价值相差较大时用公允价值。固定资产、无形资产等既无凭据又无法可靠计量公允价值时按名义金额人民币 1 元；文物资源无凭据时也按名义金额。服务捐赠只有凭据金额能够反映服务公允价值时才确认。</span></div>
        <div class="map2-step"><b>延期退还：为什么“谁的原因”决定借方</b><span>因捐赠方、法律法规等民非组织之外的原因需要偿还捐赠资产或款项：借“捐赠收入”，贷“其他应付款”等；因民非组织自身原因产生现时义务：借“管理费用”，贷“其他应付款”。同样是退款，经济实质不同。</span></div>
        <div class="map2-step"><b>同一期间内限制就会完全解除</b><span>如果限定性捐赠收入的限制在确认收入的当期预计就会完全解除，课件直接在收入内部重分类：借“捐赠收入—限定性收入”，贷“捐赠收入—非限定性收入”。这和期末以后“借限定性净资产、贷非限定性净资产”的净资产重分类不是同一时点。</span></div>
        <div class="map2-step"><b>期末结转后收入账户归零</b><span>限定性捐赠收入期末结转到限定性净资产；非限定性捐赠收入结转到非限定性净资产。后续时间限制到期、用途实现或捐赠人撤销限制，再把相应限定性净资产转成非限定性净资产。</span></div>
      </div>
      <div class="entry"><div class="entry-head">外部原因导致需要退还捐赠</div><div class="entry-grid">
        <div class="entry-row"><span class="dc debit">借</span><span><span class="acct" tabindex="0" data-kind="收入类" data-word="捐赠收入" data-tip="民间非营利组织接受捐赠形成的收入；外部原因导致需退还时按课件冲减。" data-debit="减少" data-credit="增加">捐赠收入</span></span><span class="amount">应退金额</span></div>
        <div class="entry-row"><span class="dc credit">贷</span><span><span class="acct" tabindex="0" data-kind="负债类" data-word="其他应付款" data-tip="已经形成、尚待支付或退还的其他款项。" data-debit="减少" data-credit="增加">其他应付款</span></span><span class="amount">同额</span></div>
      </div></div>
      <div class="entry"><div class="entry-head">当期预计限制会完全解除：收入内部重分类</div><div class="entry-grid">
        <div class="entry-row"><span class="dc debit">借</span><span><span class="acct" tabindex="0" data-kind="收入类" data-word="捐赠收入——限定性收入" data-tip="受到捐赠人时间或用途限制的捐赠收入。" data-debit="减少" data-credit="增加">捐赠收入——限定性收入</span></span><span class="amount">解除限制金额</span></div>
        <div class="entry-row"><span class="dc credit">贷</span><span><span class="acct" tabindex="0" data-kind="收入类" data-word="捐赠收入——非限定性收入" data-tip="不存在外部时间或用途限制的捐赠收入。" data-debit="减少" data-credit="增加">捐赠收入——非限定性收入</span></span><span class="amount">同额</span></div>
      </div></div>`;
    s.insertAdjacentElement('afterend',x);
  }

})();
