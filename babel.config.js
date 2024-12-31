module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel', // Make sure 'nativewind' is present
      'react-native-reanimated/plugin' // Should usually be the last one
    ],
  };
};