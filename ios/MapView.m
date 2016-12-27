//
//  MyView.m
//  ReactNative_MyViewController
//
//  Created by 张晓珊 on 16/9/20.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "MapView.h"

#import <iNaviCore/MBMapView.h>
#import <iNaviCore/MBPolylineOverlay.h>


#import <iNaviCore/MBGpsLocation.h>
#import <iNaviCore/MBPoiQuery.h>
#import <iNaviCore/MBReverseGeocoder.h>
#import <iNaviCore/MBAnnotation.h>
#import <iNaviCore/MBIconOverlay.h>

#import <iNaviCore/MBCustomAnnotation.h>


#import <iNaviCore/MBMapViewDelegate.h>
#import <iNaviCore/MBPoiQueryParams.h>
#import <iNaviCore/MBGpsInfo.h>
#import <iNaviCore/MBReverseGeocodeObject.h>

#import "ErrorMsg.h"
#import "UIColor+HexString.h"

@interface MapView ()<MBMapViewDelegate,MBGpsLocationDelegate,MBReverseGeocodeDelegate,UIAlertViewDelegate>
{
  NSMutableArray *ids;
  NSMutableArray *iconOverlayIds;
  NSMutableArray *lineOverlays;
  int  lastSelectId;
}

/**
 *  地图视图
 */
@property (nonatomic ,strong) MBMapView *mapView;
/**
 *  设置建筑物是否透明
 */
@property (nonatomic ,assign) BOOL isBuildingOpaque;
/**
 *  当前位置
 */
@property (nonatomic ,assign) MBPoint point;
/**
 *  GPS 定位信息
 */
@property (nonatomic ,strong) MBGpsLocation *gpsLocation;
/**
 *  POI搜索类
 */
@property (nonatomic ,strong) MBPoiQuery *poiQuery;
/**
 *  逆地理类
 */
@property (nonatomic ,strong) MBReverseGeocoder *reverseGeocoder;
/**
 *  大头针
 */
@property (nonatomic ,strong) MBAnnotation *locationAnnotation;
/**
 *  绘制多边形polygon和线条line的Overlay
 */
@property (nonatomic ,strong) MBPolylineOverlay *polylineOverlay;
@property (nonatomic ,strong) MBIconOverlay *overlay;

@property (nonatomic, strong) NSMutableArray *annotationIDs;

@end


@implementation MapView

- (instancetype)initWithFrame:(CGRect)frame
{
  self = [super initWithFrame:frame];
  if (self) {
    self.backgroundColor = [UIColor yellowColor];
//    [self setUpUI];
    
    // 1. 到地图不存在的时候创建
    if (self.mapView == nil) {
      self.mapView = [[MBMapView alloc]initWithFrame:self.bounds];
      ids = [NSMutableArray new];
      iconOverlayIds = [NSMutableArray new];
      lineOverlays = [NSMutableArray new];
    }
    
    // 2. 判断授权
    if (self.mapView.authErrorType == MBSdkAuthError_none) {
      // 授权成功
      [self insertSubview:self.mapView atIndex:0];
      [self.mapView setZoomLevel:self.mapView.zoomLevel - 1 animated:YES];
      
      if ([CLLocationManager locationServicesEnabled]) {
        // 开始定位用户位置
        self.gpsLocation = [[MBGpsLocation alloc]init];
        self.gpsLocation.delegate = self;
        [self.gpsLocation startUpdatingLocation];
        
        
      }else{
        // 不能定位用户位置
        // 1. 提醒用户检查网络状况
        // 2. 提醒用户打开定位开关
      }
      
      self.poiQuery = [MBPoiQuery sharedInstance];
      MBPoiQueryParams *params = [MBPoiQueryParams defaultParams];
      params.mode = MBPoiQueryMode_online;
      self.poiQuery.params = params;
      
      self.reverseGeocoder = [[MBReverseGeocoder alloc]init];
      self.reverseGeocoder.delegate = self;
    }
    else{
      // 授权失败
      ErrorMsg *msg = [[ErrorMsg alloc]initWithErrorId:self.mapView.authErrorType];
      NSString *strMsg = [NSString stringWithFormat:@"地图授权失败,%@",msg.errorMsg];
      UIAlertView *alert = [[UIAlertView alloc]initWithTitle:@"错误" message:strMsg delegate:self cancelButtonTitle:@"确定退出" otherButtonTitles:nil, nil];
      [alert show];
    }
    self.mapView.delegate = self;
    self.isBuildingOpaque = TRUE;// 设置建筑物透明
    
  }
  return self;
}

/**
 *  销毁
 */
-(void)dealloc{
  self.mapView.delegate = nil;
  self.mapView = nil;
  self.reverseGeocoder.delegate = nil;
  self.reverseGeocoder = nil;
  [self.gpsLocation stopUpdatingLocation];
  self.gpsLocation.delegate = nil;
  self.gpsLocation = nil;
  self.poiQuery.delegate = nil;
  self.poiQuery = nil;
}

/**
 *  设置地图缩放级别
 *  @param  zoomLevel   缩放级别，取值范围[1.0, 14.0]
 *  @param  animated    是否使用动画效果
 *  @return 空
 */
#pragma mark 地图缩放
- (void)setZoomLevel:(float)zoomLevel
{
  self.mapView.zoomLevel = zoomLevel;
}

/***************add by liufang@mapbar.com*****************/
#pragma mark 获取地图缩放级别
- (float)getZoomLevelValue
{
  return self.mapView.zoomLevel;
}

- (MBRect)getWorldRect
{
  
  return self.mapView.worldRect;
}
- (void)fitWorldArea:(MBRect) rect
{
  
  [self.mapView fitWorldArea:rect];
}

- (void)setForbidGesture:(BOOL)forbidGesture
{
  self.mapView.forbidGesture = forbidGesture;
}

#pragma mark 打点
- (void)setAnnotations:(NSArray *)annotations
{
//  NSMutableArray *ids = [NSMutableArray new];
  
  for (int i = 0 ; i < annotations.count; i ++) {
    NSDictionary *info = annotations[i];
    CGPoint pivotPoint = {[info[@"offsetX"] floatValue], [info[@"offsetY"] floatValue]};//设置气泡在点上的偏移量
    MBPoint point = {[info[@"longitude"] intValue],[info[@"latitude"] intValue]};
    MBAnnotation *annotation = [[MBAnnotation alloc] initWithZLevel:2 pos:point iconId:[info[@"imageName"] intValue] pivot: pivotPoint]; //在点point上创建一个偏移量为pivot的气泡
    
    annotation.clickable = [info[@"click"] boolValue];
    annotation.tag = [info[@"id"] intValue];
    CGPoint cgPoint = {0.5,0.5};
    [annotation setIconText:info[@"iconText"] UIColor:[UIColor colorWithHexString:info[@"iconTextColor"]] anchor:cgPoint];
    [annotation setIconTextSize:[info[@"iconTextSize"] intValue]];

    [self.mapView addAnnotation:annotation];
    //添加annotation标识
    if(info[@"id"]) {
      [ids addObject:[NSString stringWithFormat:@"%@",info[@"id"]]];
    }
    
    MBCalloutStyle calloutStyle = annotation.calloutStyle;//获取气泡样式
    calloutStyle.anchor.x = 0.5f;
    calloutStyle.anchor.y = 0;
    annotation.calloutStyle = calloutStyle;
    annotation.title = info[@"title"];//文本内容
    if([info[@"callOut"] intValue] == 1) {
      [annotation showCallout:YES]; //设置气泡可显示
    }
    
  }
  NSLog(@"打点");
}


#pragma mark 获取所有点标识
- (NSArray *)getAnnotationIds
{
  return [NSArray arrayWithArray:ids];
}

#pragma mark 获取所有iconOvelayd的标识
- (NSArray *)getIconOverlayIds
{
  return [NSArray arrayWithArray:iconOverlayIds];
}

#pragma mark  更新点的经纬度
- (void)moveWith:(NSDictionary *)dict
{
  MBPoint point = {[dict[@"longitude"] intValue],[dict[@"latitude"] intValue]};
  self.mapView.worldCenter = point;
  /** 根据annotation的标识 取出annotation 改变位置 强制刷新地图 */
  NSPredicate *predict = [NSPredicate predicateWithFormat:@"tag == %d",[dict[@"id"] intValue]];
  NSArray *anoArr = [self.mapView.annotations filteredArrayUsingPredicate:predict];
  MBAnnotation *ano = anoArr[0];
  if(ano) {
    ano.position = point;
    CGPoint cgPoint = {0.5,0.5};
    [ano setIconText:dict[@"iconText"] UIColor:[UIColor colorWithHexString:dict[@"iconTextColor"]] anchor:cgPoint];
    [ano setIconTextSize:[dict[@"iconTextSize"] intValue]];
    [self.mapView drawView];
  }
  NSLog(@"移动");
}

#pragma mark  更新icon图标
- (void)setAnnotationIcon:(NSDictionary *)dict
{
  CGPoint pivotPoint = {[dict[@"offsetX"] floatValue], [dict[@"offsetY"] floatValue]};//设置气泡在点上的偏移量  /** 根据annotation的标识 取出annotation 改变位置 强制刷新地图 */
  NSPredicate *predict = [NSPredicate predicateWithFormat:@"tag == %d",[dict[@"id"] intValue]];
  NSArray *anoArr = [self.mapView.annotations filteredArrayUsingPredicate:predict];
  MBAnnotation *ano = anoArr[0];
  if(ano) {
    [ano setIcon:[dict[@"iconName"] intValue] pivot:pivotPoint];
//    [self.mapView drawView];
  }
  
}

#pragma mark  更新icon title
- (void)setAnnotationTitle:(NSDictionary *)dict
{
    /** 根据annotation的标识 取出annotation 改变位置 强制刷新地图 */
  NSPredicate *predict = [NSPredicate predicateWithFormat:@"title == %@",@"start"];
  NSArray *anoArr = [self.mapView.annotations filteredArrayUsingPredicate:predict];
  MBAnnotation *ano = anoArr[0];
  if(ano) {
    ano.title = dict[@"title"];
    [self.mapView drawView];
  }
}


//#pragma mark  更新icon旋转度数
//- (void)setAnnotationHeading:(NSDictionary *)dict
//{
//  /** 根据annotation的标识 取出annotation 改变位置 强制刷新地图 */
//  NSPredicate *predict = [NSPredicate predicateWithFormat:@"title == %@",@"start"];
//  NSArray *anoArr = [self.mapView.annotations filteredArrayUsingPredicate:predict];
//  MBAnnotation *ano = anoArr[0];
//  if(ano) {
//    ano.title = dict[@"title"];
//    [self.mapView drawView];
//  }
//  
//}

#pragma mark  设置图标上的文字
- (void)setIconText:(NSDictionary *)dict
{
  
}


#pragma mark 添加iconOverlay
- (void)setRotationAnnotations:(NSArray *)rotationAnnotations
{
  for (int i = 0 ; i < rotationAnnotations.count; i ++) {
    NSDictionary *info = rotationAnnotations[i];
    MBPoint point = {[info[@"longitude"] intValue],[info[@"latitude"] intValue]};
    self.overlay = [[MBIconOverlay alloc]initWithFilePath:[NSString stringWithFormat:@"res/icons/%@.png",info[@"imageName"]] maintainPixelSize:YES];
    self.overlay.tag = [info[@"id"] intValue];
    self.overlay.overlayerLayer = MBOverlayLayer_abovePoi;
    self.overlay.postion = point;
    [self.overlay setClickEnable:YES];
    self.overlay.orientAngle  = [info[@"direction"] floatValue];
    self.overlay.scaleFactor = 0.9;
    [self.mapView addOverlay:self.overlay];
    
    if(info[@"id"]) {
      [iconOverlayIds addObject:[NSString stringWithFormat:@"%@",info[@"id"]]];
    }
    
    [self.mapView setWorldCenter:self.overlay.position];
  }
  
}

#pragma mark  更新iconOverlay的经纬度
- (void)refreshIconOVerlayLocation:(NSDictionary *)dict
{
  MBPoint point = {[dict[@"longitude"] intValue],[dict[@"latitude"] intValue]};
  self.mapView.worldCenter = point;
  self.overlay.position = point;
  self.overlay.orientAngle  = [dict[@"direction"] floatValue];
  [self.overlay setImageFilePath:[NSString stringWithFormat:@"res/icons/%@.png",dict[@"imageName"]]];
}

#pragma mark 删除iconOverlay
- (void)removeIconOverlay:(NSArray *)annotations
{
  if(annotations.count == 0) {
    return;
  }
  for (NSDictionary *d in annotations) {
    NSPredicate *predict = [NSPredicate predicateWithFormat:@"(tag == %d)",[d[@"id"] intValue]];
    NSArray *anoArr = [self.mapView.overlays filteredArrayUsingPredicate:predict];
    [self.mapView removeOverlays:anoArr];
    [iconOverlayIds removeObject:[NSString stringWithFormat:@"%@",d[@"id"]]];
  }
  
}


#pragma mark  更新iconOverlay的图标
- (void)setIconOverlayIcon:(NSArray *)array
{
  for (NSDictionary *dict in array) {
    NSPredicate *predict = [NSPredicate predicateWithFormat:@"tag == %d",[dict[@"id"] intValue]];
    NSArray *anoArr = [self.mapView.overlays filteredArrayUsingPredicate:predict];
    MBIconOverlay *ano = anoArr[0];
    if(ano) {
      [ano setImageFilePath:[NSString stringWithFormat:@"res/icons/%@.png",dict[@"imageName"]]];
      [self.mapView drawView];
    }
    
  }
}


//画线
#pragma mark 划线
- (void)lineWithPoints:(NSDictionary *)dict
{
  NSArray *array = dict[@"locations"];
  MBPoint *points = (MBPoint *)malloc(sizeof(MBPoint) * array.count);
  MBPoint *tempPoints = points;
  for (int i = 0; i<array.count; i++) {
    (*tempPoints).x = [array[i][@"longitude"]intValue];
    (*tempPoints).y = [array[i][@"latitude"]intValue];
    tempPoints++;
  }
  
  self.polylineOverlay = [[MBPolylineOverlay alloc] initWithPoints:points count:array.count isClosed:NO];
  [self.polylineOverlay setWidth:[dict[@"width"] floatValue]];
  [self.polylineOverlay setStrokeStyle:MBStrokeStyle_solid];
  
  [self.polylineOverlay setOutlineUIColor:[UIColor colorWithHexString:dict[@"outlineColor"]]];
  [self.polylineOverlay setUIColor:[UIColor colorWithHexString:dict[@"strokeColor"]]];
  
  MBRect rect = [MBMapView getFitRect:points num:array.count];
  [self.mapView fitWorldArea:rect];
  [self.mapView addOverlay:self.polylineOverlay];
  [lineOverlays addObject:self.polylineOverlay];
  NSLog(@" 划线");
  free(points);
}


#pragma mark 移除线
- (void)removeLine
{
  if(lineOverlays.count > 0) {
    [self.mapView removeOverlays:lineOverlays];
    [lineOverlays removeAllObjects];
    
  }
}

#pragma mark 移除点
- (void)removeAnnotation:(NSArray *)annotations
{
  if(annotations.count == 0) {
    return;
  }
  for (NSDictionary *d in annotations) {
    NSPredicate *predict = [NSPredicate predicateWithFormat:@"(tag == %d)",[d[@"id"] intValue]];
    NSArray *anoArr = [self.mapView.annotations filteredArrayUsingPredicate:predict];
    [self.mapView removeAnnotations:anoArr];
    [ids removeObject:[NSString stringWithFormat:@"%@",d[@"id"]]];  //删除点的同时  删除点的id
  }
  
}
#pragma mark 删除所有覆盖物
- (void)removeAllOverlayAndAnnotation
{
  //删除覆盖物
  if(self.mapView.overlays.count > 0) {
    [self.mapView removeOverlays:self.mapView.overlays];
  }
  //删除marker
  if(self.mapView.annotations.count > 0) {
    [self.mapView removeAnnotations:self.mapView.annotations];
  }
}

#pragma mark 是否允许旋转
- (void)setRotationEnable:(BOOL)rotationEnable
{
  
}
#pragma mark  是否允许拖动

- (void)setDragEnable:(BOOL)dragEnable
{
  
}
#pragma mark  是否允许缩放
- (void)setZoomEnable:(BOOL)zoomEnabler
{
  
}

#pragma mark 设置地图缩放级别
- (void)setZoomLevel:(CGFloat)zoomLevel animated:(BOOL)animated
{
  [self.mapView setZoomLevel:zoomLevel animated:animated];
}

#pragma mark 更新地图中心点
- (void)setWorldCenter:(NSDictionary *)worldCenter
{
  MBPoint point = {[worldCenter[@"longitude"] intValue],[worldCenter[@"latitude"] intValue]};
  
  [self.mapView setWorldCenter:point animated:YES];
  
}

#pragma mark 定位
- (void)setShowUserLocation:(BOOL)showUserLocation resolve:(Success)resolve reject:(Failure)reject
{
  self.success = resolve;
  self.failure = reject;
  if(showUserLocation == YES) {
    [self.reverseGeocoder reverseByPoint:&_point];
  }
}

#pragma mark 停止定位
- (void)stopLocation
{
    [self.gpsLocation stopUpdatingLocation];
}

#pragma mark - MBGpsLocationDelegate
/**
 *  更新Gps信息
 */
-(void)didGpsInfoUpdated:(MBGpsInfo *)info{
  
  self.point = info.pos;
//  if(self.showUserLocation == YES) {
    [self setShowUserLocation:YES];
//  }
}

#pragma mark - MBReverseGeocodeDelegate
/**
 *  逆地理开始
 */
-(void)reverseGeocodeEventStart:(MBReverseGeocoder*) reverseGeocodeManager{
  //    [SVProgressHUD showWithStatus:@"正在定位中,请稍候..." maskType:SVProgressHUDMaskTypeBlack];
}
/**
 *  逆地理成功
 */
-(void)reverseGeocodeEventSucc:(MBReverseGeocodeObject*)rgObject{
  
  //    [SVProgressHUD showSuccessWithStatus:@"定位成功 !" maskType:SVProgressHUDMaskTypeBlack];
  
//  self.posName.text = [NSString stringWithFormat:@"%@%@%@%@",rgObject.poiCity,rgObject.poiArea,rgObject.poiAddress,rgObject.poiName];
  self.mapView.worldCenter = rgObject.pos;
//  CGPoint pivotPoint = {0.5, 0.5};
//  if (self.locationAnnotation !=nil) {
//    [self.mapView removeAnnotation:self.locationAnnotation];
//    self.locationAnnotation = nil;
//  }
//  self.locationAnnotation = [[MBAnnotation alloc] initWithZLevel:0 pos:rgObject.pos iconId:1200 pivot: pivotPoint];
//  [self.mapView addAnnotation:self.locationAnnotation];
//  MBCalloutStyle calloutStyle = self.locationAnnotation.calloutStyle;
//  calloutStyle.anchor.x = 0.5f;
//  calloutStyle.anchor.y = 0;
//  calloutStyle.leftIcon = 102;
//  calloutStyle.rightIcon = 1004;
//  self.locationAnnotation.calloutStyle = calloutStyle;
//  self.locationAnnotation.title = rgObject.poiName;
//  [self.locationAnnotation showCallout:YES];
  [self stopLocation];
  
  NSDictionary *location = @{@"latitude":@(rgObject.pos.y).stringValue,
                             @"longitude":@(rgObject.pos.x).stringValue,
                             @"address":rgObject.poiName};
  
  self.success(location);

  NSDictionary *map = @{
  @"latitude":@(rgObject.pos.y).stringValue,
  @"longitude":@(rgObject.pos.x).stringValue ,
  @"title": rgObject.poiName,
  @"subtile": @"",
  @"imageName": @"1200",
  @"iconText":@"",
  @"iconTextColor":@"FFFFFF",
  @"iconTextSize":@"18",
  @"id":@"0",
  @"direction":@"90",
  @"offsetX":@"0.5",
  @"offsetX":@"0.5",
  @"click":@"ture",
  @"callOut":@"ture"
  };
  
  NSArray *a = @[map];
  
  [self setAnnotations:a];

}
/**
 *  逆地理失败
 */
-(void)reverseGeocodeEventFailed:(MBReverseGeocodeError)err{

  self.failure([NSError errorWithDomain:@"定位失败" code:1002 userInfo:nil]);
}
/**
 *  逆地理取消
 */
-(void)reverseGeocodeEventCanceled{
  
}


#pragma mark - MBMapViewDelegate
-(void)mbMapView:(MBMapView *)mapView onAnnotationSelected:(MBAnnotation *)annot{
  [annot showCallout:YES];
  self.onAnnotationClick(@{@"tag":@(annot.tag).stringValue,@"longitude":@(annot.position.x).stringValue,@"latitude":@(annot.position.y).stringValue});
//  NSLog(@"annotation点击");
//  CGPoint pivotPoint = {0.5, 1};//设置气泡在点上的偏移量
//  [annot setIcon:1004 pivot:pivotPoint];
  
}

- (void)mbMapViewOnRotate:(MBMapView *)mapView
{
 self.onRotation(@{@"zoomLevel":@(mapView.zoomLevel),@"longitude":@(mapView.worldCenter.x),@"latitude":@(mapView.worldCenter.y)});
  NSLog(@"地图旋转");
}

- (void)mbMapView:(MBMapView *)mapView onOverlaySelected:(MBOverlay *)overlay grabbedPoint:(MBPoint)point
{
  self.onIconOverlayClick(@{@"tag":@(overlay.tag).stringValue,@"latitude":@(overlay.postion.y).stringValue,@"longitude":@(overlay.postion.x).stringValue});
}

- (void)mbMapView:(MBMapView *)mapView onOverlayDeselected:(MBOverlay *)overlay
{
  
}

/**
 *
 *  点击
 *  @param  mapView     当前地图
 *  @param  tapCount    点击的次数
 *  @param  pos         当前地图
 *  @return 空
 */

- (void)mbMapView:(MBMapView *)mapView onTapped:(NSInteger)tapCount pos:(MBPoint)pos
{
  NSLog(@"地图点击事件");
  self.onTap(@{@"zoomLevel":@(mapView.zoomLevel),@"longitude":@(mapView.worldCenter.x),@"latitude":@(mapView.worldCenter.y)});
}

- (void)mbMapView:(MBMapView *)mapView didPanStartPos:(MBPoint)pos
{
  NSLog(@"地图移动开始事件");
  self.onSpan(@{@"zoomLevel":@(mapView.zoomLevel),@"longitude":@(mapView.worldCenter.x),@"latitude":@(mapView.worldCenter.y)});


}
/**
 *  拖动结束回调
 *
 *  @param mapView 当前地图实例
 *  @param pos     最后一次点位
 *
 *  @since 5.0.x
 */
-(void)mbMapView:(MBMapView *)mapView didPanEndPos:(MBPoint)pos
{
  NSLog(@"地图移动结束事件");

}

- (void)mbMapView:(MBMapView *)mapView onTileLoadingFinished:(void*)unused
{
  NSLog(@"地图初始化完成事件");
}

- (NSInteger)test4
{
  NSLog(@"test4被调用");
  return 8;
}

@end
