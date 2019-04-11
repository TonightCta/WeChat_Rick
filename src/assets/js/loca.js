//封装过期控制代码
export function set(key,value){
     var curTime = new Date().getTime();
     localStorage.setItem(key,JSON.stringify({data:value,time:curTime}));
 }
export function get(key,exp){
     var data = localStorage.getItem(key);
     var dataObj = JSON.parse(data);
     if (new Date().getTime() - dataObj.time>exp) {
         console.log('信息已过期');
     }else{
         var dataObjDatatoJson = JSON.parse(dataObj.data)
         return dataObjDatatoJson;
     }
 }
