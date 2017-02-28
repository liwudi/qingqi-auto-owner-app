/**
 * Created by linyao on 2016/10/18.
 */

const userId = '1';
import Server from '../service-config/ServerConfig';
import RequestService from '../service-config/RequestService';


//月行程数据查询接口
export function getInverseGeocoding(lon,lat){
    return RequestService.get(
        'http://wedrive.mapbar.com/opentsp/gis/api/inverse',
        {
            lat:lat,
            lon: lon,
            ak: Server.AK,
            inGb: '02',
            outGb: '02',
            zoom: 11,
            resType: 'json'
        },
        (data) => {
            return data;
        }
    );
}