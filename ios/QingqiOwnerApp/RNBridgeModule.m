//
//  RNBridgeModule.m
//  hunheDemo
//
//  Created by caoshilong on 16/6/5.
//  Copyright © 2016年 Facebook. All rights reserved.
//
#import "RNBridgeModule.h"
#import <React/RCTBridge.h>
#import <React/RCTEventDispatcher.h>
#import "JHSysContactsUtil.h"

@interface RNBridgeModule()
@property (nonatomic, strong) JHSysContactsUtil *contactsUtil;
@end
@implementation RNBridgeModule

@synthesize bridge = _bridge;

RCT_EXPORT_MODULE(RNBridgeModule)


//版本信息获取
RCT_EXPORT_METHOD(getVersionInfo:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject){
  
    NSDictionary *infoDictionary = [[NSBundle mainBundle] infoDictionary];
    NSString *app_Version = [infoDictionary objectForKey:@"CFBundleShortVersionString"];
    NSString *app_build = [infoDictionary objectForKey:@"CFBundleVersion"];
    NSString *app_CurName = [infoDictionary objectForKey:@"CFBundleDisplayName"];
    NSDictionary *dict = @{@"versionName":app_Version,
                           @"versionCode":app_build,
                           @"packageName":app_CurName};
  
    if(app_Version && app_build){
      resolve([NSDictionary dictionaryWithDictionary:dict]);
    }else{
      NSError *error=[NSError errorWithDomain:@"versionName、versionCode、cpackageName获取失败" code:100 userInfo:nil];
      reject(@"100",@"versionName、versionCode、cpackageName获取失败",error);
    }
}

//通讯录信息获取
RCT_EXPORT_METHOD(getContactInfo:(NSString *)string resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject){
  
  if(self.contactsUtil == nil) {
    self.contactsUtil = [JHSysContactsUtil new];
  }
  
  
  // 获取联系人信息
  [self.contactsUtil callContactsHandler:^(JHContactModel *contact) {
    NSLog(@"@@~~name : %@, phoneNumber: %@", contact.name, contact.phoneNumber);
    
    if(contact.name && contact.phoneNumber){
      resolve(@{@"name":contact.name,@"phoneNumber":contact.phoneNumber});
    }else{
      NSError *error=[NSError errorWithDomain:@"versionName、versionCode、cpackageName获取失败" code:100 userInfo:nil];
      reject(@"100",@"versionName、versionCode、cpackageName获取失败",error);
    }
    
  }];
  
  
}

RCT_EXPORT_METHOD(RNInvokeOCCallPhone:(NSDictionary *)dictionary){
  
  NSString *value=[dictionary objectForKey:@"name"];
  NSMutableString * str=[[NSMutableString alloc] initWithFormat:@"telprompt://%@",value];

  [[UIApplication sharedApplication] openURL:[NSURL URLWithString:str]];
}

@end
