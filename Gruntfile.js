module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      files: ['src/**'],
      tasks: ['default'],
    },
    copy: {
      dist: {
        cwd: 'src/', expand: true, src: '**', dest: 'dist/'
      }
    },
    // Remove unused CSS across multiple files, compressing the final output
    uncss: {
      dist: {
        files: [
          { src: 'src/*.html', dest: 'dist/css/compiled.min.css'}
        ]
      },
      options: {
        compress:true
      }
    },
    processhtml: {
      dist:{
        options: {
          process: true,
        },
        files: [
          {
          expand: true,     
          cwd: 'dist/',   
          src: ['**/*.html'],
          dest: 'dist/',  
          ext: '.html'
        },
        ],
      }
    },
    uglify: {
      dist: {
        files: {
          'dist/js/compiled.min.js': ['dist/js/bootstrap.js', 'dist/js/socialite.min.js', 'dist/js/dragend.js', 'dist/js/ZeroClipboard.js', 'dist/js/data.js', 'dist/js/app.js'  ] // Load in the correct order
        }
      }
    }
  });
  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Default tasks.
  grunt.registerTask('default', ['copy', 'uglify', 'uncss','processhtml']);
};