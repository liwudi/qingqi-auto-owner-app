/**
 * Created by admin on 2017/2/20.
 */
import Coord from './Coord';

let opts = {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000};
let coords = null;
function _geolocation () {
    console.info('_geolocation', coords)
    let promise = new Promise((resolve, reject) => {
        if(coords) resolve(coords);
        else {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    let _coords = position.coords;
                    let ll = Coord.wgs84togcj02(Math.abs(_coords.longitude),Math.abs(_coords.latitude));
                    coords = {
                        longitude: ll[0],
                        latitude: ll[1]
                    };
                    console.info('success-geolocation', coords)
                    resolve(coords);
                },
                (error) => {reject(error)},
                opts
            );
        }
    });
    return promise;
}
if(!coords) _geolocation();

export function geolocation () {
    console.info('geolocation', coords)
    return _geolocation();
}