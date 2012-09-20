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
        handlebars: {
            all: {
                src: 'lib/tmpl',
                dest: 'lib/tmpl_compiled/templates.js'
            }
        },
        coretmpl: {
            files: 'lib/tmpl/*.handlebars'
        },
        corejs: {
            files: ['lib/js_core/**/*.js']
        },
        appjs: {
            files: ['lib/js/init.js', 'lib/js/models/*.js', 'lib/js/controllers/*.js', 'lib/js/views/*.js', 'lib/js/app.js', 'lib/js/run.js']
        },
        appcss: {
            files: ['lib/css/**/*.css']
        },
        concat: {
            js: {
                src: ['<banner:meta.banner>', '<config:corejs.files>', 'lib/tmpl_compiled/templates.js', '<config:appjs.files>'],
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
            tmpl: {
                files: '<config:coretmpl.files>',
                tasks: 'handlebars'
            },
            js: {
                files: ['<config:appjs.files>', '<config:coretmpl.files>'],
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

    grunt.loadNpmTasks('grunt-handlebars');
    
    grunt.registerTask('server', 'Run webserver', function () {
        require('./server.js');
    });

    // Default task.
    grunt.registerTask('default', 'handlebars concat server watch');
};



