//
//  MyView.h
//  ReactNative_MyViewController
//
//  Created by 张晓珊 on 16/9/20.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>
#import <iNaviCore/MBMapView.h>
#import "RCTComponent.h"


typedef void(^Success)(NSDictionary *location);
typedef void(^Failure)(NSError *error);
@interface MapView : UIView

/// 提供给JS使用的属性

@property (nonatomic,assign) BOOL showUserLocation;
/** 缩放 **/
@property(nonatomic,assign) float zoomLevel;
/** 禁止操作地图 **/
@property(nonatomic,assign) BOOL forbidGesture;
/** 中心点坐标 **/
@property(nonatomic,copy) NSDictionary *worldCenter;
/** 是否允许旋转 **/
@property(nonatomic,assign) BOOL rotationEnable;
/** 是否允许拖动 **/
@property(nonatomic,assign) BOOL dragEnable;
/** 是否允许缩放 **/
@property(nonatomic,assign) BOOL zoomEnable;


@property (nonatomic, copy) RCTBubblingEventBlock onAnnotationClick;
@property (nonatomic, copy) RCTBubblingEventBlock onIconOverlayClick;

@property (nonatomic, copy) RCTBubblingEventBlock onZoom;//缩放
@property (nonatomic, copy) RCTBubblingEventBlock onSpan;//平移
@property (nonatomic, copy) RCTBubblingEventBlock onTap;//点击事件
@property (nonatomic, copy) RCTBubblingEventBlock onRotation;//旋转事件
@property (nonatomic, copy) RCTBubblingEventBlock onInit;//初始化事件
@property (nonatomic, copy) RCTBubblingEventBlock onDelloc;//注销事
@property (nonatomic, copy) Success success;
@property (nonatomic, copy) Failure failure;

@property (nonatomic, strong) NSArray *annotations;
@property (nonatomic, strong) NSArray *rotationAnnotations;



- (void)lineWithPoints:(NSDictionary *)dict;
- (NSInteger)test4;
- (void)moveWith:(NSDictionary *)dict;
- (void)removeAnnotation:(NSArray *)annotations;
//- (void)setAnnotations:(NSArray<my *> *)annotations;
- (void)setZoomLevel:(CGFloat)zoomLevel animated:(BOOL)animated;
- (MBRect)getWorldRect;
- (void)fitWorldArea:(MBRect)rect;
- (float)getZoomLevelValue;
- (NSArray *)getAnnotationIds;
- (NSArray *)getIconOverlayIds;
- (void)removeLine;
- (void)setAnnotationIcon:(NSDictionary *)dict;
- (void)stopLocation;
- (void)setIconOverlayIcon:(NSArray *)dict;
- (void)removeIconOverlay:(NSArray *)annotations;
- (void)refreshIconOVerlayLocation:(NSDictionary *)dict;
- (void)removeAllOverlayAndAnnotation;
- (void)setShowUserLocation:(BOOL)showUserLocation resolve:(Success)resolve reject:(Failure)reject;
@end
