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
            app: {
                src: ['src/app/**/*.js'],
                dest: 'dist/js/watg-angular-feedback.js'
            },
            vendor: {
                src: [
                    'bower_components/jquery/dist/jquery.min.js',
                    'bower_components/bootstrap/dist/js/bootstrap.min.js',
                    'bower_components/moment/min/moment.min.js',
                    'bower_components/angular/angular.min.js',
                    'bower_components/angular-sanitize/angular-sanitize.min.js',
                    'bower_components/angular-route/angular-route.min.js',
                    'bower_components/angular-animate/angular-animate.min.js'
                ],
                dest: 'dist/js/vendor.min.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                mangle: false
            },
            app: {
                files: {
                    'dist/js/watg-angular-feedback.min.js': ['dist/js/watg-angular-feedback.js']
                }
            }
        },
        concat_css: {
            assets: {
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
                    'dist/css/watg-angular-feedback.min.css': ['dist/css/watg-angular-feedback.css']
                }
            },
            vendor: {
                files: {
                    'dist/css/vendor.min.css': [
                        'bower_components/bootstrap/dist/css/bootstrap.css',
                        'bower_components/fontawesome/css/font-awesome.css'
                    ]
                }
            }
        },
        watch: {
            files: ['src/app/**/*.js', 'src/assets/*.css'],
            tasks: ['concat', 'uglify', 'concat_css', 'cssmin']
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        src: ['bower_components/fontawesome/fonts/*', 'bower_components/bootstrap/fonts/*'],
                        dest: 'dist/fonts/',
                        filter: 'isFile',
                        flatten: true
                    },
                    {
                        expand: true,
                        src: ['bower_components/footable/css/fonts/*'],
                        dest: 'dist/css/fonts/',
                        filter: 'isFile',
                        flatten: true
                    },
                    {
                        expand: true,
                        src: ['bower_components/fuelux/dist/fonts/*'],
                        dest: 'dist/css/fonts/',
                        filter: 'isFile',
                        flatten: true
                    },
                    {
                        expand: true,
                        src: ['content/images/*', 'bower_components/jquery-ui/themes/base/images/*'],
                        dest: 'dist/css/images/',
                        filter: 'isFile',
                        flatten: true
                    }
                ]
            },
        },
        html2js: {
            options: {
                // custom options, see below
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

    grunt.registerTask('default', ['concat', 'uglify', 'concat_css', 'cssmin', 'copy', 'html2js']);

    //grunt.registerTask('prod', ['uglify']);
    //grunt.registerTask('dev', ['watch']);

};