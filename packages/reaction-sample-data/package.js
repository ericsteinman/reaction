Package.describe({
  summary: "Reaction Commerce Sample Data",
  name: "reactioncommerce:reaction-sample-data",
  version: "0.1.0",
  git: "https://github.com/reactioncommerce/reaction-sample-data.git"
});

Package.onUse(function (api) {
  api.versionsFrom("METEOR@1.2.1");

  // reaction core
  api.use("reactioncommerce:core");
  api.use("reactioncommerce:reaction-shipping");

  // load fixture data
  api.addFiles("server/load.js", "server");

  // Private fixture data
  api.addAssets("private/data/Products.json", "server");
  api.addAssets("private/data/Shipping.json", "server");
  api.addAssets("private/data/Shops.json", "server");
  api.addAssets("private/data/Tags.json", "server");
});

Package.onTest(function (api) {});
