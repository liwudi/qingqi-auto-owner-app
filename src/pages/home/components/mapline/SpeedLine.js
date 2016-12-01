const SPEED_1 = 'SPEED_1';
const SPEED_2 = 'SPEED_2';
const SPEED_3 = 'SPEED_3';
const SPEED_4 = 'SPEED_4';
const SPEED_5 = 'SPEED_5';
const SPEED_6 = 'SPEED_6';
let getSpeedType = (speed) => {
    if (0 < speed && speed <= 30) {
        return SPEED_1;
    } else if (30 < speed && speed <= 60) {
        return SPEED_2;
    } else if (60 < speed && speed <= 90) {
        return SPEED_3;
    } else if (90 < speed && speed <= 120) {
        return SPEED_4;
    } else {
        return SPEED_5;
    }
};

let getSpeedColor = (speedType) => {
    switch (speedType) {
        case SPEED_1:
            return '#FFA500';
        case SPEED_2:
            return '#A2CD5A';
        case SPEED_3:
            return '#7EC0EE';
        case SPEED_4:
            return '#27408B';
        case SPEED_5:
            return '#FF0000';
        case SPEED_6:
            return '#080808';
    }
};

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
    return {
        min: {longitude: minLng,
        latitude: minLat},
        max: {longitude: maxLng,
        latitude: maxLat}
    }
}
let startTime, endTime;

const times = () => {
    return {
        start : startTime,
        end:endTime
    }
}
const get = (line) => {
    let lines = [], _tmp1 = null;
    line.forEach((_line, index) => {
        setBounds(_line);
        _tmp1 = _tmp1 || {
                locations: [],
                speedType: getSpeedType(_line.speed)
            };
        if (_tmp1.locations.length === 0 && index > 0) {
            let _lastline = line[index - 1];
            _tmp1.locations.push({
                longitude: _lastline.longitude,
                latitude: _lastline.latitude
            });
        }
        _tmp1.locations.push({
            longitude: _line.longitude,
            latitude: _line.latitude
        });
        let _nextline = line[index + 1];
        if (index === line.length - 1 || _nextline.speed !== _tmp1.speedType) {
            lines.push(Object.assign({}, _tmp1));
            _tmp1 = null;
        }
    });
    console.info(lines)
    return lines.map((line, index) => {
        line.isClose = false;
        line.width = '12';
        line.strokeColor = getSpeedColor(line.speedType);
        line.outlineColor = '#ff8c2b';
        line.lineId = index;
        return line;
    });
}

export default {
    get: get,
    bounds: bounds,
    times: times
}