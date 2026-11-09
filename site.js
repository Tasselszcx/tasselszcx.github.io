const papers = [
  {id:'2610.35215', title:'SkillLifeBench: Benchmarking Security Across the Lifecycle of Agent Skills', authors:['Chenxu Zhang','Zhou Liu','Wu Xin','Wentao Zhang'], badge:'Preprint · 2026', image:'life.png', dimensions:[2032,1368], alt:'SkillLifeBench overview: paired runtime and lifecycle evaluation', description:'Evaluating whether agent skills remain secure as implementations, interfaces, runtime state, compositions, and versions change.', code:'https://github.com/Tasselszcx/SkillLifeBench', key:'zhang2026skilllifebench'},
  {id:'2610.13755', title:'Matched-Context Group Policy Optimization for LLM Agent Training', authors:['Chenxu Zhang','Yaorui Shi','Wenlong Zhang','Jianchao Tan','Zihan Wang','Yiming Cheng'], badge:'Preprint · 2026', image:'mcgpo.png', dimensions:[2047,974], alt:'MCGPO framework for context matching, verification, and policy optimization', description:'Constructing evidence-weighted local action preferences from matched contexts to train long-horizon language model agents.', key:'zhang2026mcgpo'},
  {id:'2608.10775', title:'SkillLens: Visual Skill Cards for Retrieval-Augmented GUI Action Prediction and On-Policy Distillation', authors:['Zhou Liu*','Chenxu Zhang*','Ligang Huang','Zeli Su','Zewei Pan','Changhang Tian','Zhaoyang Han','Xing Chen','Yuanfeng Song','Wentao Zhang'], badge:'Preprint · 2026', image:'skilllens-overview.png', dimensions:[2030,1156], alt:'Original SkillLens overview: visual skill card construction, runtime retrieval, and CardDistill on-policy distillation', description:'Turning interaction experience into visual skill cards for GUI action prediction and training students that run without retrieval.', key:'liu2026skilllens'},
  {id:'2605.30058', title:'HEART-Bench: Do LLMs Make Persona-Consistent Decisions?', authors:['Weihan Peng*','Chenxu Zhang*','Qianao Wang','Yuling Shi','Heng Lian','Qihong Mao','Jiahao Pang','Chunliang Feng','Bowen Li','Xiaodong Gu'], badge:'Preprint · 2026', image:'heart-overview.png', dimensions:[2020,969], alt:'Original HEART-Bench overview: character and scenario construction, expert validation, and evaluation instance generation', description:'A benchmark for memory-grounded persona-consistent decisions, using psychologically grounded characters and expert-reviewed scenarios.', code:'https://github.com/peng-weihan/HEART-BENCH', key:'peng2026heartbench'},
];
const escapeHTML = text => text.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
document.querySelector('#papers').innerHTML = papers.map(p=>{
  const bib=`@article{${p.key},\n  title={${p.title}},\n  author={${p.authors.map(a=>a.replace('*','')).join(' and ')}},\n  journal={arXiv preprint arXiv:${p.id}},\n  year={2026},\n  url={https://arxiv.org/abs/${p.id}}\n}`;
  return `<article class="paper"><div class="paper-image"><span class="badge${p.accepted?' accepted':''}">${p.badge}</span><button class="overview-button" type="button" data-overview="${p.id}" aria-label="Enlarge overview: ${escapeHTML(p.title)}"><img src="assets/${p.image}" alt="${escapeHTML(p.alt)}" loading="lazy" width="${p.dimensions[0]}" height="${p.dimensions[1]}"></button><span class="zoom-hint">Click to enlarge</span></div><div class="paper-content"><h3 class="paper-title"><a href="https://arxiv.org/abs/${p.id}">${escapeHTML(p.title)}</a></h3><p class="authors">${p.authors.map(a=>a.includes('Chenxu Zhang')?`<strong>${escapeHTML(a)}</strong>`:escapeHTML(a)).join(', ')}</p><p class="paper-desc">${escapeHTML(p.description)}</p><div class="paper-links"><a href="https://arxiv.org/abs/${p.id}">Paper ↗</a><a href="https://arxiv.org/pdf/${p.id}">PDF</a>${p.code?`<a href="${p.code}">Code ↗</a>`:''}<button class="bib-button" data-paper="${p.id}" type="button">Copy BibTeX</button><span class="bib-status" id="status-${p.id}" role="status"></span></div><details class="bib-details"><summary>Show citation</summary><pre id="bib-${p.id}">${escapeHTML(bib)}</pre></details></div></article>`;
}).join('');
document.querySelectorAll('.bib-button').forEach(button=>button.addEventListener('click',async()=>{
 const status=document.getElementById(`status-${button.dataset.paper}`);
 try {await navigator.clipboard.writeText(document.getElementById(`bib-${button.dataset.paper}`).textContent);status.textContent='Copied';setTimeout(()=>status.textContent='',2500);}
 catch {document.getElementById(`bib-${button.dataset.paper}`).parentElement.open=true;status.textContent='Select the citation below to copy.';}
}));
const links=[...document.querySelectorAll('.nav-links a')];
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){links.forEach(a=>{const active=a.hash===`#${entry.target.id}`;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}}),{rootMargin:'-15% 0px -65% 0px'});document.querySelectorAll('main section').forEach(s=>observer.observe(s));}

const overviewDialog = document.createElement('dialog');
overviewDialog.className = 'overview-dialog';
overviewDialog.setAttribute('aria-labelledby', 'overview-title');
overviewDialog.innerHTML = '<div class="dialog-header"><h2 id="overview-title"></h2><button class="dialog-close" type="button" aria-label="Close overview">Close ×</button></div><img class="dialog-image" alt="">';
document.body.append(overviewDialog);
document.querySelectorAll('.overview-button').forEach(button => button.addEventListener('click', () => {
  const paper = papers.find(p => p.id === button.dataset.overview);
  overviewDialog.querySelector('h2').textContent = paper.title;
  const fullImage = overviewDialog.querySelector('img');
  fullImage.src = `assets/${paper.image}`;
  fullImage.alt = paper.alt;
  overviewDialog.showModal();
}));
overviewDialog.querySelector('.dialog-close').addEventListener('click', () => overviewDialog.close());
overviewDialog.addEventListener('click', event => {
  if (event.target === overviewDialog) overviewDialog.close();
});
