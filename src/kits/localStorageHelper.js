/*
 localStorage操作js文件
* */

const KEY = 'goods';

// 1.0 根据key获取localStorage中的数据
export function getItem(){
   return JSON.parse(localStorage.getItem(KEY) || '[]');
}

// 2.0 向localStorage 中存储数据
//obj的格式：{goodsid:1,count:1}
export function setItem(obj) {
    //获取老数据
  var arr =  JSON.parse(localStorage.getItem(KEY) || '[]');
    // 追加新数据
    arr.push(obj);
    // 统一将新老数据存储到localStorage中
    localStorage.setItem(KEY,JSON.stringify(arr));
}
