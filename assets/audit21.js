(function(){
  if(Number(document.body.dataset.chapter||0)!==21) return;
  if(document.querySelector('.audit21-core')) return;
  const anchor=document.querySelector('.chapter-map2')||document.querySelector('.decision-lab')||document.querySelector('#why');
  if(!anchor) return;
  const s=document.createElement('section');
  s.className='audit21-core';
  s.innerHTML=`
    <div class="kicker">合并抵销 · 最小规则集</div>
    <h2>集团不是在“改个表”，而是在删掉自己和自己做的生意</h2>
    <p>先把母子公司看成一个人：自己不能欠自己，自己卖给自己不能先赚利润。下面只保留课件里最容易漏、又会直接影响做题的规则。</p>
    <div class="map2-grid">
      <div class="map2-step"><b>内部债权债务</b><span>期末债权债务按期末余额直接抵销；内部应收款已经计提的坏账准备也要抵。连续年度先把上期影响转到“未分配利润—年初”，本期坏账准备增加再抵信用减值损失，减少则反向处理。债权投资与应付债券抵销出现差额，进合并利润表的投资收益或财务费用。</span></div>
      <div class="map2-step"><b>内部存货</b><span>先抵内部营业收入/营业成本，再把期末仍留在集团内部的未实现毛利从存货里拿掉。以后真正卖给集团外部，原来未实现的利润才算实现；连续年度先处理期初未实现损益，再处理本期交易。</span></div>
      <div class="map2-step"><b>内部固定资产 / 无形资产</b><span>内部交易形成的虚增原价先抵掉；以后每期因虚增原价多提的折旧或摊销也要抵。集团视角的资产价值始终按集团真正付给外部的成本继续消耗，清理时也沿着这条逻辑收尾。</span></div>
      <div class="map2-step"><b>所得税跟着“暂时差异”走</b><span>内部未实现利润被抵掉后，合并口径账面价值与计税基础可能不同，因此确认递延所得税资产；以后内部利润逐步实现、差异转回时，递延所得税也跟着转回。</span></div>
      <div class="map2-step"><b>顺流 vs 逆流</b><span>未实现内部交易损益调整的是出售方净利润。母公司卖给子公司（顺流），抵销影响归属于母公司所有者的净利润；子公司卖给母公司（逆流），要按持股比例在母公司所有者和少数股东之间分摊，因而会影响少数股东损益和少数股东权益。子公司之间交易按出售方子公司的持股结构判断。</span></div>
      <div class="map2-step"><b>少数股东权益可以是负数</b><span>少数股东权益是合并报表项目，不要求永远为正；少数股东损益同样只存在于合并报表。逆流交易的未实现损益（扣除所得税影响后）还要按少数股东比例调整这两个项目。</span></div>
      <div class="map2-step"><b>子公司持有母公司股份</b><span>从集团视角看，相当于集团持有自己的股份。子公司资产负债表里的长期股权投资，在合并资产负债表中应按取得成本转列为库存股，作为所有者权益的减项。</span></div>
      <div class="map2-step"><b>内部现金流也不能留下</b><span>集团内部收付款在合并现金流量表中抵销，而且按实际现金金额抵：例如内部销售已收款时，增值税也属于集团内部现金流，按含税额抵销。子公司少数股东以现金增资，则是集团从外部少数股东收到资金，列筹资活动现金流。</span></div>
    </div>`;
  anchor.insertAdjacentElement('afterend',s);

  // audit21-principle-gap: small but testable rules from the early PDF table pages.
  {
    const x=document.createElement('section'); x.className='audit21-principle-gap';
    x.innerHTML=`
      <div class="kicker">逐页复核补齐 · 两个边界</div>
      <div class="map2-grid">
        <div class="map2-step"><b>同一控制为什么坚持账面价值</b><span>集团内部重组不视为一笔新的对外购买：合并方取得的资产、负债以被合并方在最终控制方合并财务报表中的账面价值为基础，不凭内部重组产生新的资产、负债或新的商誉；最终控制方以前对外收购形成的原有商誉则继续承接。</span></div>
        <div class="map2-step"><b>“视同期初就在一起”也有下限</b><span>同一控制下控股合并编合并报表时原则上把被合并方自合并当期期初起纳入；如果合并方的设立日晚于被合并方，则追溯起点是合并方成立日，不能追到合并方尚不存在的时期。</span></div>
      </div>`;
    s.insertAdjacentElement('afterend',x);
  }

})();
