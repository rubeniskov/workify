# workify

Worker and Fork process handler with stream pipes works on browser and NodeJS without any modification

To include the lib as standalone in your webpage you can use the cdn or download de files:

```html
<script type="text/javascript" src="https://unpkg.com/workify/dist/bundle.js"></script>
<!-- or minified version -->
<script type="text/javascript" src="https://unpkg.com/workify/dist/bundle.min.js"></script>
```

<!-- You can also use as nodeJS module like this: -->

<!-- Create files in current work dir with the follow structure -->

file `worker.js`

```javascript
onmessage = function(event) {
    console.log("Main said : " + event.data);
};

setInterval(function(){
    postMessage('foo');
}, 5000);
```

file `index.html`

```html
<script type="text/javascript" src="https://unpkg.com/workify/dist/bundle.min.js"></script>
<script type="text/javascript">
    var Worker = workify.Worker,
        worker = new Worker('./worker.js');

        worker.onmessage = function(event) {
            console.log("Worker said : " + event.data);
        };

    setInterval(function() {
        worker.postMessage('bar');
    }, 1000);
</script>
```

You can also execute the same code in nodejs creating an index.js file

file `index.js`
```javascript
var Worker = workify.Worker,
    worker = new Worker('./worker.js');

    worker.onmessage = function(event) {
        console.log("Worker said : " + event.data);
    };

setInterval(function() {
    worker.postMessage('bar');
}, 1000);
```

And execute

```shell
$ node index.js
```
