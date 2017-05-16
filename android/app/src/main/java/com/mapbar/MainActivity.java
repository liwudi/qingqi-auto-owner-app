package com.mapbar;

import android.content.res.Configuration;
import android.os.Bundle;


import com.cboy.rn.splashscreen.SplashScreen;
import com.facebook.react.ReactActivity;
import com.mapbar.android.statistics.api.MapbarMobStat;

import com.mapbar.react.LogUtils;
import com.mapbar.rn.navicore.map.NaviUtil;
public class MainActivity extends ReactActivity {
    private static final String TAG = "MainActivity";

    private static MainActivity activity;

    public static MainActivity getActivity() {
        return activity;
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);

        activity = this;

        LogUtils.init(MainActivity.this, "ReactABC");
        LogUtils.logd(TAG, LogUtils.getThreadName() + ">>>");
        NaviUtil.getInstance().init(this);
    }
    @Override
    protected void onStart() {
        // TODO Auto-generated method stub
        super.onStart();
        NaviUtil.getInstance().onMainActivityStart();
    }
    @Override
    protected void onResume() {
        super.onResume();
        MapbarMobStat.onPageStart(this,"MainActivity");
    }

    @Override
    protected void onDestroy() {
        NaviUtil.getInstance().onMainActivityDestroy();
        super.onDestroy();
        LogUtils.logd(TAG, LogUtils.getThreadName());
    }
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "QingqiOwnerApp";
    }


    // 激活key
    public static final String KEY = "qingqi001-20161017-01-Z-F-I10000";
    // 应用名
    private static String mAppName = null;
    // dpi
    private static String mAppPath = null;
    // dpi
    private static int mDensityDpi = 0;
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected void onPause() {
        super.onPause();
        MapbarMobStat.onPageEnd(this,"MainActivity");
    }
    @Override
    protected void onStop() {
        NaviUtil.getInstance().onMainActivityStop();
        // TODO Auto-generated method stub
        super.onStop();
    }



    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
    }
}
