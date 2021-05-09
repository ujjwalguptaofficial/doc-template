---
Title: "Ignore Case"
Created Date: "08/05/2018"
Last Updated : "08/05/2018"
---

JavasScript is case sensitive, so is the IndexedDB. You can use option - 'IgnoreCase' to filter records with case insensitive.


```
Connection.select({
    From: "Table_Name",
    IgnoreCase: true,
    Where: {
        Column1: some_value,
        Column2: some_another_value
    },
    OnSuccess: function(results) {
        //results will be array of objects.
        console.log(results);
    },
    OnError: function(error) {
        alert(error.value);
    }
});
```

<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="/example/ignore_case">Example</a>
    <button class="btn info btnNext">Next</button>
</p>