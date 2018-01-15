const gulp = require('gulp')
const watch = require('gulp-watch')
const webserver = require('gulp-webserver')

//chama a task watch que chama todas as outras vinculadas à elas
gulp.task('server', ['watch'], () =>{
    return gulp.src('public')
    .pipe(webserver({
        //sempre que a pasta public mudar ele dispara um reload
        livereload: true,
        //define a porta
        port: 3000,
        //abre o brownser
        open: true
    }))
})

gulp.task('watch', () =>{
    //monitora as modificacoes nos arquivos de extencao abaixo
    //toda vez que um deles é modificado, é disparado a funcao respectiva no app.js
    //os arquivos sao enviados para o public e o browser recarrega a aplicacao
    watch('app/**/*.html', () => gulp.start('app.html'))
    watch('app/**/*.css', () => gulp.start('app.css'))
    watch('app/**/*.js', () => gulp.start('app.js'))
    watch('assets/**/*.*', () => gulp.start('app.assets'))
})


