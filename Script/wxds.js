
/*
微信读书
[Script]
http-response ^https?:\/\/i\.weread\.qq\.com(\/pay\/memberCardSummary|\/pay\/balance) script-path=wxds.js, requires-body=true, timeout=10, tag=weixindushu
[mitm]
hostname = i.weread.qq.com
*/ 
if ($request.url.indexOf("/pay\/memberCardSummary") != -1) {
// 判断请求路径存在则调用函数re()调试该路径下的响应体
  re('"expiredTime":\\d+@"expired":\\d+"@"remainTime":\\d+"@"savedMoney":\\d+"', '"expiredTime":7956892799@"expired":0@"remainTime":9999999999999@"savedMoney":999999') 
// 匹配里若需用到正则的反斜杠语句像\d+、\w+时请用双反斜杆\\d+、\\w+
}

if ($request.url.indexOf("/pay\/balance") != -1) {
  re('"balance":\\d+"@"giftBalance":\\d+"@"peerBalance":\\d+"', '"balance":999999@"giftBalance":999999@"peerBalance":999999')
}

function re() {
 var body = $response.body;
 if (arguments[0].includes("@")) {
  var regs = arguments[0].split("@");
  var strs = arguments[1].split("@");
  for (i = 0;i < regs.length;i++) {
   var reg = new RegExp(regs[i],"g");
   body = body.replace(reg, strs[i]);
 }
}
 else {
  var reg = new RegExp(arguments[0],"g");
  body = body.replace(reg, arguments[1]);
}
 $done(body);
}
