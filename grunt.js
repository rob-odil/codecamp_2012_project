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
        coretmpl: {
            files: 'lib/tmpl/*.hbs'
        },
        corejs: {
            files: ['lib/js_core/**/*.js']
        },
        appjs: {
            files: [
                'lib/js/init.js',
                'lib/js/app.js',
                'lib/js/controllers/*.js',
                'lib/js/models/*.js',
                'lib/js/views/*.js', 
                'lib/js/router.js',
                'lib/js/run.js']
        },
        appcss: {
            files: ['lib/css/**/*.css']
        },
        concat: {
            appjs: {
                src: ['<banner:meta.banner>', 'lib/tmpl_compiled/*.js', '<config:appjs.files>'],
                dest: 'public/js/app.js'
            },
            corejs: {
                src: ['<banner:meta.banner>', '<config:corejs.files>'],
                dest: 'public/js/core.js'
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
            tmpl: {
                files: '<config:coretmpl.files>',
                tasks: 'ember_handlebars'
            },
            js: {
                files: ['<config:appjs.files>', '<config:coretmpl.files>'],
                tasks: 'concat:appjs'
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

    grunt.loadNpmTasks('grunt-ember-handlebars');
    
    grunt.registerTask('server', 'Run webserver', function () {
        require('./server.js');
    });

    // Default task.
    grunt.registerTask('default', 'ember_handlebars concat server watch');
};



