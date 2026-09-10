self.addEventListener("push",event=>{
 let data={title:"今日の予定",body:"カレンダーを確認してください"};
 try{if(event.data)data={...data,...event.data.json()}}catch(e){}
 event.waitUntil(self.registration.showNotification(data.title,{
   body:data.body,icon:"icon.png",badge:"icon.png",tag:"daily-calendar",data:{url:"./"}
 }))
});
self.addEventListener("notificationclick",event=>{
 event.notification.close();
 event.waitUntil(clients.matchAll({type:"window",includeUncontrolled:true}).then(list=>{
   for(const c of list){if("focus" in c)return c.focus()}
   return clients.openWindow("./")
 }))
});
