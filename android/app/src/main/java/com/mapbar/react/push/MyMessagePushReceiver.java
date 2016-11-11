package com.mapbar.react.push;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.support.v4.content.LocalBroadcastManager;
import android.widget.Toast;

import com.mapbar.MainActivity;
import com.mapbar.pushservice.mapbarpush.receiver.MessagePushReceiver;
import com.mapbar.react.CommonUtils;
import com.mapbar.react.LogUtils;

public class MyMessagePushReceiver extends MessagePushReceiver {
    private static final String LOGTAG = "MyMessagePushReceiver";
    private String tag = "MyMessagePushReceiver";

    public static final String MActionOnMessageReceived = "onMessageReceived";
    public static final String MActionOnNotificationClicked = "onNotificationClicked";

    @Override
    public void onNotificationClicked(Context context, String title,
                                      String content, String customStr) {
        startActivity(context);
        String message = "点击了通知栏:" + "title=" + title + ",content=" + content
                + ",customStr=" + customStr;
        Toast.makeText(context, message, Toast.LENGTH_SHORT).show();
        LogUtils.logd(LOGTAG, message);
        Bundle payload = new Bundle();
        payload.putString("Content", content);
        payload.putString("Title", title);
        payload.putString("CustomContent", customStr);
        Intent intent = new Intent(MActionOnNotificationClicked);
        intent.setFlags(Intent.FLAG_INCLUDE_STOPPED_PACKAGES);
        intent.putExtra("data", payload);
        LocalBroadcastManager.getInstance(context).sendBroadcast(intent);
    }
    private void startActivity(Context context) {
        //判断app进程是否存活
        if(CommonUtils.isAppAlive(context.getApplicationContext(), context.getApplicationContext().getPackageName())){
            LogUtils.logd(LOGTAG, "the app process is alive");
            Intent mainIntent = new Intent(context, MainActivity.class);
            mainIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            context.getApplicationContext().startActivity(mainIntent);
        }else {
            LogUtils.logd(LOGTAG, "the app process is dead");
            Intent launchIntent = context.getPackageManager().
                    getLaunchIntentForPackage(context.getPackageName());
            launchIntent.setFlags(
                    Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_RESET_TASK_IF_NEEDED);
            context.getApplicationContext().startActivity(launchIntent);
        }
    }

    @Override
    public void onMessageReceived(Context context, String title,
                                  String content, String customContent) {
        String message = "透传消息:content=" + content + ",customContent="
                + customContent;

        Toast.makeText(context,
                message,
                Toast.LENGTH_SHORT).show();

        LogUtils.logd(LOGTAG, message);

        Bundle payload = new Bundle();
        payload.putString("Content", content);
        payload.putString("Title", title);
        payload.putString("CustomContent", customContent);
        Intent intent = new Intent(MActionOnMessageReceived);
        intent.setFlags(Intent.FLAG_INCLUDE_STOPPED_PACKAGES);
        intent.putExtra("data", payload);
        LocalBroadcastManager.getInstance(context).sendBroadcast(intent);
    }

    @Override
    public void onSetTag(Context context, String tag, int responseCode, String result) {
        String message = "onSetTag():tag=" + tag + ",responseCode="
                + responseCode + ",result=" + result;

        Toast.makeText(context,
                message,
                Toast.LENGTH_SHORT).show();

        LogUtils.logd(LOGTAG, message);

    }

    @Override
    public void onDeleteTag(Context context, String tag, int responseCode, String result) {
        String message = "onDeleteTag():tag=" + tag + ",responseCode="
                + responseCode + ",result=" + result;

        Toast.makeText(context,
                message,
                Toast.LENGTH_SHORT).show();

        LogUtils.logd(LOGTAG, message);
    }

    @Override
    public void onGetTags(Context context, String tags, int responseCode, String result) {
        String message = "onGetTags():tag=" + tags + ",responseCode="
                + responseCode + ",result=" + result;

        Toast.makeText(context,
                message,
                Toast.LENGTH_SHORT).show();
        LogUtils.logd(LOGTAG, message);

    }

    @Override
    public void onSetPermission(Context context, String permissionType, int responseCode, String result) {
        String message = "onSetPermission():permissionType=" + permissionType + ",responseCode="
                + responseCode + ",result=" + result;

        Toast.makeText(context,
                message,
                Toast.LENGTH_SHORT).show();

        LogUtils.logd(LOGTAG, message);
    }
}
