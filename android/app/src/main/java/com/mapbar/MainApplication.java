package com.mapbar;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.cboy.rn.splashscreen.SplashScreenReactPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.mapbar.pushservice.mapbarpush.MapbarPushInterface;
import com.mapbar.pushservice.mapbarpush.PushConfigs;
import com.mapbar.react.common.CommonPackage;
import com.mapbar.react.map.MapbarMapPackage;
import com.mapbar.react.push.MarbarPushPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.imagepicker.ImagePickerPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {
  private static final String TAG = "MainApplication";
  @Override
  public void onCreate() {
    super.onCreate();
    PushConfigs.DEFAULT_APIKEY = "fd4b24282d45412fb0571a7473479fee";
    //		PushConfigs.ESB_ADDRESS = "wdservice.mapbar.com:6001";
    //		PushConfigs.HOST_ADDRESS = "wdservice.mapbar.com";
    MapbarPushInterface.init(this);
  }
  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new SplashScreenReactPackage(), new VectorIconsPackage(), new ImagePickerPackage(), new MarbarPushPackage(), new MapbarMapPackage(),new CommonPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }
}
