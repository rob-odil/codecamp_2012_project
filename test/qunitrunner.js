var args = phantom.args;
var page = require('webpage').create();

page.open('file:///Users/rodil/projects/codecamp_2012_project/public/testpage.html', function (status) {

  // Duel won't load from phantomjs... This adds a mock of duel that doesn't do anything. DON'T TEST DUEL ELEMENTS!!!!
  page.evaluate(function () {
    window.require = function () {
      return {
        then: function () {}
      };
    };
  });
  if (status !== 'success') {
    console.error("Unable to access network");
    phantom.exit(1);
  } else {
    page.evaluate(function () {
        window.qunitStatus = {
            done: false,
            failed: false
        };
    });
    var timeout = parseInt(args[1] || 60000, 10);
    var start = Date.now();
    var interval = setInterval(function() {
      if (Date.now() > start + timeout) {
        phantom.exit(124);
      } else {
        
        var qunitStatus = page.evaluate(function() {
          return window.qunitStatus;
        });

        if (qunitStatus.done) {
          
          
          
          if (qunitStatus.failed) {
            console.log('FAILURE');
            console.log('');
            for(var module in qunitStatus.failedTests) {
                console.log('  MODULE: ' + module);
                for(var test in qunitStatus.failedTests[module]) {
                    console.log('    TEST: ' + test);
                    for(var assertion in qunitStatus.failedTests[module][test]) {
                        console.log('      ASSERT: ' + qunitStatus.failedTests[module][test][assertion]);
                    }
                }
                console.log('');
            }
            console.log('STATUS: ' + qunitStatus.stats);
            console.log('');
            phantom.exit(1);
          } else {
            console.log('SUCCESS');
            console.log('');
            console.log(qunitStatus.stats);
            console.log('');
            phantom.exit();
          }
        }
      }
    }, 500);
  }
});
