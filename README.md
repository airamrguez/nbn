# NBN App

![Alt text](screenshots/ios-panel.png?raw=true 'iOS Panel')
![Alt text](screenshots/ios-login.png?raw=true 'iOS Sign in')
![Alt text](screenshots/android.png?raw=true 'Android Panel')

First install the dependencies using running `yarn` on the root directory and link modules excecuting `yarn prepare`.

Run the app

```sh
yarn start
```

Then open an Android Emulator or plug-in a device and run:

```sh
react-native run-android
```

or open an iOS iPad simulator or device and run:

```sh
react-native run-ios
```

**IMPORTANT** If you want to install the app in a device you have to change the `API_ENDPOINT` on the `utils.js` file.

The _username_ is `nbn` and the _password_ is also `nbn`.
