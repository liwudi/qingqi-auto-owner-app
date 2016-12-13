const SPEED_1 = 'SPEED_1';
const SPEED_2 = 'SPEED_2';
const SPEED_3 = 'SPEED_3';
const SPEED_4 = 'SPEED_4';
const SPEED_5 = 'SPEED_5';
const SPEED_6 = 'SPEED_6';
let getSpeedType = (speed) => {
    if (0 <= speed && speed <= 10) {
        return SPEED_1;
    } else if (10 < speed && speed <= 20) {
        return SPEED_2;
    } else if (20 < speed && speed <= 30) {
        return SPEED_3;
    } else if (30 < speed && speed <= 40) {
        return SPEED_4;
    } else {
        return SPEED_5;
    }
};
let getSpeedColor = (speedType) => {
    console.info(speedType)
    switch (speedType) {
        case SPEED_1:
            return '#99CC59';
        case SPEED_2:
            return '#3EB6AD';
        case SPEED_3:
            return '#02B9F2';
        case SPEED_4:
            return '#FF8400';
        case SPEED_5:
            return '#FF1E1E';
    }
};
let maxLevel, minLevel;
const inLevelRange = function(pt, mapLevel) {
    if(mapLevel>=0 && mapLevel<=3 && pt.levelGroup==3) {
        maxLevel = 3;
        minLevel = 0;
        return true;
    } else if (mapLevel>=4 && mapLevel<=7 && pt.levelGroup>=2) {
        maxLevel =7;
        minLevel = 4;
        return true;
    } else if (mapLevel>=8 && mapLevel<=11 && pt.levelGroup>=1) {
        maxLevel = 11;
        minLevel = 8;
        return true;
    } else if (mapLevel>=12 && mapLevel<=18 && pt.levelGroup>=0) {
        maxLevel = 18;
        minLevel = 12;
        return true;
    } else{
        return false;
    }
};
const get = (line, mapLevel, paint) => {
    let lines = [], _tmp1 = null, type = 'oil';
        console.info('map level', mapLevel);
    if(! (mapLevel >= minLevel && mapLevel <= maxLevel) || paint) {
        let baseLocations = [],
            baseType = 'SPEED_1',
            pts = [];
        let baseLine = {
            locations: baseLocations,
            speedType: baseType
        }
        lines.push(baseLine);
        addBaseLine = (_line) => {
            baseLocations.push({latitude: _line.latitude, longitude: _line.longitude, levelGroup: _line.levelGroup});
        };
        line.map((_line) => {
            if (inLevelRange(_line, mapLevel)) {
                addBaseLine(_line);
                pts.push(Object.assign({}, _line));
            }
        });
        pts.map((_line, index) => {
            _tmp1 = _tmp1 || {
                    locations: [],
                    speedType: getSpeedType(_line[type])
                };
            if (_tmp1.locations.length === 0 && index > 0) {
                _tmp1.locations.push({latitude: pts[index - 1].latitude, longitude: pts[index - 1].longitude});
            }
            _tmp1.locations.push({latitude: _line.latitude, longitude: _line.longitude});

            if (index === pts.length - 1 || getSpeedType(pts[index + 1][type]) !== _tmp1.speedType) {
                lines.push(Object.assign({}, _tmp1));
                _tmp1 = null;
            }
        });

        console.info(lines.length)
        console.info('levelGroup')
        console.info('baseLocations', baseLocations.length)
    }



    console.info('lines', lines.length)
    return lines.map((line, index) => {
        line.isClose = false;
        line.lineId = index;
        line.strokeColor = getSpeedColor(line.speedType);
        line.width = index ? '8' : '12';
        line.outlineColor = index ? line.strokeColor : '#666666';
        return line;
    });
};
/*const get = (line, mapLevel, paint) => {
    let lines = [], _tmp1 = null, type = 'oil';
    console.info('map level', mapLevel);
    if(! (mapLevel >= minLevel && mapLevel <= maxLevel) || paint) {
        let baseLocations = [],
            baseType = 'SPEED_1',
            speedType;
        let baseLine = {
            locations: baseLocations,
            speedType: baseType
        }
        lines.push(baseLine);

        addBaseLine = (_line) => {
            baseLocations.push({latitude: _line.latitude, longitude: _line.longitude, levelGroup: _line.levelGroup});
        }

        addTmpLine = (_line, index) => {
            _tmp1 = _tmp1 || {
                    locations: [],
                    speedType: speedType
                };
            if (_tmp1.locations.length === 0 && index > 0) {
                _tmp1.locations.push({
                    latitude: line[index - 1].latitude,
                    longitude: line[index - 1].longitude
                });
            }
            _tmp1.locations.push({latitude: _line.latitude, longitude: _line.longitude});
            if (index === line.length - 1 || getSpeedType(line[index + 1][type]) !== _tmp1.speedType) {
                lines.push(Object.assign({}, _tmp1));
                _tmp1 = null;
            }
        }


        line.map((_line, index) => {
            speedType = getSpeedType(_line[type]);
            if (inLevelRange(_line, mapLevel)) {
                addBaseLine(_line);
                //console.info(_line.levelGroup, _line[type], baseType, speedType, index);
                if (speedType != baseType) {
                    addTmpLine(_line, index);
                }
            } else {
                if(index === 0 || index === line.length - 1) {
                    addBaseLine(_line);
                    if(index === line.length - 1) {
                        _tmp1 = _tmp1 || {
                                locations: [{
                                    latitude: line[index - 1].latitude,
                                    longitude: line[index - 1].longitude
                                }],
                                speedType: speedType
                            };
                    }

                    addTmpLine(_line, index);
                }
            }
        });
        console.info(lines.length)
        console.info('levelGroup', baseLocations[0].levelGroup)
        console.info('baseLocations', baseLocations.length)
    }



    console.info('lines', lines.length)
    return lines.map((line, index) => {
        line.isClose = false;
        line.lineId = index;
        line.strokeColor = getSpeedColor(line.speedType);
        line.width = index ? '8' : '12';
        line.outlineColor = index ? line.strokeColor : '#666666';
        return line;
    });
}*/

export default {
    get: get
}