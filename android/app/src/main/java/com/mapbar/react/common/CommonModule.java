package com.mapbar.react.common;

import android.content.Context;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
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
<<<<<<< HEAD
    }

    //暂停播放后恢复播放
    @ReactMethod
    public void resumeAudioPlay() {
        MediaPlayerOperation.resume();
=======

>>>>>>> a985aebf377fa07c83f5f15a51ddb6dd3f74a7fd
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
<<<<<<< HEAD
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
=======

>>>>>>> a985aebf377fa07c83f5f15a51ddb6dd3f74a7fd
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
}
