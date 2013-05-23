module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON("package.json"),

    jshint: {
      files: ["Gruntfile.js", "src/**/*.js", "spec/**/*.js"],
      options: {
        expr: true
      }
    },

    jasmine: {
      main: {
        src: "src/*.js",
        options: {
          specs: "spec/*.js",
          vendor: [
            "node_modules/backbone/node_modules/underscore/underscore.js",
            "node_modules/backbone/backbone.js"
          ]
        }
      }
    },

    watch: {
      files: ["<%= jshint.files %>"],
      tasks: ["jshint", "jasmine"]
    }

  });


  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-jasmine");
  grunt.loadNpmTasks("grunt-contrib-watch");


  grunt.registerTask("spec", ["jshint", "jasmine:main"]);
  grunt.registerTask("default", ["jshint", "jasmine:main", "watch"]);

};
