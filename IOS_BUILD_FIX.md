# iOS Build Fix for Appflow

## Issues Fixed

1. **Provisioning Profile Error**: The project was configured for automatic code signing but the build was using ad-hoc distribution which requires manual provisioning profiles.

2. **Bundle Identifier Mismatch**: The bundle identifier in the Xcode project didn't match the one in `capacitor.config.ts`.

3. **Build Script Warning**: The CocoaPods embed script didn't specify outputs, causing it to run on every build.

## Changes Made

### 1. Fixed Bundle Identifier
- Changed from `me.wcaleniewolny.io.ionic.starter.capgo.app.login.3` to `anardoni.export`
- Now matches the `appId` in `capacitor.config.ts`

### 2. Updated Code Signing Configuration
- Changed from `Automatic` to `Manual` code signing
- Changed from `Apple Development` to `iPhone Distribution` identity
- This is required for ad-hoc distribution builds

### 3. Fixed Build Script Warning
- Added output path to the `[CP] Embed Pods Frameworks` script
- Prevents unnecessary script execution on every build

### 4. Created Export Options
- Added `ExportOptions.plist` for ad-hoc distribution
- Configured with proper team ID and bundle identifier

## For Appflow Builds

### Option 1: Use Automatic Code Signing (Recommended)
If you want to use automatic code signing in Appflow:

1. In your Appflow build settings, ensure:
   - **Code Signing**: Set to "Automatic"
   - **Team ID**: `UVTJ336J2D`
   - **Bundle Identifier**: `anardoni.export`

2. Revert the code signing changes in the project:
   ```bash
   # Change back to automatic code signing
   CODE_SIGN_STYLE = Automatic
   CODE_SIGN_IDENTITY = "Apple Development"
   ```

### Option 2: Use Manual Code Signing (Current Setup)
If you want to use manual code signing:

1. Ensure your Apple Developer account has:
   - Ad-hoc provisioning profile for `anardoni.export`
   - Distribution certificate
   - Team ID `UVTJ336J2D`

2. In Appflow build settings:
   - **Code Signing**: Set to "Manual"
   - **Provisioning Profile**: Select the ad-hoc profile for `anardoni.export`
   - **Certificate**: Select "iPhone Distribution"

## Testing the Fix

1. **Sync the project**:
   ```bash
   npx cap sync ios
   ```

2. **Test locally**:
   ```bash
   npx cap open ios
   ```

3. **Build with Fastlane** (if using manual signing):
   ```bash
   fastlane ios build_adhoc
   ```

## Files Modified

- `ios/App/App.xcodeproj/project.pbxproj` - Updated bundle identifier and code signing
- `ios/App/ExportOptions.plist` - Added export options for ad-hoc distribution
- `fastlane/Fastfile` - Added build lanes
- `appflow.yml` - Added Appflow configuration

## Next Steps

1. **Commit and push** these changes to your repository
2. **Trigger a new Appflow build** to test the fixes
3. **Monitor the build logs** for any remaining issues
4. **If issues persist**, check the Appflow build settings and ensure they match the project configuration

## Troubleshooting

If you still get provisioning profile errors:

1. **Check Appflow build settings** match the project configuration
2. **Verify your Apple Developer account** has the correct certificates and profiles
3. **Ensure the bundle identifier** is registered in your Apple Developer account
4. **Check that your team ID** is correct and has the necessary permissions 