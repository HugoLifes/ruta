/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import <React/RCTBridgeDelegate.h>
#import <UIKit/UIKit.h>
#import <GoogleMaps/GoogleMaps.h>
#import <GooglePlaces/GooglePlaces.h>
#import <GoogleSignIn/GoogleSignIn.h>
@import Firebase;
@import GoogleSignIn;
@import GoogleMaps;

@interface ViewController : UIViewController

@end


@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate, GIDSignInDelegate >
@property (strong, nonatomic) FIRDatabaseReference *ref;
@property (nonatomic, strong) UIWindow *window;
@end








