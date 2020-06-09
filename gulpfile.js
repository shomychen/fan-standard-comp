const { src, dest, series, task, watch } = require('gulp');
const del = require('del');
const flatten =require('gulp-flatten')
const rename =require('gulp-rename')
// const cp = require('child_process');
// const pkg = require('./package.json');

//删除文件和文件夹
task('clean:docs', () => {
  console.log(`先删除docs 目录文件`);
  return del([
    'docs-app/src/components/*',
    // //这里我们使用一个通配模式来匹配 `mobile` 文件夹中的所有东西
    // 'dist/mobile/**/*.js',
    // //我们不希望删掉这个文件，所以我们取反这个匹配模式
    // '!dist/mobile/deploy.json'
  ])
})
// 复制所有的 .md文件
task('copy:files', () => {
  console.log(`从packages目录复制所有.md文件到docs里面`);
  return src(['packages/**/*.md', '!packages/Readme.md','!packages/es/**/*.md', '!packages/lib/**/*.md', '!packages/node_modules/**/*.md'])
    .pipe(flatten()) // 不保留目录
    .pipe(dest('docs-app/src/components', { sourcemaps: '.' }));
})

task('copy:readme:rename', () => {
  console.log(`从将readme.md, 重命名成index.md`);
  return src(['packages/Readme.md'])
    .pipe(rename('index.md'))
    .pipe(dest('docs-app/src/components/', { sourcemaps: '.' }));
})

// 'clean:docs',
task('copy:md', series('clean:docs','copy:files','copy:readme:rename'));

task('watch:md', () => {
  watch(['packages/**/*.md', '!packages/es/**/*.md', '!packages/lib/**/*.md', '!packages/node_modules/**/*.md'], series('copy:files'))
});
