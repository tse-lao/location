module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["expo-router/babel", 
    
  ],
    overrides: [
      {
        test: ["./node_modules/ethers/**"],
        plugins: [["@babel/plugin-transform-private-methods", { loose: true }]],
      },
    ],
  };
};
