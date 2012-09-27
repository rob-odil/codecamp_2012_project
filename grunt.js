module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: '<json:package.json>',
        meta: {
            banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
                ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
        },
        ember_handlebars: {
            all: {
                src: 'lib/tmpl/*.hbs',
                dest: 'lib/tmpl_compiled'
            }
        },
        qunit: {
            all: ['http://localhost:8081/testpage.html']
        },
        coretmpl: {
            files: 'lib/tmpl/*.hbs'
        },
        corejs: {
            files: ['lib/js_core/front/*.js']
        },
        testjs: {
            files: ['lib/js_core/test/*.js']
        },
        appjs: {
            files: [
                'lib/js/init.js',
                'lib/js/app.js',
                'lib/js/controllers/*.js',
                'lib/js/models/*.js',
                'lib/js/views/*.js', 
                'lib/js/router.js'
                ]
        },
        appcss: {
            files: ['lib/css/front/*.css']
        },
        testcss: {
            files: ['lib/css/test/*.css']
        },
        concat: {
            appjs: {
                src: ['<banner:meta.banner>', 'lib/tmpl_compiled/*.js', '<config:appjs.files>', 'lib/js/run.js'],
                dest: 'public/js/app.js'
            },
            corejs: {
                src: ['<banner:meta.banner>', '<config:corejs.files>'],
                dest: 'public/js/core.js'
            },
            testjs: {
                src: ['<banner:meta.banner>', 'lib/tmpl_compiled/*.js', '<config:appjs.files>', '<config:testjs.files>', 'lib/js/tests/*.js'],
                dest: 'public/js/test.js'
            },
            appcss: {
                src: ['<config:appcss.files>'],
                dest: 'public/css/app.css'
            },
            testcss: {
                src: ['<config:testcss.files>'],
                dest: 'public/css/test.css'
            }
        },
        lint: {
            files: ['<config:app.files>']
        },
        watch: {
            tmpl: {
                files: '<config:coretmpl.files>',
                tasks: 'ember_handlebars'
            },
            js: {
                files: ['<config:appjs.files>', '<config:coretmpl.files>', 'lib/js/run.js'],
                tasks: ['concat:appjs', 'qunit']
            },
            test: {
                files: 'lib/js/tests/*.js',
                tasks: ['concat:testjs', 'qunit']
            },
            css: {
                files: '<config:appcss.files>',
                tasks: 'concat:appcss'
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                node: true
            },
            globals: {
                exports: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-ember-handlebars');
    
    grunt.registerTask('server', 'Run webserver', function () {
        require('./server.js');
    });

    // Default task.
    grunt.registerTask('default', 'ember_handlebars concat server watch');
};



