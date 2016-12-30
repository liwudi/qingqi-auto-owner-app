package com.mapbar.react.common;

import android.content.Context;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.mapbar.nim.MessageServer;
import com.mapbar.react.CommonUtils;
import com.mapbar.react.LogUtils;
import com.mapbar.react.common.operation.ContactsOperation;
import com.mapbar.react.common.operation.HttpPostUpload;
import com.mapbar.react.common.operation.MediaPlayerOperation;
import com.mapbar.react.common.operation.MediaRecorderOperation;

/**
 * Created by Administrator on 2016/10/18.
 */
public class CommonModule extends ReactContextBaseJavaModule implements LifecycleEventListener {

    private Context context;
    private String TAG = "CommonModule";

    public CommonModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
        reactContext.addLifecycleEventListener(this);
    }

    @Override
    public String getName() {
        return "CommonModule";
    }


    //获取联系人
    @ReactMethod
    public void getContacts(Promise promise) {
        ContactsOperation operation = new ContactsOperation(context);
        operation.getContacts(promise);
    }

    //开始录音
    @ReactMethod
    public void startAudio(Promise promise) {
        if (CommonUtils.isSDCardEnable()) {
            MediaRecorderOperation mAudioManager = MediaRecorderOperation.getInstance(context.getApplicationContext());
            mAudioManager.prepareAudio(promise);
        } else {
            promise.reject("prepareAudio", "录音前请确保手机有SD卡");
        }
    }

    //暂停录音
    @ReactMethod
    public void stopAudio(Promise promise) {
        MediaRecorderOperation mAudioManager = MediaRecorderOperation.getInstance(context.getApplicationContext());
        long recordTime = mAudioManager.release();
        LogUtils.logd(TAG, "recordTime:" + recordTime);
        if (recordTime == 0) {
            promise.reject("error", "请先录音");
        } else if (recordTime < 600) {
            mAudioManager.deleteCurrentAudio();
            promise.reject("error", "录音时间过短，请重新录音");
        } else {
            WritableMap writableMap = Arguments.createMap();
            writableMap.putString("finishAudio", "录音成功");
            writableMap.putBoolean("isRecording", false);
            writableMap.putString("audioPath", mAudioManager.getCurrentFilePath());
            promise.resolve(writableMap);
        }
    }

    //播放录音
    @ReactMethod
    public void playAudio(String audioPath, Promise promise) {
        MediaPlayerOperation.playSound(audioPath, promise);
    }

    //暂停播放
    @ReactMethod
    public void pauseAudioPlay(Promise promise) {
        MediaPlayerOperation.pause(promise);
    }

    //暂停播放后恢复播放
    @ReactMethod
    public void resumeAudioPlay() {
        MediaPlayerOperation.resume();
    }

    //获取录音总时长
    @ReactMethod
    public void getPlayAudioDuration(String audioPath, Promise promise) {
        MediaPlayerOperation.getDuration(audioPath, promise);
    }

    //获取当前录音点
    @ReactMethod
    public void getPlayAudioPosition(Promise promise) {
        MediaPlayerOperation.getCurrentPosition(promise);
    }

    //指定到播放位置。
    @ReactMethod
    public void seekTo(int millis,Promise promise) {
        MediaPlayerOperation.seekTo(millis,promise);
    }

    //获取录音音频，用于页面声音波动动画。
    @ReactMethod
    public void getVoiceLevel(int millis,Promise promise) {
        MediaRecorderOperation mAudioManager = MediaRecorderOperation.getInstance(context.getApplicationContext());
        int voiceLevel = mAudioManager.getVoiceLevel(millis);
        WritableMap writableMap = Arguments.createMap();
        writableMap.putInt("voiceLevel", voiceLevel);
        promise.resolve(writableMap);
    }
    //删除所有录音文件
    @ReactMethod
    public void deleteAllAudio() {
        MediaRecorderOperation mAudioManager = MediaRecorderOperation.getInstance(context.getApplicationContext());
        mAudioManager.deleteAllAudio();
    }
    //删除某个录音文件
    @ReactMethod
    public void deleteAudio(String audioPath) {
        MediaRecorderOperation mAudioManager = MediaRecorderOperation.getInstance(context.getApplicationContext());
        mAudioManager.deleteAudio(audioPath);
    }
    @Override
    public void onHostResume() {
//        MediaPlayerOperation.resume();
    }

    @Override
    public void onHostPause() {
//        MediaPlayerOperation.pause();
    }

    @Override
    public void onHostDestroy() {
        MediaRecorderOperation mAudioManager = MediaRecorderOperation.getInstance(context.getApplicationContext());
        mAudioManager.release();
        MediaPlayerOperation.release();
    }

    //上传
    @ReactMethod
    public void HttpPostUpload(String url, ReadableMap params, ReadableMap headers, Promise promise) {
        HttpPostUpload httpPostUpload = new HttpPostUpload();
        try {
            httpPostUpload.upload(url, params, headers, promise);
        } catch (Exception e) {
            promise.reject(e);
            e.printStackTrace();
        }
    }

    /*上传File 文件
    * filePaths  文件路径url
    * */
    @ReactMethod
    public void HttpPostUploadFile(String url, ReadableArray filePaths, Promise promise) {
        HttpPostUpload httpPostUpload = new HttpPostUpload();
        try {
            httpPostUpload.uploadFile(url, filePaths, promise);
        } catch (Exception e) {
            promise.reject(e);
            e.printStackTrace();
        }
    }

    /* 打开客服
    * */
    @ReactMethod
    public void startKefuActivity(String userId,String kefuId,String type,String nimToken) {
        MessageServer messageServer =new MessageServer(((ReactContext) context).getCurrentActivity());
        messageServer.prepare(userId,kefuId,type,nimToken);
    }
    /* 注销客服登录
        * */
    @ReactMethod
    public void logoutKefu() {
        MessageServer.logout();
    }


    /**
     * 获取版本信息
     * @param promise
     */
    @ReactMethod
    public void getVersionInfo(Promise promise) {
        PackageInfo packageInfo = getPackageInfo(context);

        WritableMap writableMap = Arguments.createMap();
        writableMap.putString("versionName", packageInfo.versionName);
        writableMap.putInt("versionCode", packageInfo.versionCode);

        promise.resolve(writableMap);
    }

    private static PackageInfo getPackageInfo(Context context) {
        PackageInfo pi = null;

        try {
            PackageManager pm = context.getPackageManager();
            pi = pm.getPackageInfo(context.getPackageName(),
                    PackageManager.GET_CONFIGURATIONS);

            return pi;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return pi;
    }

}
