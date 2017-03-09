/**
 * Created by admin on 2017/2/20.
 */
import Coord from './Coord';

let opts = {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000};


export function geolocation () {
    let promise = new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let coords = position.coords;
                let ll = Coord.wgs84togcj02(Math.abs(coords.longitude),Math.abs(coords.latitude));
                //ll = '114.55321,38.06642'.split(',');
                resolve({
                    longitude: ll[0],
                    latitude: ll[1]
                });
            },
            (error) => {reject(error)},
            opts
        );
    });
    return promise;
}