var gulp = require('gulp');
var update = require('gulp-update')();
var elixir = require('laravel-elixir');
require('laravel-elixir-stylus');

gulp.task('update', function () {
    gulp.watch('./package.json').on('change', function (file) {
        update.write(file);
    });
});

gulp.task('default', ['update']);

elixir(function(mix) {

    // Bulma currently does not support Stylus, so we compile it in sass
    mix.sass([
        './resources/bower_components/bulma/bulma.sass'
    ], './resources/assets/compiled/css/bulma.css');
    
    // Compiling all other styling seperately to bulma with stylus
    mix.stylus([
        './resources/assets/stylus/*.styl',
    ], './resources/assets/compiled/css/stylus.css');
    
    // Now we can concat the processed stylesheets into one and output them to the public/css directory
    mix.styles([
        './resources/assets/css/reset.css',
        './resources/bower_components/font-awesome/css/font-awesome.css',
        './resources/assets/compiled/css/bulma.css',
        './resources/assets/compiled/css/stylus.css'
    ], './public/css/app.css');

    // All js files are compiled together and outputted to public/js by default
    mix.scripts([
        './resources/assets/js/*.js'
    ]);

    // Copy font-awesome fonts to public/fonts
    mix.copy('./resources/bower_components/font-awesome/fonts/', './public/fonts/');

});