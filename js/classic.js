const caesarCipher = (str, amount) => {
  if (amount < 0) return caesarCipher(str, amount + 26);
  let output = "";
  for (var i = 0; i < str.length; i++) {
    var c = str[i];
    if (c.match(/[a-z]/i)) {
      var code = str.charCodeAt(i);
      if (code >= 65 && code <= 90) {
        c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
      } else if (code >= 97 && code <= 122) {
        c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
      }
    }
    output += c;
  }
  return output;
};
const gcd = (a, b) => {
  if (b) return gcd(b, a % b);
  else return Math.abs(a);
};

const affineCipherEncrypt = (plaintext, a, b) => {
  let cipher = "";
  let value = 0;
  plaintext.split("").forEach((char) => {
    if (char.match(/[a-z]/i)) {
      let offset = char.charCodeAt(0) >= 97 ? "a" : "A";
      value =
        ((a * (char.charCodeAt(0) - offset.charCodeAt(0)) + b) % 26) +
        offset.charCodeAt(0);
      cipher += String.fromCharCode(value);
    } else {
      cipher += char;
    }
  });
  return cipher;
};

const affineCipherDecrypt = (cipher, a, b) => {
  let plaintext = "";
  let aInverse = 0;
  let value = 0;
  for (var i = 0; i < a; i++) {
    if ((a * i) % 26 == 1) {
      aInverse = i;
      break;
    }
  }
  cipher.split("").forEach((char) => {
    if (char.match(/[a-z]/i)) {
      let offset = char.charCodeAt(0) >= 97 ? "a" : "A";
      let x = char.charCodeAt(0) - offset.charCodeAt(0);
      console.log(x);
      value = mod(aInverse * (x - b), 26);
      plaintext += String.fromCharCode(value + offset.charCodeAt(0));
    } else {
      plaintext += char;
    }
  });
  return plaintext;
};
const vigenereCipherEncrypt = (plaintext, key) => {
  let x = plaintext.length;
  let cipher = "";
  plaintext = plaintext.toUpperCase();
  key = key.toUpperCase();
  if (key.length < plaintext.length) {
    for (let i = 0; ; i++) {
      if (x == i) i = 0;
      if (key.length == plaintext.length) break;
      key += key[i];
    }
  }
  for (let i = 0; i < plaintext.length; i++) {
    if (plaintext[i].match(/[a-z]/i) && key[i].match(/[a-z]/i)) {
      let out = (plaintext[i].charCodeAt(0) + key[i].charCodeAt(0)) % 26;
      out += "A".charCodeAt(0);
      cipher += String.fromCharCode(out);
    } else {
      cipher += plaintext[i];
    }
  }
  return cipher;
};

const vigenereCipherDecrypt = (ciphertext, key) => {
  let x = ciphertext.length;
  let plaintext = "";
  ciphertext = ciphertext.toUpperCase();
  key = key.toUpperCase();
  if (key.length < ciphertext.length) {
    for (let i = 0; ; i++) {
      if (x == i) i = 0;
      if (key.length == ciphertext.length) break;
      key += key[i];
    }
  }
  for (let i = 0; i < ciphertext.length; i++) {
    if (ciphertext[i].match(/[a-z]/i) && key[i].match(/[a-z]/i)) {
      let out = (ciphertext[i].charCodeAt(0) - key[i].charCodeAt(0) + 26) % 26;
      out += "A".charCodeAt(0);
      plaintext += String.fromCharCode(out);
    } else {
      plaintext += ciphertext[i];
    }
  }
  return plaintext;
};
function mod(n, m) {
  var remain = n % m;
  return Math.floor(remain >= 0 ? remain : remain + m);
}
