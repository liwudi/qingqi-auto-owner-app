package com.mapbar.react.stat;

import android.content.Context;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.mapbar.android.statistics.api.MapbarMobStat;

import java.util.HashMap;

/**
 * Created by mike on 16/4/26.
 */
public class StatModule extends ReactContextBaseJavaModule {

    private static Boolean startedWithAppkey = false;
    private Context context;
    public StatModule(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext.getBaseContext();
    }

    @Override
    public String getName() {
        return "Stat";
    }

    @ReactMethod
    public void onPageStart(String pageName){
        MapbarMobStat.onPageStart(context, pageName);
    }

    @ReactMethod
    public void onPageEnd(String pageName){
        MapbarMobStat.onPageEnd(context, pageName);
    }


    @ReactMethod
    public void onEvent(String eventId, String eventLabel){
            MapbarMobStat.onEvent(context, eventId, eventLabel);
    }
//    @ReactMethod
//    public void openActivityDurationTrack(Boolean value){
//        MobclickAgent.openActivityDurationTrack(value);
//    }
//
//    @ReactMethod
//    public void onResume(){
//        MobclickAgent.onResume(context);
//    }
//
//    @ReactMethod
//    public void onPause(){
//        MobclickAgent.onPause(context);
//    }
//
//    @ReactMethod
//    public void setDebugMode(Boolean value){
//        MobclickAgent.setDebugMode(value);
//    }
//
//    @ReactMethod
//    public void setLogEnabled(Boolean value){
//        MobclickAgent.setDebugMode(value);
//    }
//
//    @ReactMethod
//    public void getDeviceInfo(Callback dataCallBack){
//        String infoStr = mGetDeviceInfo(context);
//        dataCallBack.invoke(infoStr);
//    }
//
//    @SuppressLint("NewApi")
//
//    public static boolean checkPermission(Context context, String permission) {
//        boolean result = false;
//
//        if (Build.VERSION.SDK_INT >= 23) {
//            if (context.checkSelfPermission(permission) == PackageManager.PERMISSION_GRANTED) {
//                result = true;
//            }
//        } else {
//            PackageManager pm = context.getPackageManager();
//
//            if (pm.checkPermission(permission, context.getPackageName()) == PackageManager.PERMISSION_GRANTED) {
//                result = true;
//            }
//        }
//
//        return result;
//    }
//
//
//    public static String mGetDeviceInfo(Context context) {
//        try {
//            org.json.JSONObject json = new org.json.JSONObject();
//            android.telephony.TelephonyManager tm = (android.telephony.TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE);
//
//            String device_id = null;
//
//            if (checkPermission(context, Manifest.permission.READ_PHONE_STATE)) {
//                device_id = tm.getDeviceId();
//            }
//
//            android.net.wifi.WifiManager wifi = (android.net.wifi.WifiManager) context.getSystemService(Context.WIFI_SERVICE);
//
//            String mac = wifi.getConnectionInfo().getMacAddress();
//
//            json.put("mac", mac);
//
//            if (TextUtils.isEmpty(device_id)) {
//                device_id = mac;
//            }
//
//
//            if (TextUtils.isEmpty(device_id)) {
//                device_id = android.provider.Settings.Secure.getString(context.getContentResolver(),
//                        android.provider.Settings.Secure.ANDROID_ID);
//            }
//
//            json.put("device_id", device_id);
//
//            return json.toString();
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//
//        return null;
//    }
}
