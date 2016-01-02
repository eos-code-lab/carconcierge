module.exports = function (grunt) {
  'use strict';

  require('jit-grunt')(grunt);
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
        }
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
        cwd: 'dist/assets/app/css',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/assets/app/css',
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
          'js/application.js'
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
          serve: true
        }
      },
      watch: {
        options: {
          watch: true
        }
      }
    },
    htmllint: {
      src: 'dist/**/*.html'
    }
  });
};
