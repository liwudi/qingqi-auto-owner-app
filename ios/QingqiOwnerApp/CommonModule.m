//
//  CommonModule.m
//  QingqiDriverApp
//
//  Created by admin on 2017/3/3.
//  Copyright © 2017年 Facebook. All rights reserved.
//

#import "CommonModule.h"
#import <React/RCTBridge.h>
#import <React/RCTEventDispatcher.h>
#import <UShareUI/UShareUI.h>

@implementation CommonModule

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE(CommonModule)





- (NSDictionary *)constantsToExport
{
  
  BOOL a;
#ifdef DEBUG
  a= YES;
#else
  a = NO;
#endif
  
  NSDictionary *infoDictionary = [[NSBundle mainBundle] infoDictionary];
  NSString *app_Version = [infoDictionary objectForKey:@"CFBundleShortVersionString"];
  NSString *app_build = [infoDictionary objectForKey:@"CFBundleVersion"];
  NSString *app_CurName = [infoDictionary objectForKey:@"CFBundleDisplayName"];
  NSString *app_CurBundleId = [infoDictionary objectForKey:@"CFBundleIdentifier"];
  
  NSString *deviceName = [[UIDevice currentDevice] name];
  
  NSDictionary *dict = @{
                         @"VERSION_NAME":app_Version,
                         @"VERSION_CODE":app_build,
                         @"APPLICATION_ID":app_CurBundleId,
                         @"APPLICATION_NAME":app_CurName,
                         @"DEBUG":@"true",
                         @"server_type":@"release",
                         @"deviceName":deviceName
                         };
  
  return dict;
}

//分享
RCT_EXPORT_METHOD(
                  share: (NSString *) title
                  message: (NSString *) message
                  url: (NSString *) url
                  imgPath: (NSString *) imgPath
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject
                  ){
  
  dispatch_async(dispatch_get_main_queue(), ^{
    [UMSocialUIManager showShareMenuViewInWindowWithPlatformSelectionBlock:^(UMSocialPlatformType platformType, NSDictionary *userInfo) {
      //[self runShareWithType:platformType];
      //创建分享消息对象
      UMSocialMessageObject *messageObject = [UMSocialMessageObject messageObject];
      
      //创建网页内容对象
      NSString* thumbURL =  imgPath;
      UMShareWebpageObject *shareObject = [UMShareWebpageObject shareObjectWithTitle:title descr:message thumImage:thumbURL];
      //设置网页地址
      shareObject.webpageUrl = url;
      
      //分享消息对象设置分享内容对象
      messageObject.shareObject = shareObject;
      
      //调用分享接口
      [[UMSocialManager defaultManager] shareToPlatform:platformType messageObject:messageObject currentViewController:nil completion:^(id data, NSError *error) {
        if (error) {
          UMSocialLogInfo(@"************Share fail with error %@*********",error);
        }else{
          if ([data isKindOfClass:[UMSocialShareResponse class]]) {
            UMSocialShareResponse *resp = data;
            //分享结果消息
            UMSocialLogInfo(@"response message is %@",resp.message);
            //第三方原始返回的数据
            UMSocialLogInfo(@"response originalResponse data is %@",resp.originalResponse);
            
          }else{
            UMSocialLogInfo(@"response data is %@",data);
          }
        }
        //[self alertWithError:error];
      }];
    }];
    NSArray *events = [NSArray array];
    resolve(events);
  });
  //  //显示分享面板
  //  [UMSocialUIManager setPreDefinePlatforms:@[@(UMSocialPlatformType_WechatSession)]];
  //  [UMSocialUIManager showShareMenuViewInWindowWithPlatformSelectionBlock:^(UMSocialPlatformType platformType, NSDictionary *userInfo) {
  //    // 根据获取的platformType确定所选平台进行下一步操作
  //  }];
}



@end
