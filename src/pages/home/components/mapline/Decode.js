/**
 * Created by cryst on 2016/11/29.
 */
import {MPoint} from '../../../../mapbarmap/MapbarMapInstance';

function _decodeNumberEx(line) {
    var _EP_KEY = 6;
    var i = 0;
    var rets = [];
    var strLen = line.length;
    if (strLen <= 0) return rets;
    while (i < strLen) {
        var b = 0;
        var shift = 0;
        var result = 0;
        var currkey = _EP_KEY;
        do {
            b = (line.charCodeAt(i++)) - 63;
            var currValue = (((b >> 1) ^ (currkey++)) & 0x1f);
            result |= currValue << shift;
            shift += 5;
        } while ((b & 0x1) == 0);
        result = ((result & 0x01) == 0x01) ? ~(result >> 1) : (result >> 1);
        rets.push(result);
    }
    return rets;
}

function decode(encoded) {
    return _decodeNumberEx(encoded);
}

function decodeTimes(times,  firstTime) {
    times = _decodeNumberEx(times);
    times[0] = firstTime;
    return times;
}
function decodeLevels(encoded) {
    var result = [];
    if (typeof encoded == "string" && encoded && encoded.indexOf(",") != -1) {
        var levelstr = encoded.split(",");
        //item[0]- level3
        //item[1]- level2
        //item[2]- level1
        for (var i = 0; i < levelstr.length; i++) {
            var items = _decodeNumberEx(levelstr[i]);
            var x = 0;
            for (var j = 0; j < items.length; j ++) {
                x += items[j];
                result[x] = i + 1;
            }
        }
    }
    return result;
}
let minLng = minLat = maxLng = maxLat = 0;
const setBounds = (pt) => {
    if(!minLng) minLng = maxLng = pt.longitude;
    if(!minLat) minLat = maxLat = pt.latitude;
    minLng = Math.min(minLng,pt.longitude);
    minLat = Math.min(minLat, pt.latitude);
    maxLng = Math.max(maxLng, pt.longitude);
    maxLat = Math.max(maxLat, pt.latitude);
};
const bounds = () => {
    let bd = {
        min: {longitude: minLng,
            latitude: minLat},
        max: {longitude: maxLng,
            latitude: maxLat}
    };
    minLng = minLat = maxLng = maxLat = 0;
    return bd;
}
function decodeData(data) {
    let result = [],
        lons = data.lons,
        lats = data.lats,
        levels = data.levels,
        times = data.times,
        speeds = data.speeds,
        oils = data.instantOils,
        directions = data.directions,
        length = lons.length;
 /*   console.info(oils)
    console.info(times)*/
    let lat = 0, lon = 0, level = 0, speed = 0, time = 0, oil = 0, direction = 0, pt, timeDiff = 0;
    for(let i = 0; i < length; i ++) {
        level = levels[i] || 0;
        lat += lats[i] * 0.00001;
        lon += lons[i] * 0.00001;
        timeDiff = i ? +times[i] : 0;
        time += +times[i];
        speed += speeds[i];
        direction += directions[i];
        oil += oils[i];
/*        if(i < 100) {
            console.info('oil:', oils[i], oil, 'time:', times[i], new Date(time))
        }*/
        pt = Object.assign(MPoint([lon, lat]), {
            time: time,
            timeDiff: timeDiff,
            speed: speed,
            direction: 360 - direction,
            oil: oil,
            levelGroup : level
        });
        setBounds(pt);
        result.push(pt);
    }
    return result;
}

function setData(data) {
    let firstTime = data.firstTime;
    delete data.firstTime;
    for(let k in data) {
        let v = data[k];
        if(k == 'levels') {
            data[k] = decodeLevels(v);
            continue;
        }
        if(k === 'times') {
            data[k] = decodeTimes(v, firstTime);
            continue;
        }
        data[k] = decode(v);
    }
    return decodeData(data);

}
export default {
    setData: setData,
    bounds: bounds
}