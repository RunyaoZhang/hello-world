(function(){
 const ch=Number(document.body.dataset.chapter||0);if(![21,22,23,24,25].includes(ch))return;
 localStorage.setItem('acct_last_chapter',String(ch));localStorage.setItem('acct_last_chapter_at',String(Date.now()));
 const top=document.querySelector('.topbar');
 if(top&&!top.querySelector('a[href*="glossary"]')){const a=document.createElement('a');a.href='../glossary.html';a.textContent='术语库';top.insertBefore(a,top.lastElementChild)}
 const rel={
 21:[['第20章 · 持有待售与丧失控制','../chapter20/learn.html','先看出售子公司时为什么“是否丧失控制”会改变持有待售处理，再回来理解合并范围。'],['全站术语库','../glossary.html','搜索控制、商誉、少数股东权益、抵销分录等跨章概念。']],
 22:[['第23章 · 资产负债表日后事项','../chapter23/learn.html','前期差错与日后调整经常一起考：关键都是“信息究竟属于哪个期间”。'],['全站术语库','../glossary.html','对照追溯调整、未来适用、追溯重述等容易混淆的术语。']],
 23:[['第22章 · 政策、估计与差错','../chapter22/learn.html','如果日后期间发现的是以前就做错了，先回到前期差错的处理逻辑。'],['全站术语库','../glossary.html','搜索调整事项、非调整事项、以前年度损益调整等术语。']],
 24:[['第25章 · 民间非营利组织会计','../chapter25/learn.html','两章都不能直接套普通企业“股东利润”思路，适合对照资金来源、用途和净资产。'],['全站术语库','../glossary.html','搜索预算会计、资金结存、净资产等概念。']],
 25:[['第24章 · 政府会计','../chapter24/learn.html','对照政府会计的预算/财务双体系，更容易理解特殊主体为什么有不同的净资产和收入分类。'],['全站术语库','../glossary.html','搜索限定性净资产、受托代理、预算收入等跨章术语。']]
 };
 const root=document.querySelector('.study-content');if(!root)return;
 const sec=document.createElement('section');sec.className='related-study';sec.innerHTML='<div class="kicker">继续串起来学</div><h2>和本章最相关的内容</h2><div class="related-grid"></div>';
 const grid=sec.querySelector('.related-grid');rel[ch].forEach(([title,href,desc])=>{const a=document.createElement('a');a.href=href;a.innerHTML=`<b>${title}</b><span>${desc}</span>`;grid.append(a)});
 const footer=root.querySelector('.footer');footer?footer.before(sec):root.append(sec);
 const style=document.createElement('style');style.textContent='.related-study{background:#fffdf9;border:1px solid #e2d9cd;border-radius:22px;padding:22px 24px;margin:18px 0;box-shadow:0 12px 34px rgba(58,47,35,.05)}.related-study h2{font-size:24px;margin:0 0 11px}.related-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.related-grid a{display:block;text-decoration:none;border:1px solid #e4dbcf;background:#fff;border-radius:14px;padding:13px 14px}.related-grid a:hover{border-color:#b9aa98}.related-grid b{display:block;margin-bottom:4px}.related-grid span{display:block;color:#6f6961;font-size:13px;line-height:1.55}@media(max-width:650px){.related-study{padding:18px 16px}.related-grid{grid-template-columns:1fr}}';document.head.append(style);
})();