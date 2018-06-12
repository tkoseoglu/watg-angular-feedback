/**
 * Created by Kemal on 07/30/15.
 */
module.exports = function (grunt) {
   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      connect: {
         dev: {
            options: {
               port: 9023,
               livereload: true,
               debug: true,
               target: 'http://localhost:9023/index.html', // target url to open
               open: true
            }
         },
         test: {
            options: {
               port: 9023,
               keepalive: false
            }
         }
      },
      ngconstant: {
         options: {
            space: " ",
            dest: "src/app/core/app.const.js",
            name: "watgFeedbackModule.const"
         },
         dev: {
            constants: {
               "CONST_WATGXRESTAPIURL": "http://localhost:6349/api",
               "CONST_RESOURCEURL": "http://localhost:52067",
               "CONST_LOGSENABLED": true,
               "CONST_FEEDBACK_TEMPLATE_URL": "src/app/directives/templates/watgFeedbackTemplate.html"
            }
         },
         dist: {
            constants: {
               "CONST_WATGXRESTAPIURL": "http://itworks.watg.com/watgApi/api",
               "CONST_RESOURCEURL": "http://resources.watg.com",
               "CONST_LOGSENABLED": false,
               "CONST_FEEDBACK_TEMPLATE_URL": "app/directives/templates/watgFeedbackTemplate.html"
            }
         }
      },
      jshint: {
         beforeconcat: ["gruntfile.js", "app/**/*.js"]
      },
      concat: {
         dev: {
            src: ['src/app/app.js',
               'src/app/core/app.const.js',
               'src/app/core/app.config.js',
               'src/app/tests/watgFeedbackTestController.js',
               'src/app/directives/watgFeedbackDirective.js',
               'src/app/services/watgFeedbackService.js'
            ],
            dest: 'dev/js/watg-angular-feedback.js'
         },
         dist: {
            src: ['src/app/appdist.js',
               'src/app/core/app.const.js',
               'src/app/directives/watgFeedbackDirective.js',
               'src/app/services/watgFeedbackService.js'
            ],
            dest: 'dist/js/watg-angular-feedback.js'
         },
         vendor: {
            src: [
               'bower_components/jquery/jquery.min.js',
               'bower_components/bootstrap/dist/js/bootstrap.min.js',
               'bower_components/angular/angular.min.js',
               'bower_components/angular-sanitize/angular-sanitize.min.js',
               'bower_components/angular-animate/angular-animate.min.js',
               'bower_components/angular-route/angular-route.min.js',
               'bower_components/watg-angular-fileupload/dist/js/watg-angular-fileupload.js',
               'bower_components/watg-angular-fileupload/dist/js/watg-angular-fileupload.tpl.js',

               "bower_components/froala-wysiwyg-editor/js/froala_editor.min.js",
               "bower_components/angular-froala/src/angular-froala.js",
               "bower_components/froala-wysiwyg-editor/js/plugins/**.min.js"
            ],
            dest: 'dev/js/vendor.min.js'
         }
      },
      uglify: {
         options: {
            banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
            mangle: false
         },
         dev: {
            files: {
               'dev/js/watg-angular-feedback.min.js': ['dev/js/watg-angular-feedback.js']
            }
         },
         dist: {
            files: {
               'dist/js/watg-angular-feedback.min.js': ['dist/js/watg-angular-feedback.js']
            }
         }
      },
      concat_css: {
         dev: {
            src: ["src/assets/watg-angular-feedback.css"],
            dest: "dev/css/watg-angular-feedback.css"
         },
         dist: {
            src: ["src/assets/watg-angular-feedback.css"],
            dest: "dist/css/watg-angular-feedback.css"
         }
      },
      cssmin: {
         options: {
            keepSpecialComments: 0
         },
         dev: {
            files: {
               'dev/css/watg-angular-feedback.min.css': ['dev/css/watg-angular-feedback.css']
            }
         },
         dist: {
            files: {
               'dist/css/watg-angular-feedback.min.css': ['dist/css/watg-angular-feedback.css']
            }
         },
         vendor: {
            files: {
               'dev/css/vendor.min.css': [
                  'bower_components/bootstrap/dist/css/bootstrap.css',
                  'bower_components/fontawesome/css/font-awesome.css',
                  "bower_components/froala-wysiwyg-editor/css/froala_editor.min.css",
                  "bower_components/froala-wysiwyg-editor/css/froala_style.min.css",
                  "bower_components/froala-wysiwyg-editor/css/plugins/**.min.css"
               ]
            }
         }
      },
      watch: {
         appJs: {
            files: ["app.js", "app/**/*.js"],
            tasks: ["jshint", "concat", "uglify"]
         },
         appHtml: {
            files: ["app/**/*.html", "default.html"]
         },
         appLess: {
            files: ["assets/styles/**/*.less"],
            tasks: ["concat_css:dev", "less", "cssmin:assets"]
         },
         options: {
            livereload: 35729
         }
      },
      copy: {
         main: {
            files: [{
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
            module: 'watgFeedbackModule.templates',
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
            src: ['src/app/directives/templates/*.html'],
            dest: 'dist/js/watg-angular-feedback.tpl.js'
         }
      }
   });
   grunt.loadNpmTasks('grunt-ng-constant');
   grunt.loadNpmTasks('grunt-contrib-connect');
   grunt.loadNpmTasks("grunt-contrib-jshint");
   grunt.loadNpmTasks('grunt-concat-css');
   grunt.loadNpmTasks('grunt-html2js');
   grunt.loadNpmTasks('grunt-contrib-concat');
   grunt.loadNpmTasks('grunt-contrib-copy');
   grunt.loadNpmTasks('grunt-contrib-cssmin');
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.registerTask('dev', ["jshint", 'ngconstant:dev', 'concat', 'uglify:dev', 'concat_css:dev', 'cssmin', 'copy', 'connect:dev', 'watch']); //, 'watch'
   grunt.registerTask('dist', ["jshint", 'ngconstant:dist', 'concat:dist', 'uglify:dist', 'concat_css:dist', 'cssmin:dist', 'copy', 'html2js']);
};