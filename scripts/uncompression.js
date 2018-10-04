var AppBaseURL = "http://elwizara.com/";

// Indefinate length addition
function addAsString(x1, y1) { // x, y strings
    var x = String(x1)
    var y = String(y1)
    var s = '';
    if (y.length > x.length) { // always have x longer
        s = x;
        x = y;
        y = s;
    }
    s = (parseInt(x.slice(-9), 10) + parseInt(y.slice(-9), 10)).toString(); // add last 9 digits
    x = x.slice(0, -9); // cut off last 9 digits
    y = y.slice(0, -9);
    if (s.length > 9) { // if >= 10, add in the 1
        if (x === '') return s; // special case (e.g. 9+9=18)
        x = addAsString(x, '1');
        s = s.slice(1);
    } else if (x.length) { // if more recursions to go
        while (s.length < 9) { // make sure to pad with 0s
            s = '0' + s;
        }
    }
    if (y === '') return x + s; // if no more chars then done, return
    return addAsString(x, y) + s; // else recurse, next digit
}

function multiplyAsString(w, q) {
    addedres = "0"
    for (var m = 0; m < q; m++) {
        var res1 = addAsString(addedres, w)
        addedres = res1
    }
    return addedres
}


var DecodeDic = {
    "A": 0, "B": 1, "C": 2, "D": 3, "E": 4, "F": 5, "G": 6, "H": 7, "I": 8, "J": 9, "K": 10, "L": 11, "M": 12, "N": 13,
    "O": 14, "P": 15, "Q": 16, "R": 17, "S": 18, "T": 19, "U": 20, "V": 21, "W": 22, "X": 23, "Y": 24, "Z": 25, "a": 26, "b": 27, "c": 28,
    "d": 29, "e": 30, "f": 31, "g": 32, "h": 33, "i": 34, "j": 35, "k": 36, "l": 37, "m": 38, "n": 39, "o": 40, "p": 41, "q": 42, "r": 43,
    "s": 44, "t": 45, "u": 46, "v": 47, "w": 48, "x": 49, "y": 50, "z": 51, "0": 52, "1": 53, "2": 54, "3": 55, "4": 56, "5": 57, "6": 58,
    "7": 59, "8": 60, "9": 61, "-": 62, "_": 63,
};

function UncompresNumber(encoded) {
    var b = Object.keys(DecodeDic).length
    var res = 0
    for (var i = encoded.length - 1; i >= 0; i--) {
        var ch = encoded.charAt(i)
        var v = DecodeDic[ch]
        res = addAsString(multiplyAsString(res, b), v)
    }
    return res
} 


function parseelwzURL(url){ 
    var langI = 2
    var dateI = 4  
    if (url.startsWith("und")){
        langI = 3
        dateI = 5
    } 
 
    var lang  = url.substring(0, langI);
    var date  = UncompresNumber(url.substring(langI, dateI));

    var year = "20" + date.substring(0, 2);
    var month = date.substring(2, 4);
    if (month.startsWith("0")){
        month = date.substring(3, 4);
    } 
    var id  = UncompresNumber(url.substring(dateI));          
    finalUrl = AppBaseURL+"?lang="+lang+"&year="+year+"&month="+month+"&id="+id
    return finalUrl 
} 

(function() {
    var path = window.location.search.substring(1);
    if (path == "" || path.length < 4){
        window.location.href = AppBaseURL;
    }
    hrf = parseelwzURL(path) 
    window.location.href = hrf;
})(); 