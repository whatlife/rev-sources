var gulp    = require('gulp');
var gutil   = require('gulp-util');
var fs      = require('fs');
var path    = require('path');
var crypto  = require('crypto');
var Buffer  = require('buffer').Buffer;
var del     = require('del');
var through = require('through2');

var uglify  = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');

var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

var cwd = __dirname;
var parentCwd = path.resolve(cwd, '..');

// TODO '''''
// devTest目录是先执行mincss， minjs，minimg，cptodir这些命令之后，生成的压缩版本的资源文件的目录
// 必须先有这个目录，才能计算到md5值
var compressedCwd = parentCwd+ '\\devTest';



/*-------------------------------------------------------------------
// 正则表达式分4组
// 第0组捕获形如：<%=R.getCommonPath("lib/jquery-1.8.0.js" 的内容
// 第1组捕获形如：<%=R.getCommonPath(" 的内容
// 第2组捕获形如：Common或Static 的内容
// 第3组捕获形如：lib/jquery-1.8.0.js 的内容
-------------------------------------------------------------------*/
var FILE_DECL = /(<%=R.get(Common|Static)Path\(['|"])([^\s>"']+?)['|"]/gi;

_ninPath = {
    app: '',
    css: '',
    js: '',
    html: '../**/*.jsp'
}
_ninDeploy = {
    dev: '../devTest/',
    prod: '../dist/'
}

/*-------------------------------------------------------------------
    在这个方法实现
-------------------------------------------------------------------*/

function filesMd5(file) {
    if (!file.contents) return;

    var contents;
    var lines;
    var i, length;
    var line;
    var groups;
    var dependencyPath;
    var data, hash;
    var _pathCommonOrStatic;
    var originGroupSubItem;
    var afterMd5DependencyPath;

    contents = file.contents.toString();
    lines = contents.split('\n');
    length = lines.length;


    for (i = 0; i < length; i++) {
        line = lines[i];
        groups = FILE_DECL.exec(line);
        if (groups && groups.length > 1) {
            var normPath = path.normalize(groups[3]);

            if (groups[2].toLowerCase() == 'common') {
                _pathCommonOrStatic = 'common';
            } else {
                _pathCommonOrStatic = 'static';
            }
            var _staticPath = 'cdn\\' + _pathCommonOrStatic;
            afterMd5DependencyPath = path.join(compressedCwd, _staticPath, normPath);

            try {
                data = fs.readFileSync(afterMd5DependencyPath);
                hash = crypto.createHash('md5');
                hash.update(data.toString(), 'utf8');
                originGroupSubItem = groups[3].concat('?v=' + hash.digest('hex').substring(0, 8));
                line = line.replace(groups[3], originGroupSubItem);
            } catch (e) {
                // fail silently.
            }
        }
        lines[i] = line;
        FILE_DECL.lastIndex = 0;

    }

    file.contents = new Buffer(lines.join('\n'));
    // cb(null, file);
}

/*------TASKS------*/


/*-------------------------------------------------------------------
    1 搜索指定目录下的jsp页面，替换页面内的<script <link <img等等标签内
    的R.getCommonPath或R.getStaticPath中引用的资源文件
    2 并在这些文件之后增加md5版本号。
    3 替换后生成的jsp文件置于devTest/html目录下
-------------------------------------------------------------------*/
gulp.task('revHtml', function() {
    var stream = gulp.src(_ninPath.html, ['!../cdn/**', '!../WEB-INF/**', '!../META-INF/**', '!../DEMO_STATIC/**']);
    stream = stream.pipe(through.obj(function(file, enc, cb) {
        filesMd5(file);
        this.push(file);
        cb();
    }));
    return stream.pipe(gulp.dest(_ninDeploy.dev + 'html'));

});


/*-------------------------------------------------------------------
    压缩js文件
    放到cdn目录下
-------------------------------------------------------------------*/

gulp.task('minjs', function() {
    var stream = gulp.src(['../cdn/**/*.js','!../cdn/**/*.min.js']);
    stream = stream.pipe(uglify());

    return stream.pipe(gulp.dest(_ninDeploy.dev + 'cdn'));
});

/*-------------------------------------------------------------------
    压缩css文件
    放到cdn目录下
-------------------------------------------------------------------*/
gulp.task('mincss', function() {
    var stream = gulp.src(['../cdn/**/*.css','!../cdn/**/*.min.css']);

    stream = stream.pipe(minifyCss());

    return stream.pipe(gulp.dest(_ninDeploy.dev + 'cdn'));
});
/*-------------------------------------------------------------------
    拷贝那些本身就已经是被压缩过的js和css
    放到cdn目录下
-------------------------------------------------------------------*/
gulp.task('cptodir' , function() {
    var stream = gulp.src(['../cdn/**/*.min.+(js|css)']);
    return stream.pipe(gulp.dest(_ninDeploy.dev + 'cdn'));
});
/*-------------------------------------------------------------------
    图片处理，压缩，拷贝
    放到cdn目录下
-------------------------------------------------------------------*/
gulp.task('minimg', function() {
    return gulp.src(['../cdn/**/*.+(jpg|png|jpeg)'])
               .pipe(imagemin({
                progressive: true,
                use: [pngquant()]
                }))
               .pipe(gulp.dest(_ninDeploy.dev + 'cdn'));
});
gulp.task('clean', function(cb) {
    del.sync(_ninDeploy.dev, {
        force: true
    });
    cb();
});
