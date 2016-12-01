const SPEED_1 = 'SPEED_1';
const SPEED_2 = 'SPEED_2';
const SPEED_3 = 'SPEED_3';
const SPEED_4 = 'SPEED_4';
let getSpeedType = (speed) => {
    if (0 < speed && speed <= 10) {
        return SPEED_1;
    } else if (10 < speed && speed <= 20) {
        return SPEED_2;
    } else if (30 < speed && speed <= 40) {
        return SPEED_3;
    } else {
        return SPEED_4;
    }
};

let getSpeedColor = (speedType) => {
    switch (speedType) {
        case SPEED_1:
            return '#A2CD5A';
        case SPEED_2:
            return '#7EC0EE';
        case SPEED_3:
            return '#27408B';
        case SPEED_4:
            return '#FF0000';
    }
}

const get = (line) => {
    let lines = [], _tmp1 = null;
    line.map((_line, index) => {
        _tmp1 = _tmp1 || {
                locations: [],
                speedType: getSpeedType(_line.oil)
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
        if (index === line.length - 1 || _nextline.oil !== _tmp1.speedType) {
            lines.push(Object.assign({}, _tmp1));
            _tmp1 = null;
        }
    });
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
    get: get
}