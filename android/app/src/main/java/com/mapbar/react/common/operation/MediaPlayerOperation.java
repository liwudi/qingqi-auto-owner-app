package com.mapbar.react.common.operation;


import android.media.AudioManager;
import android.media.MediaPlayer;
import android.media.MediaPlayer.OnCompletionListener;
import android.media.MediaPlayer.OnErrorListener;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;
import com.mapbar.react.LogUtils;

import java.io.IOException;

public class MediaPlayerOperation {

	private static MediaPlayer mPlayer;
	private static boolean isPause;
    private static int mediaPlayerDuration=0;
    private static final String TAG="MediaPlayerOperation";

	public static  void playSound(String filePath, final Promise promise) {
		// TODO Auto-generated method stub
		if (mPlayer==null) {
			mPlayer=new MediaPlayer();
			//保险起见，设置报错监听
			mPlayer.setOnErrorListener(new OnErrorListener() {

				@Override
				public boolean onError(MediaPlayer mp, int what, int extra) {
					// TODO Auto-generated method stub
					mPlayer.reset();
					return false;
				}
			});
		}else {
			mPlayer.reset();//就回复
		}
		try {
			mPlayer.setAudioStreamType(AudioManager.STREAM_MUSIC);
			mPlayer.setDataSource(filePath);
			mPlayer.prepare();
			mPlayer.start();
            mediaPlayerDuration =mPlayer.getDuration();
            mPlayer.setOnCompletionListener(new OnCompletionListener() {
                @Override
                public void onCompletion(MediaPlayer mp) {
                    LogUtils.logd(TAG, "播放完成");
                    MediaPlayerOperation.release();
                    WritableMap writableMap = Arguments.createMap();
                    writableMap.putString("finishPlayAudio", "播放完成");
                    promise.resolve(writableMap);
                }
            });
            LogUtils.logd(TAG,"mediaPlayerDuration"+mediaPlayerDuration);
		} catch (IllegalArgumentException e) {
            mPlayer.setOnCompletionListener(null);
            release();
            promise.reject("error",e.toString());
			e.printStackTrace();
		} catch (SecurityException e) {
            mPlayer.setOnCompletionListener(null);
            release();
            promise.reject("error",e.toString());
			e.printStackTrace();
		} catch (IllegalStateException e) {
            mPlayer.setOnCompletionListener(null);
            release();
            promise.reject("error",e.toString());
			e.printStackTrace();
		} catch (IOException e) {
            mPlayer.setOnCompletionListener(null);
            release();
            promise.reject("error","请检查文件是否存在");
			e.printStackTrace();
		}
	}

    //获取播放总长
    public static void getDuration(String filePath, Promise promise) {
        if (mPlayer == null) {
            mPlayer = new MediaPlayer();
        }
        try {
            mPlayer.setDataSource(filePath);
            mPlayer.prepare();
            int mediaPlayerDuration = mPlayer.getDuration();
            release();
            WritableMap writableMap = Arguments.createMap();
            writableMap.putInt("mediaPlayerDuration", mediaPlayerDuration);
            promise.resolve(writableMap);

        } catch (Exception e) {
            release();
            e.printStackTrace();
            promise.reject("error", e.toString());
        }
    }

    //获取播放当前位置
    public static void getCurrentPosition(Promise promise) {
        if (mPlayer != null) {
            WritableMap writableMap = Arguments.createMap();
            writableMap.putInt("currentPosition", mPlayer.getCurrentPosition());
            promise.resolve(writableMap);
        }else{
            promise.reject("error","请在播放录音或暂停时获取播放位置");
        }
    }


	//停止函数
	public static void pause(Promise promise){
		if (mPlayer!=null&&mPlayer.isPlaying()) {
			mPlayer.pause();
			isPause=true;
            WritableMap writableMap = Arguments.createMap();
            writableMap.putString("pauseAudioPlay", "暂停播放");
            promise.resolve(writableMap);
		}else{
            promise.reject("error","请先播放录音");
        }
	}
    //停止函数
    public static void pause(){
        if (mPlayer!=null&&mPlayer.isPlaying()) {
            mPlayer.pause();
            isPause=true;
        }
    }
	//继续
	public static void resume()
	{
		if (mPlayer!=null&&isPause) {
			mPlayer.start();
			isPause=false;
		}
	}


	public  static void release()
	{
		if (mPlayer!=null) {
			mPlayer.release();
			mPlayer=null;
		}
	}
}
