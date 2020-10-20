module.exports = function (grunt) {

  const sass = require('node-sass');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    src_dir: "./src",
    dist_dir: "./dist",
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: ['<%= src_dir %>/*.js']
    },
    sass: { // Task
      options: {
        implementation: sass,
        sourceMap: true
      },
      main: {
        files: { // Dictionary of files
          '<%= src_dir %>/style.css': '<%= src_dir %>/scss/style.scss', // 'destination': 'source
        }
      }
    },
    watch: {
      js: {
        files: ['<%= src_dir %>/*.js'],
        tasks: ['build_js'],
        options: {
          spawn: false,
          livereload: true
        },
      },
      sass: {
        files: ['<%= src_dir %>/scss/*.scss', '<%= src_dir %>/scss/*.sass'],
        tasks: ['build_sass'],
        options: {
          spawn: false,
          livereload: true
        },
      },
      other: {
        files: ['<%= src_dir %>/*.html'],
        tasks: ['build_other'],
        options: {
          spawn: false,
          livereload: true
        },
      },
    },
    availabletasks: { // task
      tasks: {} // target
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-available-tasks');
  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('build_js', ['jshint']);
  grunt.registerTask('build_sass', ['sass']);
  grunt.registerTask('build_other', []);
  grunt.registerTask('build', ['build_js', 'build_other', 'build_sass']);

  // Default task(s).
  grunt.registerTask('default', ['availabletasks']);

};