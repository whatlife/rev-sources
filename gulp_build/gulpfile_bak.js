var gulp    = require('gulp');
var gutil   = require('gulp-util');
var fs      = require('fs');
var path    = require('path');
var crypto  = require('crypto');
var Buffer  = require('buffer').Buffer;
var del     = require('del');
var through = require('through2');

// var imagemin = require('gulp-imagemin');
// var pngquant = require('imagemin-pngquant');

var cwd = __dirname;
var urlMap = {};
var urlMapFile = path.join(cwd, 'file_map.json');
console.log('cwd ' +cwd);
/*-------------------------------------------------------------------
    本文件目前提供2个task

    1 gulp revHtml用于将jsp页面中，替换引用的静态文件
    2 gulp clean用于清除生成的文件
-------------------------------------------------------------------*/

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
    scss: '',
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

    contents = file.contents.toString();
    lines = contents.split('\n');
    length = lines.length;


    for (i = 0; i < length; i++) {
        line = lines[i];
        groups = FILE_DECL.exec(line);
        if (groups && groups.length > 1) {
            // console.log('groups[2] >>>>>>>>>> ' + groups[2]);
            var normPath = path.normalize(groups[3]);
            // console.log('groups[3] >>>>>>>>>> ' + groups[3]);
            if (groups[2].toLowerCase() == 'common') {
                _pathCommonOrStatic = 'common';
            } else {
                _pathCommonOrStatic = 'static';
            }
            var _staticPath = 'cdn\\' + _pathCommonOrStatic;
            if (normPath.indexOf(path.sep) === 0) {
                dependencyPath = path.join(file.base, _staticPath, normPath);
                // console.log('dependencyPath >>>>>>>> ' + dependencyPath);
            } else {
                dependencyPath = path.join(file.base, _staticPath, normPath);
                // console.log('dependencyPath >>>>>>>> ' + dependencyPath);
                // dependencyPath = path.resolve(path.dirname(file.path), _staticPath, normPath);
            }

            try {
                data = fs.readFileSync(dependencyPath);
                hash = crypto.createHash('md5');
                hash.update(data.toString(), 'utf8');
                originGroupSubItem = groups[3].concat('?v=' + hash.digest('hex'));
                console.log('groups[33333333] >>>>>>>> '  + groups[3]);
                console.log('originGroupSubItem >>>>>>>> '  + originGroupSubItem);
                line = line.replace(groups[3], originGroupSubItem);
                // console.log('line :>>>>>>>>>>>>' + line);
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

    fs.writeFile(urlMapFile, JSON.stringify(urlMap, null, '\t'), function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("JSON saved to " + urlMapFile);
        }
    });
});

gulp.task('clean', function(cb) {
    del.sync(_ninDeploy.dev, {
        force: true
    });
    cb();
});
