本仓库不具有一般的指导意义。

计算jsp文件内引用的静态资源，并寻找到本地的文件，计算md5，并给引用到的文件增加md5值，以控制缓存。

主要文件目前在的gulpfile.js的`filesMd5`方法。


由于项目目录结构的特殊性，大家看到的cdn目录里存放了各种js，css，以及图片，目录嵌套目录，始得本来很容易算md5的方法就不能用正常的办法来处理。gulp社区提供了很多插件可以很容易的在普遍结构下算到各个文件的md5，但是本项目结构它就是这么复杂，所以只能根据实际结构来处理。



# changelog

## 2016-05-17
### md5
取8位 xx.substring(0, 8)
## 2016-05-16
### md5
实现计算压缩之后的资源文件的md5值，并替换到jsp页面中

## 2016-05-13
### md5
计算压缩后的资源文件，并替换到jsp中。（这次计算的是压缩之后的资源文件，所以在发布的时候，资源文件也应该使用的是压缩之后的文件）

## 2016-05-12
### 压缩css
### 压缩js
### 图片处理
### 新增以下几个task：
####    minjs

压缩js文件，并置于cdn目录下

####    mincss
压缩css文件，并置于cdn目录下

####    cptodir
拷贝那些本身就已经是被压缩过的js和css并放到cdn目录下

####    minimg
图片处理，压缩，拷贝，并放到cdn目录下

## 2016-05-10
###本文件目前提供2个task
#### gulp revHtml
用于将jsp页面中，替换引用的静态文件

#### gulp clean
用于清除生成的文件
