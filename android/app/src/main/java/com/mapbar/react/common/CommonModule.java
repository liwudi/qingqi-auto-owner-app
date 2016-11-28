package com.mapbar.react.common;

import android.content.Context;
import android.media.MediaPlayer;
import android.text.TextUtils;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.mapbar.react.CommonUtils;
import com.mapbar.react.LogUtils;
import com.mapbar.react.common.operation.ContactsOperation;
import com.mapbar.react.common.operation.MediaPlayerOperation;
import com.mapbar.react.common.operation.MediaRecorderOperation;

import java.io.File;

/**
 * Created by Administrator on 2016/10/18.
 */
public class CommonModule extends ReactContextBaseJavaModule implements LifecycleEventListener {

    private Context context;
    private String TAG = "CommonModule";

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
        WritableMap writableMap = Arguments.createMap();

        long recordTime = mAudioManager.release();
        LogUtils.logd(TAG, "recordTime:" + recordTime);
        if (recordTime == 0) {
            mAudioManager.deleteCurrentAudio();
            writableMap.putString("finishAudio", "您还未录音，请录音");
        } else if (recordTime < 600) {
            mAudioManager.deleteCurrentAudio();
            writableMap.putString("finishAudio", "录音时间过短，请重新录音");
        } else {
            writableMap.putString("finishAudio", "录音成功");
        }
        writableMap.putBoolean("isRecording", false);
        writableMap.putString("audioPath", mAudioManager.getCurrentFilePath());
        promise.resolve(writableMap);
    }

    //暂停录音
    @ReactMethod
    public void playAudio(String audioPath, final Promise promise) {
        MediaRecorderOperation mAudioManager = MediaRecorderOperation.getInstance(context.getApplicationContext());
        final WritableMap writableMap = Arguments.createMap();
        if (!TextUtils.isEmpty(audioPath)) {
            File file = new File(audioPath);
            if (file.exists()) {
                MediaPlayerOperation.playSound(audioPath,
                        new MediaPlayer.OnCompletionListener() {
                            @Override
                            public void onCompletion(MediaPlayer mp) {
                                LogUtils.logd(TAG, "播放完成");
                                MediaPlayerOperation.release();
                                writableMap.putString("finishPlayAudio", "播放完成");
                                promise.resolve(writableMap);
                            }
                        });
            }
        }
    }

    @Override
    public void onHostResume() {
        MediaPlayerOperation.resume();
    }

    @Override
    public void onHostPause() {
        MediaPlayerOperation.pause();
    }

    @Override
    public void onHostDestroy() {
        MediaPlayerOperation.release();
    }
}
