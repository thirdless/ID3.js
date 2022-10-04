/*
    You can find the specific tag names here: https://exiftool.org/TagNames/ID3.html
*/

function decode(decoder, array){
    if(!array || !array.length)
        return "";

    return decoder.decode(new Uint8Array(array));
}

async function id3(url){
    let blob = new Uint8Array(await fetch(url).then(data => data.arrayBuffer())),
        decoder = new TextDecoder("utf-8"),
        decoded = decode(decoder, blob),
        boundary = decoded.indexOf("TAG"),
        pairs = {},
        last = 0;

    if(decoded.indexOf("ID3") !== 0)
        return;

    blob = blob.slice(10, boundary);

    for(let i = 1; i < blob.length - 1; i++){
        let prev = blob[i - 1],
            now = blob[i],
            next = blob[i + 1];

        if(prev != 0 && now != 0 && next == 0){
            let key = decode(decoder, blob.slice(last, i + 1)),
                length = (blob[i + 2] << 16) + (blob[i + 3] << 8) + blob[i + 4],
                start = i + 8,
                end = start + length - 1;

            pairs[key] = blob.slice(start, end);
            last = end;
            i = last;
        }
    }

    for(let key in pairs){
        if(key == "APIC" || key == "PIC")
            continue;

        pairs[key] = decode(new TextDecoder("utf-16"), pairs[key]);
    }
    
    if("APIC" in pairs || "PIC" in pairs){
        let image = pairs["APIC"] || pairs["PIC"];

        pairs.image_mime = decode(decoder, image.slice(0, image.indexOf(3) - 1));

        image = image.slice(type.length + 2);
        image = image.slice(image.indexOf(0) + 1);
        pairs.image = image;
    }

    return pairs;
}
