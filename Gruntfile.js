module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    /**
     * LESS tasks
     *
     * Configure LESS compile settings.
     */
    less: {

      /**
       * For development compile.
       */
      dev: {
        files: {
          'css/global.css': 'less/global.less'
        }
      },

      /**
       * For production compile.
       *
       * This task will minify CSS
       */
      pro: {
        options: {
          cleancss: true
        },
        files: {
          'css/global.css': 'less/global.less'
        }
      }
    },

    watch: {
      files: ['less/**/*.less'],
      tasks: ['less:dev']
    }
  });

  /* Load Grunt modules */
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  /* Register Tasks */
  grunt.registerTask('default', ['less:dev', 'watch']);

};
