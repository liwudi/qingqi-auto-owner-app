package com.mapbar.react.map.operation;

import android.content.Context;
import android.location.Address;
import android.location.LocationListener;
import android.os.Bundle;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;
import com.mapbar.react.LogUtils;
import com.mapbar.android.location.AsyncGeocoder;
import com.mapbar.android.location.LocationClient;
import com.mapbar.android.location.LocationClientOption;

import java.util.List;
import java.util.Locale;

/**
 * Created by Administrator on 2016/11/2.
 */

public class Location {
    private static String TAG = "Location";
    private static Context context;
    private static Promise promise;
    private static LocationClient mLocationClient;
    private static final long gpsExpire = 1500;// gps失效时间 毫秒
    private static final int resultType = 0;
    private static int count = 0;// 定位次数
    private static int priority = LocationClientOption.LocationMode.GPS_FIRST;

    /**
     * 初始化定位
     */
    private static void initLocation() {
        try {
            if (mLocationClient == null) {
                MyLocationListen myLocationListen = new MyLocationListen();
                mLocationClient = new LocationClient(context);
                LocationClientOption option = new LocationClientOption();
                option.setPriority(priority);
                option.setScanSpanGPS(15000);// 设置GPS定位最小间隔时间
                option.setGpsExpire(gpsExpire);// 设置GPS定位失效时间
                option.setScanSpanNetWork(15000);// 设置基站定位最小间隔时间
                option.setResultType(resultType);// 默认返回逆地理信息
                mLocationClient.setOption(option);
                mLocationClient.addListener(myLocationListen);
                LogUtils.logd(TAG, LogUtils.getThreadName() + "-------开始定位---");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    static class MyLocationListen implements LocationListener {

        @Override
        public void onLocationChanged(android.location.Location location) {
            if (location != null) {
                count++;
                LogUtils.logd(TAG, LogUtils.getThreadName() + "location:" + location);
                double latitude = location.getLatitude();
                double longitude = location.getLongitude();
                if (location.getExtras() != null) {
                    Bundle bundle = location.getExtras();
                    String address = bundle.getString("address");
                    String city = bundle.getString("city");
                    resolvePromise(latitude, longitude, address, city);
                } else {
                    getInverse(latitude, longitude);
                }
            } else {
                promise.reject("0", "定位失败");
            }
        }


        @Override
        public void onStatusChanged(String provider, int status, Bundle extras) {
            LogUtils.logd(TAG, LogUtils.getThreadName() + "status:" + status + "extras:" + extras);
        }

        @Override
        public void onProviderEnabled(String provider) {
            LogUtils.logd(TAG, LogUtils.getThreadName() + "provider:" + provider);
        }

        @Override
        public void onProviderDisabled(String provider) {
            LogUtils.logd(TAG, LogUtils.getThreadName() + "provider:" + provider);
        }
    }

    private static void resolvePromise(double latitude, double longitude, String address, String city) {
        WritableMap params = Arguments.createMap();
        params.putDouble("latitude", latitude);
        params.putDouble("longitude", longitude);
        params.putString("address", address);
        params.putString("city", city);
        LogUtils.logd(TAG, LogUtils.getThreadName() + "extras" + "params:" + params);
        promise.resolve(params);
        stopLocation();
    }

    /**
     * 逆地理 （新定位中带逆地理功能呢）
     *
     * @param dLat
     * @param dLon
     * @Enclosing_Method : getInverse
     * @Written by : maliwei
     * @Creation Date : 2014-8-18 下午02:37:07
     * @version : v1.00
     * @Description :
     */
    private static void getInverse(double dLat, double dLon) {
        try {
            AsyncGeocoder gc = new AsyncGeocoder(context, Locale.getDefault());
            gc.setResultListener(new AsyncGeocoder.ResultListener() {
                @Override
                public void onResult(Object obj, List<Address> lstAddress) {

                    int flag = Integer.parseInt(String.valueOf(obj));
                    // 判断地址是否为多行
                    if (lstAddress.size() > 0 && count == flag) {
                        double latitude = 0;
                        double longitude = 0;
                        StringBuilder sbGeo = new StringBuilder();
                        String city = "";
                        for (int i = 0; i < lstAddress.size(); i++) {
                            Address adsLocation = lstAddress.get(i);
                            for (int j = 0; j <= adsLocation.getMaxAddressLineIndex(); j++) {
                                sbGeo.append(adsLocation.getAddressLine(j));
                            }
//                                sbGeo.append("FeatureName:" + adsLocation.getFeatureName()).append("\n");
//                                sbGeo.append("AdminArea:" + adsLocation.getAdminArea()).append("\n");
//                                sbGeo.append("Phone:" + adsLocation.getPhone()).append("\n");
//                                sbGeo.append("Thoroughfare:" + adsLocation.getThoroughfare()).append("\n");
//                                sbGeo.append("Locality:" + adsLocation.getLocality()).append("\n");
//                                sbGeo.append("Country:" + adsLocation.getCountryName()).append("\n");
//                                sbGeo.append("CountryCode:" + adsLocation.getCountryCode()).append("\n");
//                                sbGeo.append("Latitude:" + adsLocation.getLatitude()).append("\n");
//                                sbGeo.append("Longitude:" + adsLocation.getLongitude()).append("\n");
                            latitude = adsLocation.getLatitude();
                            longitude = adsLocation.getLongitude();
                            city = adsLocation.getAdminArea();
                        }
                        WritableMap params = Arguments.createMap();
                        params.putDouble("latitude", latitude);
                        params.putDouble("longitude", longitude);
                        params.putString("address", sbGeo.toString());
                        params.putString("city", city);
                        LogUtils.logd(TAG, LogUtils.getThreadName() + "params:" + params);
                        stopLocation();
                        promise.resolve(params);
                    }
                }
            });
            gc.setFlagObject(count);
            gc.getFromLocation(dLat, dLon, 1);
        } catch (Exception ex) {
            ex.printStackTrace();
            promise.reject("0", "定位失败");
        }
    }

    public static void startLocation(Context conxt, Promise prom) {
        promise = prom;
        context = conxt;
        initLocation();
        if (mLocationClient != null) {
            mLocationClient.start();
        }
    }

    public static void stopLocation() {
        if (mLocationClient != null) {
            mLocationClient.stop();
        }
    }


    public static void onStartLocation() {
        LogUtils.logd("MapSDK", "---------回到前台-------");
        if (mLocationClient != null) {
            mLocationClient.onForeground();
        }
    }

    public static void onStopLocation() {
        LogUtils.logd("MapSDK", "---------切到后台-------");
        if (mLocationClient != null) {
            mLocationClient.onBackground();
        }
    }


    public static void onDestroyLocation() {
        if (mLocationClient != null) {
            mLocationClient.stop();
            mLocationClient.removeAllListener();
        }
    }
}
