//
//  JHSysContactsUtil.h
//  JHSystemUtility
//
//  Created by 流痕 on 16/8/9.
//  Copyright © 2016年 FLZC. All rights reserved.
// 对 ABPeoplePickerNavigationController 的封装 (一句代码调用, block 回调中获得姓名和电话)

#import <Foundation/Foundation.h>

/** model 类 */
@interface JHContactModel : NSObject

@property (nonatomic, copy) NSString *name;
@property (nonatomic, copy) NSString *phoneNumber;

@end

typedef void(^JHContactsBlock)(JHContactModel *contact);

typedef NS_ENUM(NSInteger, JHMessageComposeResult)
{
    JHMessageComposeResultCancelled = 0,
    JHMessageComposeResultSent,
    JHMessageComposeResultFailed
};


typedef void(^JHMessageBlock)(JHMessageComposeResult result);

@interface JHSysContactsUtil : NSObject

/**
 *  调用系统通讯录 选择并获取联系人信息
 *
 *  @param handler 选取联系人后的回调
 */
- (void)callContactsHandler:(JHContactsBlock)handler;

/**
 *  调用系统短信功能 单发/群发信息，并返回发送结果
 *
 *  @param phoneNumbers 电话号码数组
 *  @param message      短信内容
 *  @param handler      发送后的回调
 */
- (void)sendContacts:(NSArray<NSString *> *)phoneNumbers message:(NSString *)message completion:(JHMessageBlock)handler;

@end

/**
 *  使用:
 用属性调用实例方法打电话:
 self.contactsUtil = [JHSysContactsUtil new];
 [self.contactsUtil callContactsHandler:^(JHContactModel *contact) {
 NSLog(@"@@~~name : %@, phoneNumber: %@", contact.name, contact.phoneNumber);
 }];
 
 用属性调用实例方法发短信:
 [self.contactsUtil sendContacts:@[@"10010"] message:@"This is a test" completion:^(JHMessageComposeResult result) {
 NSLog(@"@@~~d : %ld", (long)result);
 }];
 */



