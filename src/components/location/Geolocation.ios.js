/**
 * Created by admin on 2017/2/20.
 */
import Coord from './Coord';

let opts = {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000};
let coords = null;
function _geolocation () {
    let promise = new Promise((resolve, reject) => {
        console.info('geolocation--android-geo', coords)
        if(coords) resolve(coords);
        else {
            console.info('noLocation-android-geo')
            reject();
        }
    });
    return promise;
}

if(!coords) {
    navigator.geolocation.getCurrentPosition((position) => {
            let _coords = position.coords;
            let ll = Coord.wgs84togcj02(Math.abs(_coords.longitude),Math.abs(_coords.latitude));
            coords = {
                longitude: ll[0],
                latitude: ll[1]
            };
            console.info('success-geolocation', coords)
        },
        () => {},
        opts
    );
};

export function geolocation () {
    console.info('geolocation', coords)
    return _geolocation();
}