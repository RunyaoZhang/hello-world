(function(){
  if(Number(document.body.dataset.chapter||0)!==22) return;
  if(document.querySelector('.audit22-core')) return;
  const anchor=document.querySelector('#why');
  if(!anchor) return;
  const s=document.createElement('section');
  s.className='audit22-core';
  s.innerHTML=`
    <div class="kicker">PDF 完整性补漏</div>
    <h2>先按“规则 / 估计 / 差错”判断，再决定追溯还是未来适用</h2>
    <div class="map2-grid">
      <div class="map2-step"><b>政策变更的追溯终点</b><span>比较期间以前的累积影响，调比较财务报表最早期间的期初留存收益；利润表只重述可比期间本身，不把更早年度硬塞进当期损益。</span></div>
      <div class="map2-step"><b>弃置义务例题的完整链</b><span>先把弃置费用现值计入固定资产和预计负债；以后每年同时确认折旧与预计负债的利息费用。追溯时把以前年度累计折旧、累计利息一起落到期初留存收益，并按课件要求同步调整盈余公积。</span></div>
      <div class="map2-step"><b>估计变更不翻旧账</b><span>固定资产剩余寿命、净残值、折旧方法等改变，从变更日起按新估计计算。以前年度折旧不重算、不计算累积影响数；如影响重大，要披露对当期或未来期间的影响。</span></div>
      <div class="map2-step"><b>最关键的区分标准</b><span>看会计确认、计量基础和列报项目有没有变：存货计价方法、投资性房地产后续计量模式改变属于政策；使用寿命、净残值、折旧方法、履约进度、预期信用损失、可变现净值等属于估计。</span></div>
      <div class="map2-step"><b>“业务变了”不等于政策变更</b><span>因出售部分股权而从成本法改权益法，是交易事实发生本质变化后采用适用的新政策，不属于会计政策变更；编制合并报表时统一子公司会计政策，也不是估计变更。</span></div>
      <div class="map2-step"><b>重要前期差错</b><span>用追溯重述法：通过“以前年度损益调整”更正，再转入未分配利润，并按利润变化调整盈余公积；比较报表相关项目也要重述。需要披露每股收益的企业还应同步调整基本和稀释每股收益。</span></div>
      <div class="map2-step"><b>研发差错的边界</b><span>研究阶段已经费用化的支出，不能在以后达到资本化条件时再塞回无形资产成本。若前期误资本化，应冲减无形资产，并转回对应摊销，再通过以前年度损益调整处理留存收益。</span></div>
      <div class="map2-step"><b>差错更正也要处理所得税</b><span>前期少提折旧、存货减值算错、使用寿命不确定的无形资产误摊销等，除了改损益和资产负债，还要按税法口径调整应交所得税或递延所得税，再结转以前年度损益调整。</span></div>
    </div>
    <div class="entry"><div class="entry-head">弃置义务追溯：以后年度利息费用</div><div class="entry-grid">
      <div class="entry-row"><span class="dc debit">借</span><span><span class="acct" tabindex="0" data-kind="费用 / 损失 / 支出类" data-word="财务费用" data-tip="筹资及相关资金占用成本。" data-debit="增加" data-credit="减少或结转">财务费用</span></span><span class="amount">按实际利率计息</span></div>
      <div class="entry-row"><span class="dc credit">贷</span><span><span class="acct" tabindex="0" data-kind="负债类" data-word="预计负债" data-tip="过去事项形成、未来需要交付资源或履行义务的现时义务。" data-debit="减少" data-credit="增加">预计负债</span></span><span class="amount">同额</span></div>
    </div></div>
    <div class="entry"><div class="entry-head">弃置义务追溯：以后年度折旧</div><div class="entry-grid">
      <div class="entry-row"><span class="dc debit">借</span><span><span class="acct" tabindex="0" data-kind="费用 / 损失 / 支出类" data-word="主营业务成本" data-tip="与主营业务收入相配比的成本。" data-debit="增加" data-credit="减少或结转">主营业务成本</span></span><span class="amount">按年计提</span></div>
      <div class="entry-row"><span class="dc credit">贷</span><span><span class="acct" tabindex="0" data-kind="资产类备抵科目" data-word="累计折旧" data-tip="固定资产成本的累计转销。" data-debit="减少备抵＝资产净额增加" data-credit="增加备抵＝资产净额减少">累计折旧</span></span><span class="amount">同额</span></div>
    </div></div>
    <div class="entry"><div class="entry-head">前期差错：使用寿命不确定的无形资产误摊销</div><div class="entry-grid">
      <div class="entry-row"><span class="dc debit">借</span><span><span class="acct" tabindex="0" data-kind="资产类备抵科目" data-word="累计摊销" data-tip="无形资产的累计摊销备抵。" data-debit="减少备抵＝资产净额增加" data-credit="增加备抵＝资产净额减少">累计摊销</span></span><span class="amount">120</span></div>
      <div class="entry-row"><span class="dc credit">贷</span><span><span class="acct" tabindex="0" data-kind="损益调整类" data-word="以前年度损益调整——管理费用" data-tip="更正以前年度损益的过渡科目。" data-debit="减少以前年度利润" data-credit="增加以前年度利润">以前年度损益调整——管理费用</span></span><span class="amount">120</span></div>
      <div class="entry-row"><span class="dc debit">借</span><span><span class="acct" tabindex="0" data-kind="损益调整类" data-word="以前年度损益调整——所得税费用" data-tip="更正以前年度所得税费用的过渡科目。" data-debit="减少以前年度利润" data-credit="增加以前年度利润">以前年度损益调整——所得税费用</span></span><span class="amount">30</span></div>
      <div class="entry-row"><span class="dc credit">贷</span><span><span class="acct" tabindex="0" data-kind="负债类" data-word="递延所得税负债" data-tip="应纳税暂时性差异形成的未来所得税负债。" data-debit="减少" data-credit="增加">递延所得税负债</span></span><span class="amount">30</span></div>
    </div></div>`;
  anchor.insertAdjacentElement('afterend',s);
})();
