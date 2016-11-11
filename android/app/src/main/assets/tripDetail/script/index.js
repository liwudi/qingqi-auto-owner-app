/*var div;
function  myConsole(html) {
    if(!div) {
        div = document.createElement('div');
        div.style.cssText = 'top:0;left:0;background:#f00;color:#fff;position:absolute;width:320px;height:100px;z-index:100;';
        document.body.appendChild(div);
    }
    div.innerHTML = html;
}
*/
var map = null;

function initMap() {
	opts = {lng:116.39748 ,lat:39.90881,zoom:12};
	//myConsole(JSON.stringify(opts));
	map = new MMap(MElement.$('mapDiv'), {
		center: new MPoint(+opts.lng, +opts.lat),
		zoom: +opts.zoom,
		disableDoubleClickZoom: false,
		standardControl: false,
		enabledHighResolution: true	//true启用高分图
	});
	//map.enableTraffic();
	resize();
}
function resize () {
	map.resize(new MSize(window.innerWidth, window.innerHeight));
}
/*window.addEventListener('load', initMap, false);*/
window.addEventListener('resize', resize, false);
MEvent.ready(initMap);