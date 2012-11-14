/*global phantom, require, window, console, setInterval */

var args = phantom.args;
var page = require('webpage').create();

page.open('./public/testpage.html', function (status) {
    "use strict";

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
        var timeout = parseInt(args[1] || 60000, 10),
            start = Date.now(),
            interval = setInterval(function () {
                var module = '',
                    test = '',
                    assertion = '',
                    qunitStatus = page.evaluate(function () {
                        return window.qunitStatus;
                    });

                if (Date.now() > start + timeout) {
                    phantom.exit(124);
                } else {
                    if (qunitStatus.done) {
                        if (qunitStatus.failed) {
                            console.log('FAILURE');
                            console.log('');
                            for (module in qunitStatus.failedTests) {
                                if (qunitStatus.failedTests.hasOwnProperty(module)) {
                                    console.log('  MODULE: ' + module);
                                    for (test in qunitStatus.failedTests[module]) {
                                        if (qunitStatus.failedTests[module].hasOwnProperty(test)) {
                                            console.log('    TEST: ' + test);
                                            for (assertion in qunitStatus.failedTests[module][test]) {
                                                if (qunitStatus.failedTests[module][test].hasOwnProperty(assertion)) {
                                                    console.log('      ASSERT: ' + qunitStatus.failedTests[module][test][assertion]);
                                                }
                                            }
                                        }
                                    }
                                    console.log('');
                                }
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



