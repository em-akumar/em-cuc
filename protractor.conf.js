exports.config = {
  allScriptsTimeout: 11000,
  onPrepare: function() {
    browser.driver.manage().window().maximize();
    browser.executeScript("document.body.style.zoom='100%';");
  },

  // ---------------------------------------------------------------------------
  // ----- What tests to run ---------------------------------------------------
  // ---------------------------------------------------------------------------

  // Spec patterns are relative to the location of this config.
  // specs: ['./src/cuc/controls/date-picker/test/date-picker.ftest.js'],
  //specs: ['./src/cuc/controls/**/*.ftest.js'],

  // Patterns to exclude.
  exclude: [],

  // Alternatively, suites may be used. When run without a command line
  // parameter, all suites will run. If run with --suite=smoke or
  // --suite=smoke,full only the patterns matched by the specified suites will
  // run.
  suites: {
    functionaltests: './src/cuc/controls/date-picker/test/date-picker.ftest.js',
    uitests: './test/cuc.vtest.js',
    unittests: './test/cuc.utest.js'
  },

  resultJsonOutputFile: 'reports/testresults/testresults.log',

  capabilities: {
    'browserName': 'chrome'
  },

//  baseUrl: 'http://cp1tfsbuild5/controls/',
  baseUrl: 'http://localhost:9000',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  framework: 'mocha',

  mochaOpts: {
    // defaultTimeoutInterval: 30000,
    timeout: 30000
  }
};
