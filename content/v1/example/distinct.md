---
Title: "Distinct"
Created Date: "09/05/2018"
Last Updated : "09/05/2018"
---

```
var Connection = new JsStore.Instance("Demo");
Connection.select({
    From: "Customers",
    Distinct:true,
    OnSuccess:function (results){
        log(results);
    },
    OnError:function (error) {
        log(error);
    }
});

```