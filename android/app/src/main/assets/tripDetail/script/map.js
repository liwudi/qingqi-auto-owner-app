!function(){function o(o){var n=6,r=0,e=[],t=o.length;if(t<=0)return e;for(;r<t;){var l=0,i=0,s=0,u=n;do{l=o.charCodeAt(r++)-63;var a=31&(l>>1^u++);s|=a<<i,i+=5}while(0==(1&l));s=1==(1&s)?~(s>>1):s>>1,e.push(s)}return e}function n(n,r){var e=[],t=[],l=o(n);r=r.split(",");var i=+r[0],s=+r[1];t.push(i),e.push(s);for(var u=0;u<l.length;u+=2)i+=+l[u],s+=+l[u+1],t.push(i),e.push(s);return{times:e,speeds:t}}function r(o){var n={};return n.color=o,n}function e(o){var n=null;return u.some(function(r){if(o<=r.key)return n=r.color,!0}),n||(n=u[u.length-1].color),n}function t(o){var e=n(o.spt,o.firstSpt);mpts=MMap.decodeLine(o.points,o.levels),a=e.speeds,c=e.times;var t=new MPolyline(mpts,r(u[0].color)),i=s.overlaysBounds([t]);s.setViewport(i),l()}function l(){var o,n=[],t=(u[0].key,[]);mpts.forEach(function(l,i){var s=a[i];o=mpts[i+1],o=o&&new MPoint(o.lng,o.lat);var u=e(s),c=e(a[i+1]);n.push(l),n.color=u,o?c!=u&&(n.push(o),t.push(new MPolyline(n,r(n.color))),n=[o]):t.push(new MPolyline(n,r(n.color)))}),t.forEach(function(o){s.addOverlay(o)})}function i(){MEvent.ready(function(){s=new MMap("mapDiv",{center:new MPoint(116.3997,39.9158),standardControl:!1,zoom:10}),console.log(s)})}var s,u=[{key:20,color:"#ff0000"},{key:35,color:"#00ff00"},{key:50,color:"#0000ff"},{key:"over",color:"#000000"}],a=[],c=[];return window.mpts=[],ColorLine={detailShow:t,initMap:i},ColorLine}();