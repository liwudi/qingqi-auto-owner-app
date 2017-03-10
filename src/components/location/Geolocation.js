/**
 * Created by admin on 2017/2/20.
 */
import Coord from './Coord';
import {fetchLocation, stopLocation} from './FetchLocation';

let coords = null, fetching;

function stopFetch() {
    fetching && stopLocation();
    fetching = false;
    console.info('geolocation--stop', coords)
}

if(!coords) {
    console.info('geolocation--init', coords)
    fetching = true;
    fetchLocation().then((_coords) => {
        let ll = Coord.wgs84togcj02(Math.abs(_coords.longitude),Math.abs(_coords.latitude));
        coords = {longitude: ll[0], latitude: ll[1]};
        console.info('geolocation--result', coords)
    }).finally(stopFetch);
    setTimeout(stopFetch, 60 * 1000);   //一分钟之后停止定位
}

export function geolocation () {
    return new Promise((resolve, reject) => {
        console.info('geolocation--geo', coords)
        coords ? resolve(coords) : reject()
    });
}