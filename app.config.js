import "dotenv/config"
export default ({ config }) => ({
  ...config,
  "name": "Fresh Life",
  "slug": "fresh-life",
  "version": "1.0.0",
  "orientation": "portrait",
  "icon": "./assets/fresh-logo.png",
  "userInterfaceStyle": "light",
  "newArchEnabled": true,
  "scheme": process.env.EXPO_PUBLIC_PACKAGE,
  "ios": {
    "supportsTablet": true,
    "bundleIdentifier": process.env.EXPO_PUBLIC_PACKAGE
  },
  "android": {
    "adaptiveIcon": {
      "foregroundImage": "./assets/playstore-icon.png",
      "backgroundColor": "#ffffff"
    },
    "edgeToEdgeEnabled": true,
    "predictiveBackGestureEnabled": false,
    "package": process.env.EXPO_PUBLIC_PACKAGE
  },
  "web": {
    "favicon": "./assets/favicon.png"
  },
  "plugins": [
    [
      "@react-native-google-signin/google-signin",
      {
        "iosUrlScheme": process.env.APP_IOS_URL_SCHEME
      }
    ],
    "@react-native-community/datetimepicker",
    [
      "expo-splash-screen",
      {
        "backgroundColor": "#1C1C1E",
        "image": "./assets/playstore-icon.png",
        "resizeMode": "cover"
      }
    ]
  ],
  "extra": {
    "eas": {
      "projectId": "d64cab74-a93c-4106-8ccb-91eff2f0fc3e"
    }
  },
  "owner": "joong"
});