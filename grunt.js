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
        corejs: {
            files: ['lib/js_core/**/*.js']
        },
        appjs: {
            files: ['lib/js/**/*.js']
        },
        appcss: {
            files: ['lib/css/**/*.css']
        },
        concat: {
            js: {
                src: ['<banner:meta.banner>', '<config:corejs.files>', '<config:appjs.files>'],
                dest: 'public/js/app.js'
            },
            css: {
                src: ['<config:appcss.files>'],
                dest: 'public/css/app.css'
            }
        },
        lint: {
            files: ['<config:app.files>']
        },
        watch: {
            js: {
                files: '<config:appjs.files>',
                tasks: 'concat:js'
            },
            css: {
                files: '<config:appcss.files>',
                tasks: 'concat:css'
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
    
    grunt.registerTask('server', 'Run webserver', function () {
        require('./server.js');
    });

    // Default task.
    grunt.registerTask('default', 'concat server watch');
};



