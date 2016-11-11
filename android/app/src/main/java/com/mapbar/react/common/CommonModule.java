package com.mapbar.react.common;

import android.content.Context;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by Administrator on 2016/10/18.
 */
public class CommonModule extends ReactContextBaseJavaModule {

    private Context context;


    public CommonModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
    }

    @Override
    public String getName() {
        return "CommonModule";
    }


    //获取联系人
    @ReactMethod
    public void getContacts( Promise promise) {
        CommonOperation operation = new CommonOperation(context);
        operation.getContacts(promise);
    }
}
