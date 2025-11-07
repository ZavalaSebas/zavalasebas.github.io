// Pentatonic: keep existing behavior; only add minimal tabbar indicator logic.
document.addEventListener('DOMContentLoaded', ()=>{
	const tabs=document.querySelectorAll('.pentatonic-tabbar .tabbar-item');
	const indicator=document.querySelector('.pentatonic-tabbar .tabbar-indicator');
	if(!tabs.length||!indicator) return;
	const currentFile=location.pathname.split('/').pop().toLowerCase();
	tabs.forEach(tab=>{ const href=tab.getAttribute('href'); if(!href) return; const file=href.split('/').pop().toLowerCase(); if(file===currentFile) tab.classList.add('active'); });
	requestAnimationFrame(()=>moveIndicator());
		function moveIndicator(target){
			const active=target||document.querySelector('.pentatonic-tabbar .tabbar-item.active')||tabs[0];
			if(!active) return;
			const parent=active.parentElement;
			const width=active.offsetWidth*0.55;
			const x=active.offsetLeft + (active.offsetWidth - width)/2;
			indicator.style.width=width+'px';
			indicator.style.transform=`translateX(${x}px)`;
		}
	tabs.forEach(t=>t.addEventListener('click', e=>moveIndicator(e.currentTarget)));
		window.addEventListener('resize', ()=>moveIndicator());
});
