
// 引入包
var fs = require('fs');
const iconv = require('iconv-lite');
const jschardet = require('jschardet');

// 全局变量
const root_path = 'C:\\Users\\t\\Desktop\\1\\'
const file_type = ['js', 'html']
const to_code = 'UTF8'

Array.prototype.inarray = function (elem) {
  "use strict";
  var l = this.length;
  while (l--) {
    if (this[l] === elem) {
      return true;
    }
  }
  return false;
};

function encodeFiles(root) {
  "use strict";
  var files = fs.readdirSync(root);
  files.forEach(function (file) {
    var pathname = root + '/' + file,
      stat = fs.lstatSync(pathname);
    if (!stat.isDirectory()) {
      var name = file.toString();
      if (!file_type.inarray(name.substring(name.lastIndexOf('.') + 1))) {
        return;
      }

      fs.readFile(pathname, (err, data) => {
        if (err) {
          console.error('读取文件失败:', err);
          return;
        }

        // 检测编码
        const encoding = jschardet.detect(data).encoding;
        console.log(`文件编码: ${encoding}`);

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