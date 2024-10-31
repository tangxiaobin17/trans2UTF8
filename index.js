
// 引入包
const fs = require('fs');
const iconv = require('iconv-lite');
const jschardet = require('jschardet');
const path = require('path');

// 全局变量
const root_path = 'C:\\Users\\t\\Desktop\\1\\'
const file_type = ['js', 'html']
const to_code = 'UTF8'

function encodeFiles(root) {
  var files = fs.readdirSync(root);
  files.forEach(function (file) {
    var pathname = root + '/' + file,
      stat = fs.lstatSync(pathname);
    if (!stat.isDirectory()) {
      const extName = path.extname(pathname).slice(1);
      console.log('TT ~ extName:', extName,file)
      if (!file_type.includes(extName)) return;
   
      fs.readFile(pathname, (err, data) => {
        if (err) {
          console.error('读取文件失败:', err);
          return;
        }

        // 检测编码
        const encoding = jschardet.detect(data).encoding;
        if (encoding !== to_code) {
          fs.writeFile(pathname, iconv.decode(fs.readFileSync(pathname), encoding), {
            encoding: to_code
          }, function (err) {
            if (err) {
              throw err;
            }
          });
        }
      });
    } else {
      encodeFiles(pathname);
    }
  });
}

encodeFiles(root_path);