/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"
#import "ViewController.h"
#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <Firebase.h>
#import <GoogleSignIn/GoogleSignIn.h>
#import <GoogleMaps/GoogleMaps.h>
#import <GooglePlaces/GooglePlaces.h>
@import Firebase;
@import GoogleSignIn;
@import GoogleMaps;
@import GooglePlaces;
@interface ViewController ()

@end
@implementation ViewController

- (void)viewDidLoad {
  [super viewDidLoad];
  
  GMSCameraPosition *camera = [GMSCameraPosition cameraWithLatitude:-33.86
                                                          longitude:151.20
                                                               zoom:6];
  GMSMapView *mapView = [GMSMapView mapWithFrame:CGRectZero camera:camera];
  mapView.myLocationEnabled = YES;
  self.view = mapView;
  
  // Creates a marker in the center of the map.
  GMSMarker *marker = [[GMSMarker alloc] init];
  marker.position = CLLocationCoordinate2DMake(-33.86, 151.20);
  marker.title = @"Sydney";
  marker.snippet = @"Australia";
  marker.map = mapView;
  
}

@end

@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"MiRuta"
                                            initialProperties:nil];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  [GMSServices provideAPIKey:@"AIzaSyA05BwCoHwqVBQgWzNPlJ5OhhOfeAcaz8M"];
  [GMSPlacesClient provideAPIKey:@"AIzaSyA05BwCoHwqVBQgWzNPlJ5OhhOfeAcaz8M"];
  [FIRApp configure];
  [GIDSignIn sharedInstance].clientID = [FIRApp defaultApp].options.clientID;
  [GIDSignIn sharedInstance].delegate = self;
  self.ref = [[FIRDatabase database] reference];
  return YES;
}

//application:openURL:sourceApplication:annotation ios 8<
- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation {
  return [[GIDSignIn sharedInstance] handleURL:url
                             sourceApplication:sourceApplication
                                    annotation:annotation];
}
//application:openURL:options:
- (BOOL)application:(nonnull UIApplication *)application
            openURL:(nonnull NSURL *)url
            options:(nonnull NSDictionary<NSString *, id> *)options {
  return [[GIDSignIn sharedInstance] handleURL:url
                             sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
                                    annotation:options[UIApplicationOpenURLOptionsAnnotationKey]];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}



- (void)signIn:(GIDSignIn *)signIn didSignInForUser:(GIDGoogleUser *)user withError:(NSError *)error {
  
  if (error == nil) {
    GIDAuthentication *authentication = user.authentication;
    FIRAuthCredential *credential =
    [FIRGoogleAuthProvider credentialWithIDToken:authentication.idToken
                                     accessToken:authentication.accessToken];
    [[FIRAuth auth] signInAndRetrieveDataWithCredential:credential
    completion:^(FIRAuthDataResult * _Nullable authResult,
                      NSError * _Nullable error) {
                          if (error) {
                        // ...
                          return;
                          }
                          // User successfully signed in. Get user data from the FIRUser object
                          if (authResult == nil) { return; }
                            FIRUser *user = authResult.user;
                                               }];
    // ...
  } else {
    // ...
  }

}

@end
