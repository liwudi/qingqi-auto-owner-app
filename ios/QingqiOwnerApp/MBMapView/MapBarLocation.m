//
//  MapBarLocation.m
//  MBMapView
//
//  Created by nav on 16/11/1.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "MapBarLocation.h"
#import <iNaviCore/MBGpsLocation.h>
#import <iNaviCore/MBPoiQuery.h>
#import <iNaviCore/MBReverseGeocoder.h>
#import <iNaviCore/MBAnnotation.h>
#import <iNaviCore/MBMapView.h>
#import <iNaviCore/MBPoiQueryParams.h>
#import <iNaviCore/MBGpsInfo.h>
#import <iNaviCore/MBReverseGeocodeObject.h>
#import "ErrorMsg.h"


@interface MapBarLocation()<MBGpsLocationDelegate,MBReverseGeocodeDelegate>
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

@property (nonatomic ,strong) MBMapView *mapView;

@end

@implementation MapBarLocation
RCT_EXPORT_MODULE(MapBarLocation);
@synthesize bridge = _bridge;

- (void)config
{
    // 2. 判断授权
    if (self.mapView.authErrorType == MBSdkAuthError_none) {
     
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
  
}

RCT_EXPORT_METHOD(startUpdatingLocation)
{
  [self config];
}

RCT_EXPORT_METHOD(stopUpdatingLocation)
{
  [self stopLocation];
}

#pragma mark 定位
- (void)setShowUserLocation:(BOOL)showUserLocation
{
  if(showUserLocation == YES) {
    [self.gpsLocation startUpdatingLocation];
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
//  self.mapView.worldCenter = rgObject.pos;
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
}
/**
 *  逆地理失败
 */
-(void)reverseGeocodeEventFailed:(MBReverseGeocodeError)err{
  //    [SVProgressHUD showErrorWithStatus:@"定位失败 !" maskType:SVProgressHUDMaskTypeBlack];
}
/**
 *  逆地理取消
 */
-(void)reverseGeocodeEventCanceled{
  
}




@end
