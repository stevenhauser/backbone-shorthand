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
      src: "src/**/*.js",
      specs: "spec/*.js"
    },

    watch: {
      files: ["<%= jshint.files %>"],
      tasks: ["jshint", "jasmine"]
    }

  });


  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-jasmine");
  grunt.loadNpmTasks("grunt-contrib-watch");


  grunt.registerTask("spec", ["jshint", "jasmine"]);
  grunt.registerTask("default", ["jshint", "jasmine", "watch"]);

};
