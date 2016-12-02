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
        console.info(_line)

        _tmp1 = _tmp1 || {
                locations: [],
                speedType: getSpeedType(_line.oil)
            };
        if (_tmp1.locations.length === 0 && index > 0) {
            _tmp1.locations.push({latitude: line[index - 1].latitude, longitude: line[index - 1].longitude});
        }
        _tmp1.locations.push({latitude: _line.latitude, longitude: _line.longitude});

        if (index === line.length - 1 || getSpeedType(line[index + 1].oil) !== _tmp1.speedType) {
            lines.push(Object.assign({}, _tmp1));
            _tmp1 = null;
        }

    });
    console.info(lines)
    return lines.map((line, index) => {
        line.isClose = false;
        line.width = '10';
        line.strokeColor = line.strokeColor = getSpeedColor(line.speedType);
        //line.outlineColor = '#ff8c2b';
        line.lineId = index;
        return line;
    });
}

export default {
    get: get
}