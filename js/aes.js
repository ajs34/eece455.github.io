function transpose(a){
  var w = a.length || 0;
  var h = a[0] instanceof Array ? a[0].length : 0;
  if(h === 0 || w === 0)
        return []; 
  var i, j, t = [];
  for(i=0; i<h; i++) {
    t[i] = [];
    for(j=0; j<w; j++) {
      t[i][j] = a[j][i];
    }
  }
  return t;
}
function arrayRotate(arr, reverse) {
    if (reverse) arr.unshift(arr.pop());
    else arr.push(arr.shift());
    return arr;
}

function circularLeftShift(arr,amount,reverse){
    let output = arr
    for(let i = 0; i < amount;i++){
        output = arrayRotate(output,reverse)
    }
    return output
}

function multiplyByX(p1){
    if (p1[0] == '0')
        return circularLeftShift(p1.split(''),1).join('')
    else if (p1[0] == '1'){
        let p2 = p1
        p2 = '0' + p2.substring(1)
        p2 = circularLeftShift(p2.split(''),1).join('')
        return stringxor(p2,'00011011')
    }
}
function multiplyByXPowerN(p1,n){
    let answer = p1
    for(let i = 0; i < n;i++){
        answer = multiplyByX(answer)
    }
    return answer
}
function multiply(p1,p2){
    if(p2 == '00000000')
        return '00000000'
    let out = []
    let i = p1.length -1
    for(let j = 0; j < p1.length;j++){
       if(p2[j] == '1')
            out.push(multiplyByXPowerN(p1,i))
       i--
    }
    const reducer = (p1,p2) => stringxor(p1,p2)
    let answer = out.reduce(reducer)
    return answer
}
function chunkstring(str, length) {
  return str.match(new RegExp(".{1," + length + "}", "g"));
}
function splitArrayIntoChunksOfLen(arr, len) {
  var chunks = [], i = 0, n = arr.length;
  while (i < n) {
    chunks.push(arr.slice(i, i += len));
  }
  return chunks;
}
function stringxor(str1, str2) {
  let output = "";
  for (let i = 0; i < str1.length; i++) {
    if (str1[i] == str2[i]) {
      output += "0";
    } else {
      output += "1";
    }
  }
  return output;
}
function leftshift(str, shift) {
  let arr = array.from(str);
  let x = arr.splice(0, shift);
  return [...arr, x].join("").replace(",", "");
}
function hex2bin(hex) {
  let output = "";
  (hex.split("")).forEach((elem) => {
    output += parseInt(elem, 16).toString(2).padStart(4, "0");
  });
  return output;
}
function bin2hex(bin) {
  let chunks = chunkstring(bin, 4);
  let output = "";
  chunks.forEach((chunk) => {
    output += parseInt(chunk, 2).toString(16);
  });
  return output;
}
function hexXOR(h1,h2){
    let b1 = hex2bin(h1)
    let b2 = hex2bin(h2)
    let result = stringxor(b1,b2)
    return bin2hex(result)
}
function hexMultiply(h1,h2){
    let b1 = hex2bin(h1)
    let b2 = hex2bin(h2)
    return bin2hex(multiply(b1,b2))
}
function arrayXOR(arr1,arr2){
    let out = []
    for (let i = 0; i < arr1.length; i++) {
        out.push(hexXOR(arr1[i],arr2[i]))
    }
    return out
}
class AES{
    constructor(msg,key){
        this.state = this.transformInputToMatrix(msg)
        this.key = this.transformInputToMatrix(key) 
        this.steps = ''
        this.sbox = [
        ["63", "7C", "77", "7B", "F2", "6B", "6F", "C5", "30", "01", "67", "2B", "FE", "D7", "AB", "76"],
        ["CA", "82", "C9", "7D", "FA", "59", "47", "F0", "AD", "D4", "A2", "AF", "9C", "A4", "72", "C0"],
        ["B7", "FD", "93", "26", "36", "3F", "F7", "CC", "34", "A5", "E5", "F1", "71", "D8", "31", "15"],
        ["04", "C7", "23", "C3", "18", "96", "05", "9A", "07", "12", "80", "E2", "EB", "27", "B2", "75"],
        ["09", "83", "2C", "1A", "1B", "6E", "5A", "A0", "52", "3B", "D6", "B3", "29", "E3", "2F", "84"],
        ["53", "D1", "00", "ED", "20", "FC", "B1", "5B", "6A", "CB", "BE", "39", "4A", "4C", "58", "CF"],
        ["D0", "EF", "AA", "FB", "43", "4D", "33", "85", "45", "F9", "02", "7F", "50", "3C", "9F", "A8"],
        ["51", "A3", "40", "8F", "92", "9D", "38", "F5", "BC", "B6", "DA", "21", "10", "FF", "F3", "D2"],
        ["CD", "0C", "13", "EC", "5F", "97", "44", "17", "C4", "A7", "7E", "3D", "64", "5D", "19", "73"],
        ["60", "81", "4F", "DC", "22", "2A", "90", "88", "46", "EE", "B8", "14", "DE", "5E", "0B", "DB"],
        ["E0", "32", "3A", "0A", "49", "06", "24", "5C", "C2", "D3", "AC", "62", "91", "95", "E4", "79"],
        ["E7", "C8", "37", "6D", "8D", "D5", "4E", "A9", "6C", "56", "F4", "EA", "65", "7A", "AE", "08"],
        ["BA", "78", "25", "2E", "1C", "A6", "B4", "C6", "E8", "DD", "74", "1F", "4B", "BD", "8B", "8A"],
        ["70", "3E", "B5", "66", "48", "03", "F6", "0E", "61", "35", "57", "B9", "86", "C1", "1D", "9E"],
        ["E1", "F8", "98", "11", "69", "D9", "8E", "94", "9B", "1E", "87", "E9", "CE", "55", "28", "DF"],
        ["8C", "A1", "89", "0D", "BF", "E6", "42", "68", "41", "99", "2D", "0F", "B0", "54", "BB", "16"]]
        this.invsbox = [
        ["52", "09", "6A", "D5", "30", "36", "A5", "38", "BF", "40", "A3", "9E", "81", "F3", "D7", "FB"],
        ["7C", "E3", "39", "82", "9B", "2F", "FF", "87", "34", "8E", "43", "44", "C4", "DE", "E9", "CB"],
        ["54", "7B", "94", "32", "A6", "C2", "23", "3D", "EE", "4C", "95", "0B", "42", "FA", "C3", "4E"],
        ["08", "2E", "A1", "66", "28", "D9", "24", "B2", "76", "5B", "A2", "49", "6D", "8B", "D1", "25"],
        ["72", "F8", "F6", "64", "86", "68", "98", "16", "D4", "A4", "5C", "CC", "5D", "65", "B6", "92"],
        ["6C", "70", "48", "50", "FD", "ED", "B9", "DA", "5E", "15", "46", "57", "A7", "8D", "9D", "84"],
        ["90", "D8", "AB", "00", "8C", "BC", "D3", "0A", "F7", "E4", "58", "05", "B8", "B3", "45", "06"],
        ["D0", "2C", "1E", "8F", "CA", "3F", "0F", "02", "C1", "AF", "BD", "03", "01", "13", "8A", "6B"],
        ["3A", "91", "11", "41", "4F", "67", "DC", "EA", "97", "F2", "CF", "CE", "F0", "B4", "E6", "73"],
        ["96", "AC", "74", "22", "E7", "AD", "35", "85", "E2", "F9", "37", "E8", "1C", "75", "DF", "6E"],
        ["47", "F1", "1A", "71", "1D", "29", "C5", "89", "6F", "B7", "62", "0E", "AA", "18", "BE", "1B"],
        ["FC", "56", "3E", "4B", "C6", "D2", "79", "20", "9A", "DB", "C0", "FE", "78", "CD", "5A", "F4"],
        ["1F", "DD", "A8", "33", "88", "07", "C7", "31", "B1", "12", "10", "59", "27", "80", "EC", "5F"],
        ["60", "51", "7F", "A9", "19", "B5", "4A", "0D", "2D", "E5", "7A", "9F", "93", "C9", "9C", "EF"],
        ["A0", "E0", "3B", "4D", "AE", "2A", "F5", "B0", "C8", "EB", "BB", "3C", "83", "53", "99", "61"],
        ["17", "2B", "04", "7E", "BA", "77", "D6", "26", "E1", "69", "14", "63", "55", "21", "0C", "7D"],
            ]
        this.mCols = [
          ["02", "03", "01", "01"],
          ["01", "02", "03", "01"],
          ["01", "01", "02", "03"],
          ["03", "01", "01", "02"],
        ];
        this.invMCols = [
          ["0e", "0b", "0d", "09"],
          ["09", "0e", "0b", "0d"],
          ["0d", "09", "0e", "0b"],
          ["0b", "0d", "09", "0e"],
        ];

        this.rcon = ['01','02','04','08','10','20','40','80','1b','36']
    }
    transformInputToMatrix(input){
        let inputMatrix = []
        for(let i = 0; i<input.length-1;i++){
            if(i % 2 == 0)
                inputMatrix.push(input.slice(i,i+2))
        }
        let outputMatrix = []
        let i,j,temparray,chunk = 4;
        for (i=0,j=inputMatrix.length; i<j; i+=chunk) {
            temparray = inputMatrix.slice(i,i+chunk);
            outputMatrix.push(temparray)
        }
        return transpose(outputMatrix);
    }
    addRoundKey(state,key){
        let output = []
        for(let i = 0; i < state.length;i++){
            output.push([])
            for(let j = 0;j < state.length;j++){
                output[i].push(hexXOR(state[i][j],key[i][j]))
            }
        }
        return output
    }
    byteSub(state,inverse=false){
        let sbox = (inverse)?this.invsbox:this.sbox
        let output = []
        for(let i = 0; i<state.length;i++){
            output.push([])
            for(let j = 0;j < state.length;j++){
                let row = parseInt(state[i][j][0],16)
                let col = parseInt(state[i][j][1],16)
                output[i].push(sbox[row][col])
            }
        }
        return output
    }
    shiftRows(state,inverse){
        let output = []
        for (let index = 0; index < state.length; index++) {
            const element = state[index];
            output.push(circularLeftShift(state[index],index,inverse)) 
        }
        return state
    }
    mixColumns(state,inverse=false){
        let mcols = (inverse)?this.invMCols:this.mCols
        let output = [
            ['00','00','00','00'],
            ['00','00','00','00'],
            ['00','00','00','00'],
            ['00','00','00','00']
                ]
        for(let i = 0;i<state.length;i++) {
            for(let j = 0;j < state.length;j++){
               for(let k = 0; k < state.length;k++){
                    let product = hexMultiply(mcols[i][k],state[k][j])
                    output[i][j] = hexXOR(output[i][j],product)
               }
            }
        }
        return output
    }
    generateKeys(key){
        let kMatrix = transpose(this.key)
        let w = [kMatrix[0],kMatrix[1],kMatrix[2],kMatrix[3]]
        let x = 0
        for(let i = 4; i<44;i++){
            let temp = w[i-1].map((x)=>x)
            if(i%4 == 0){
                temp = circularLeftShift(temp,1)
                temp.forEach((elem,i,temp)=>{
                    let row  = parseInt(elem[0],16)     
                    let col = parseInt(elem[1],16)
                    temp[i] = this.sbox[row][col]
                }
              )
                temp[0] = hexXOR(temp[0],this.rcon[x])
                x++
            }
            w.push(arrayXOR(temp,w[i-4]))
        }
        let out = []
        for(let i = 0;i < w.length-3;i++){
            if(i%4 == 0)
                out.push(transpose([w[i],w[i+1],w[i+2],w[i+3]]))
        }
        return out
    }
    logMatrixToSteps(matrix){
        this.steps += '\n'
        for(let i = 0;i<matrix.length;i++){
            for(let j = 0;j < matrix.length;j++){
                this.steps += `${matrix[i][j]} `    
            }
            this.steps += '\n'
        }
        this.steps += '\n'
    }
    encrypt(){
        let keys = this.generateKeys(this.key) 
        let msg = this.state

        this.steps += `Starting Encryption:\n`
        this.steps += `Intial State:`
        this.logMatrixToSteps(msg)

        this.steps += `Intial Key:`
        this.logMatrixToSteps(keys[0])

        this.steps += `After Intial Add Round Key:`
        msg = this.addRoundKey(msg,keys[0])
        this.logMatrixToSteps(msg)

        for(let i = 1;i<11;i++){
            this.steps += `After Byte Sub:`
            msg = this.byteSub(msg)
            this.logMatrixToSteps(msg)

            this.steps +=`After Shift Rows:`
            msg = this.shiftRows(msg)
            this.logMatrixToSteps(msg)

            if(i != 10){
                this.steps += `After Mix Columns:`
                msg = this.mixColumns(msg)
                this.logMatrixToSteps(msg)
            }
            this.steps += `Key ${i}:`
            this.logMatrixToSteps(keys[i])
            this.steps += `After Add Round Key ${i}`
            msg = this.addRoundKey(msg,keys[i])
            this.logMatrixToSteps(msg)
        }
        return msg
    }
    decrypt(){
        let keys = this.generateKeys(this.key).reverse() 
        let msg = this.state

        this.steps += `Starting Decryption:\n`
        this.steps += `Intial State:`
        this.logMatrixToSteps(msg)

        this.steps += `Intial Key:`
        this.logMatrixToSteps(keys[0])

        this.steps += `After Intial Add Round Key:`
        msg = this.addRoundKey(msg,keys[0])
        this.logMatrixToSteps(msg)

        for(let i = 1;i<11;i++){
            this.steps +=`After Inverse Shift Rows:`
            msg = this.shiftRows(msg,true)
            this.logMatrixToSteps(msg)

            this.steps += `After Inverse Byte Sub:`
            msg = this.byteSub(msg,true)
            this.logMatrixToSteps(msg)

            this.steps += `Key ${i}:`
            this.logMatrixToSteps(keys[i])
            this.steps += `After Add Round Key ${i}`
            msg = this.addRoundKey(msg,keys[i])
            this.logMatrixToSteps(msg)

            if(i != 10){
                this.steps += `After Inverse Mix Columns:`
                msg = this.mixColumns(msg,true)
                this.logMatrixToSteps(msg)
            }
        }
        return msg

    }
}