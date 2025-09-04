const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

let config = getDefaultConfig(__dirname);

// Add `.db` to asset extensions
config.resolver.assetExts.push("db");

config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== "svg");
config.resolver.sourceExts = [...config.resolver.sourceExts, "svg"];
config.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer/expo");

// Wrap with NativeWind and Reanimated
config = withNativeWind(config, { input: './app/globals.css' });
config = wrapWithReanimatedMetroConfig(config);

module.exports = config;