module.exports = function (grunt) {
  'use strict';

  require('jit-grunt')(grunt, {
    buildcontrol: 'grunt-build-control',
    htmllint: 'grunt-html'
  });

  require('time-grunt')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      core: {
        options: {
          outputSourceFiles: true,
          sourceMap: true,
          sourceMapFilename: 'html/assets/app/css/style.css.map',
          sourceMapURL: 'style.css.map',
          strictMath: true
        },
        files: {
          'html/assets/app/css/style.css': 'less/style.less'
        }
      }
    },
    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')
        ]
      },
      core: {
        src: 'html/assets/app/css/*.css'
      }
    },
    csscomb: {
      options: {
        config: 'less/.csscomb.json'
      },
      core: {
        src: 'html/assets/app/css/style.css',
        dest: 'html/assets/app/css/style.css'
      }
    },
    csslint: {
      options: {
        csslintrc: 'less/.csslintrc'
      },
      core: {
        src: 'html/assets/app/css/style.css'
      }
    },
    cssmin: {
      options: {
        advanced: false,
        keepSpecialComments: '*',
        sourceMap: true
      },
      core: {
        expand: true,
        cwd: 'html/assets/app/css',
        src: ['*.css', '!*.min.css'],
        dest: 'html/assets/app/css',
        ext: '.min.css'
      }
    },
    eslint: {
      options: {
        configFile: 'js/.eslintrc'
      },
      target: 'js/*.js'
    },
    jscs: {
      options: {
        config: 'js/.jscsrc'
      },
      grunt: {
        src: 'Gruntfile.js'
      },
      core: {
        src: 'js/*.js'
      }
    },
    concat: {
      core: {
        src: [
          'js/main.js'
        ],
        dest: 'html/assets/app/js/application.js'
      }
    },
    uglify: {
      options: {
        compress: {
          warnings: false
        },
        preserveComments: 'some'
      },
      core: {
        src: '<%= concat.core.dest %>',
        dest: 'html/assets/app/js/application.min.js'
      }
    },
    copy: {
      assets: {
        expand: true,
        src: 'assets/**',
        dest: 'html'
      },
      packages: {
        files: [
          {
            expand: true,
            cwd: 'node_modules/jquery/dist',
            src: '*',
            dest: 'html/assets/vendor/jquery'
          },
          {
            expand: true,
            cwd: 'node_modules/jquery-validation/dist',
            src: '**',
            dest: 'html/assets/vendor/jquery-validation'
          },
          {
            expand: true,
            cwd: 'node_modules/jquery.scrollto',
            src: '*.js',
            dest: 'html/assets/vendor/jquery.scrollto'
          },
          {
            expand: true,
            cwd: 'node_modules/slick-carousel/slick',
            src: '*',
            dest: 'html/assets/vendor/slick'
          },
          {
            expand: true,
            cwd: 'node_modules/dotdotdot/src/js',
            src: '*',
            dest: 'html/assets/vendor/jquery.dotdotdot'
          }
        ]
      }
    },
    env: {
      build: {
        JEKYLL_ENV: grunt.option('environment') || 'development'
      }
    },
    jekyll: {
      options: {
        config: '_config.yml'
      },
      build: {},
      serve: {
        options: {
          incremental: true,
          serve: true
        }
      },
      watch: {
        options: {
          incremental: true,
          watch: true
        }
      }
    },
    htmllint: {
      src: 'dist/**/*.html'
    },
    _htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          minifyCSS: true,
          minifyJS: true,
          removeAttributeQuotes: true,
          removeComments: true
        },
        expand: true,
        cwd: 'dist',
        src: '**/*.html',
        dest: 'dist'
      }
    },
    _watch: {
      configFiles: {
        options: {
          reload: true
        },
        files: ['Gruntfile.js', 'package.json']
      },
      html: {
        files: 'dist/**/*.html',
        tasks: ['htmllint', 'htmlmin']
      },
      js: {
        files: 'js/*.js',
        tasks: 'js'
      },
      less: {
        files: 'less/**/*.less',
        tasks: 'css'
      }
    },
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      watch: ['_watch', 'jekyll:watch'],
      serve: ['_watch', 'jekyll:serve']
    },
    buildcontrol: {
      options: {
        commit: true,
        push: true
      },
      carconcierge: {
        options: {
          remote: 'ssh://carconci@sha17.tlh.ro:55555/home/carconci/public_html',
          branch: 'master'
        }
      }
    },
    clean: {
      options: {
        force: true
      },
      assets: 'html/assets',
      dist: 'dist'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.renameTask('htmlmin', '_htmlmin');

  grunt.registerTask('htmlmin', function () {
    // grunt.task.requires('env');

    if (process.env.JEKYLL_ENV === 'production') {
      grunt.task.run('_htmlmin');
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.renameTask('watch', '_watch');

  grunt.registerTask('watch', ['env', 'concurrent:watch']);
  grunt.registerTask('serve', ['env', 'concurrent:serve']);

  grunt.registerTask('assets', 'copy');
  grunt.registerTask('css', ['less', 'postcss', 'csscomb', 'csslint', 'cssmin']);
  grunt.registerTask('js', ['eslint', 'jscs', 'concat', 'uglify']);
  grunt.registerTask('html', ['jekyll:build', 'htmllint', 'htmlmin']);

  grunt.registerTask('build', ['env', 'assets', 'css', 'js', 'html']);
  grunt.registerTask('test', ['clean', 'build']);
  grunt.registerTask('deploy', 'buildcontrol');

  grunt.registerTask('default', 'build');
};
