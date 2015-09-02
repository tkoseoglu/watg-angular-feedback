/**
 * Created by Kemal on 07/30/15.
 */
/*
 * CONCAT APP JS
 * CONCAT ASSET CSS
 * CONCAT VENDOR JS
 * CONCAT VENDOR CSS
 * WATCH APP JS
 * WATCH ASSET CSS
 * COPY ICONS
 * COPY FONTS
 * CONDITIONAL GRUNT DEV VS PROD
 *
 * NICE TO HAVS
 * NOT HAVING TO EXPLICTLY INCLUDE VENDOR .JS OR .CSS
 *
 * NPM, bower, grunt
 *
 */


module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            appdist: {
                src: ['src/app/appdist.js',
                    'src/app/directives/watgFeedbackDirective.js',
                    'src/app/directives/watgFeedbackFileSelectDirective.js',
                    'src/app/services/watgFeedbackService.js'],
                dest: 'dist/js/watg-angular-feedback.js'
            },
            app: {
                src: ['src/app/app.js',
                    'src/app/controllers/watgFeedbackTestController.js',
                    'src/app/directives/watgFeedbackDirective.js',
                    'src/app/directives/watgFeedbackFileSelectDirective.js',
                    'src/app/services/watgFeedbackService.js'],
                dest: 'dev/js/watg-angular-feedback.js'
            },
            vendor: {
                src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'bower_components/angular/angular.min.js',
                    'bower_components/angular-sanitize/angular-sanitize.min.js',
                    'bower_components/angular-route/angular-route.min.js',
                    'bower_components/watg-angular-richtext/dist/js/watg-angular-richtext.min.js',
                    'bower_components/watg-angular-richtext/dist/js/watg-angular-richtext.tpl.js'
                ],
                dest: 'dev/js/vendor.min.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                mangle: false
            },
            app: {
                files: {
                    'dev/js/watg-angular-feedback.min.js': ['dev/js/watg-angular-feedback.js']
                }
            },
            appdist: {
                files: {
                    'dist/js/watg-angular-feedback.min.js': ['dist/js/watg-angular-feedback.js']
                }
            }
        },
        concat_css: {
            assets: {
                src: ["src/assets/watg-angular-feedback.css"],
                dest: "dev/css/watg-angular-feedback.css"
            },
            assetsdist: {
                src: ["src/assets/watg-angular-feedback.css"],
                dest: "dist/css/watg-angular-feedback.css"
            }
        },
        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            assets: {
                files: {
                    'dev/css/watg-angular-feedback.min.css': ['dev/css/watg-angular-feedback.css']
                }
            },
            assetsdist: {
                files: {
                    'dist/css/watg-angular-feedback.min.css': ['dist/css/watg-angular-feedback.css']
                }
            },
            vendor: {
                files: {
                    'dev/css/vendor.min.css': [
                        'bower_components/bootstrap/dist/css/bootstrap.css',
                        'bower_components/fontawesome/css/font-awesome.css',
                        'bower_components/watg-angular-richtext/dist/css/watg-angular-richtext.min.css'
                    ]
                }
            }
        },
        watch: {
            files: ['src/app/**/*.js', 'src/assets/*.css'],
            tasks: ['concat:app', 'concat:appdist', 'uglify', 'concat_css', 'cssmin:assets', 'cssmin:assetsdist']
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        src: ['bower_components/fontawesome/fonts/*', 'bower_components/bootstrap/fonts/*'],
                        dest: 'dev/fonts/',
                        filter: 'isFile',
                        flatten: true
                    },
                    {
                        expand: true,
                        src: ['bower_components/footable/css/fonts/*'],
                        dest: 'dev/css/fonts/',
                        filter: 'isFile',
                        flatten: true
                    }
                ]
            }
        },
        html2js: {
            options: {
                base: 'src',
                module: 'watgFeedback.templates',
                singleModule: true,
                useStrict: true,
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                }
            },
            main: {
                src: ['src/app/templates/*.html'],
                dest: 'dist/js/watg-angular-feedback.tpl.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['concat', 'uglify', 'concat_css', 'cssmin', 'copy', 'watch']);
    grunt.registerTask('dist', ['concat:appdist', 'uglify:appdist', 'concat_css:assetsdist', 'cssmin:assetsdist', 'html2js']);


};