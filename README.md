just call the function by passing the URL parameter for the mp3 file and wait for the promise to finish.

```javascript
await id3(url);
// or
id3(url).then(callback);
```

some examples include:
```javascript
  let data = await id3(blob);
  data["TIT2"] // song title
  data["TPE1"] // artist
  data["TYER"] // year
  // and if available...
  data.image // image data stored as Uint8Array
  data.image_mime // mime type of the image
```
the available tag names and values are fully presented here: [https://exiftool.org/TagNames/ID3.html](https://exiftool.org/TagNames/ID3.html)
