just call the function by passing the URL parameter for the mp3 file and wait for the promise to finish.

```javascript
await id3(url);
// or
id3(url).then(callback);
```

the available tag names and values are presented here: [https://exiftool.org/TagNames/ID3.html](https://exiftool.org/TagNames/ID3.html)
