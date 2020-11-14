function chunkString(str, length) {
  return str.match(new RegExp('.{1,' + length + '}', 'g'));
}
function stringXOR(str1,str2){
    let output = ''
    for(let i = 0;i<str1.length;i++){
        if(str1[i] == str2[i]){
            output += '0'
        }
        else{
            output += '1'
        }
    }
    return output
}
function leftShift(str,shift){
    let arr = Array.from(str)
    let x = arr.splice(0,shift)
    return [...arr,x].join('').replace(',','')
}
function hex2bin(hex){
    let output = ''
    hex.split('').forEach(elem=>{
        output += parseInt(elem,16).toString(2).padStart(4,'0')
    })
    return output
}
function bin2hex(bin){
    let chunks = chunkString(bin,4)
    let output = ''
    chunks.forEach(chunk=>{
        output += parseInt(chunk,2).toString(16)
    })
    return output
}
class DES{
    constructor(plaintext,key){
        this.plaintext = hex2bin(plaintext).padStart(64,'0')
        this.key = hex2bin(key).padStart(64,'0') 
        this.ip = [57, 49, 41, 33, 25, 17,  9,  1, 59, 51, 43, 35, 27, 19, 11,  3, 61,53, 45, 37, 29, 21, 13,  5, 63, 55, 47, 39, 31, 23, 15,  7, 56, 48,40, 32, 24, 16,  8,  0, 58, 50, 42, 34, 26, 18, 10,  2, 60, 52, 44,36, 28, 20, 12,  4, 62, 54, 46, 38, 30, 22, 14,  6]
        this.e = [31,  0,  1,  2,  3,  4,  3,  4,  5,  6,  7,  8,  7,  8,  9, 10, 11, 12, 11, 12, 13, 14, 15, 16, 15, 16, 17, 18, 19, 20, 19, 20, 21, 22, 23, 24, 23, 24, 25, 26, 27, 28, 27, 28, 29, 30, 31,  0]
        this.p = [15,  6, 19, 20, 28, 11, 27, 16,  0, 14, 22, 25,  4, 17, 30,  9,  1,7, 23, 13, 31, 26,  2,  8, 18, 12, 29,  5, 21, 10,  3, 24]
        this.sbox = []
        this.sbox.push([[14,4,13,1,2,15,11,8,3,10,6,12,5,9,0,7],[0,15,7,4,14,2,13,1,10,6,12,11,9,5,3,8],[4,1,14,8,13,6,2,11,15,12,9,7,3,10,5,0],[15,12,8,2,4,9,1,7,5,11,3,14,10,0,6,13]])
        this.sbox.push([[15,1,8,14,6,11,3,4,9,7,2,13,12,0,5,10],[3,13,4,7,15,2,8,14,12,0,1,10,6,9,11,5],[0,14,7,11,10,4,13,1,5,8,12,6,9,3,2,15],[13,8,10,1,3,15,4,2,11,6,7,12,0,5,14,9]])
        this.sbox.push([[10,0,9,14,6,3,15,5,1,13,12,7,11,4,2,8],[13,7,0,9,3,4,6,10,2,8,5,14,12,11,15,1],[13,6,4,9,8,15,3,0,11,1,2,12,5,10,14,7],[1,10,13,0,6,9,8,7,4,15,14,3,11,5,2,12]])
        this.sbox.push([[7,13,14,3,0,6,9,10,1,2,8,5,11,12,4,15],[13,8,11,5,6,15,0,3,4,7,2,12,1,10,14,9],[10,6,9,0,12,11,7,13,15,1,3,14,5,2,8,4],[3,15,0,6,10,1,13,8,9,4,5,11,12,7,2,14]])
        this.sbox.push([[2,12,4,1,7,10,11,6,8,5,3,15,13,0,14,9],[14,11,2,12,4,7,13,1,5,0,15,10,3,9,8,6],[4,2,1,11,10,13,7,8,15,9,12,5,6,3,0,14],[11,8,12,7,1,14,2,13,6,15,0,9,10,4,5,3]])
        this.sbox.push([[12,1,10,15,9,2,6,8,0,13,3,4,14,7,5,11],[10,15,4,2,7,12,9,5,6,1,13,14,0,11,3,8],[9,14,15,5,2,8,12,3,7,0,4,10,1,13,11,6],[4,3,2,12,9,5,15,10,11,14,1,7,6,0,8,13]])
        this.sbox.push([[4,11,2,14,15,0,8,13,3,12,9,7,5,10,6,1],[13,0,11,7,4,9,1,10,14,3,5,12,2,15,8,6],[1,4,11,13,12,3,7,14,10,15,6,8,0,5,9,2],[6,11,13,8,1,4,10,7,9,5,0,15,14,2,3,12]])
        this.sbox.push([[13,2,8,4,6,15,11,1,10,9,3,14,5,0,12,7],[1,15,13,8,10,3,7,4,12,5,6,11,0,14,9,2],[7,11,4,1,9,12,14,2,0,6,10,13,15,3,5,8],[2,1,14,7,4,10,8,13,15,12,9,0,3,5,6,11]])
        this.inv_ip=[39,  7, 47, 15, 55, 23, 63, 31, 38,  6, 46, 14, 54, 22, 62, 30, 37,5, 45, 13, 53, 21, 61, 29, 36,  4, 44, 12, 52, 20, 60, 28, 35,  3, 43, 11, 51, 19, 59, 27,34,  2, 42, 10, 50, 18, 58, 26, 33,  1, 41,9, 49, 17, 57, 25, 32,  0, 40,  8, 48, 16, 56, 24]
        this.pc_2=[13, 16, 10, 23,  0,  4,  2, 27, 14,  5, 20,  9, 22, 18, 11,  3, 25,7, 15,  6, 26, 19, 12,  1, 40, 51, 30, 36, 46, 54, 29, 39, 50, 44,32, 47, 43, 48, 38, 55, 33, 52, 45, 41, 49, 35, 28, 31]
        this.pc_1=[56, 48, 40, 32, 24, 16,  8,  0, 57, 49, 41, 33, 25, 17,  9,  1, 58,50, 42, 34, 26, 18, 10,  2, 59, 51, 43, 35, 62, 54, 46, 38, 30, 22,14,  6, 61, 53, 45, 37, 29, 21, 13,  5, 60, 52, 44, 36, 28, 20, 12,4, 27, 19, 11,  3]
        this.keyShiftSchedule = [1,1,2,2,2,2,2,2,1,2,2,2,2,2,2,1]
        this.steps = '';
        this.keys = this.generateKeys()
    }
    permute(input,table){
        let output = ''
        for(let i = 0;i < table.length;i++){
            output += input[table[i]];
        }
        return output;
    }
    applyTable(input,tableName){
        try {
           if(tableName == 'ip')
                return this.permute(input,this.ip)
            else if(tableName == 'e')
                return this.permute(input,this.e)
            else if(tableName == 'pc2')
                return this.permute(input,this.pc_2)
            else if(tableName == 'pc1')
                return this.permute(input,this.pc_1)
            else if(tableName == 'invip')
                return this.permute(input,this.inv_ip)
            else if(tableName == 'p')
                return this.permute(input,this.p)
        } catch (error) {
            
        }
    }
    performSubBox(input){
        let chunks = chunkString(input,6);
        let output = [];
        let box = 0;
        chunks.forEach(chunk => {
            let rowIdx = parseInt(chunk[0]+ chunk[chunk.length-1] , 2)
            let colIdx = parseInt(chunk[1] + chunk[2] + chunk[3] + chunk[4] , 2)
            output.push(this.sbox[box][rowIdx][colIdx].toString(2).padStart(4,'0'))
            box++;
        });

        return output.join('')
    }
    generateKeys(){
        this.steps += 'Key Generation\n'
        let keys = []
        let initialKey = this.applyTable(this.key,'pc1')
        this.steps += `After intial PC1:${bin2hex(initialKey)}\n`
        let left = chunkString(initialKey,28)[0]
        let right = chunkString(initialKey,28)[1]
        this.steps += `Left:${bin2hex(left)}\nRight:${bin2hex(right)}\n`
        this.keyShiftSchedule.forEach(shift=> {
            this.steps += `Apply ciruclar left shift of ${shift} bits.\n`
            left = leftShift(left,shift) 
            right = leftShift(right,shift)
            this.steps += `Left:${bin2hex(left)}\nRight:${bin2hex(right)}\n`
            let newKey = this.applyTable(left+right,'pc2')
            this.steps += `After PC2:${bin2hex(newKey)}\n`
            keys.push(newKey)
        });
        return keys;
    }
    encrypt(inverse = false){
        if(inverse)
            this.steps += `Performing Decryption:\n`
        else
            this.steps += `Performing Encryption:\n`
        let keys = (inverse)?this.keys.reverse():this.keys 
        let plaintext =  this.applyTable(this.plaintext,'ip')
        let left = '' 
        let right = ''
        let newRight = '';
        let newLeft = '';
        for(let i = 0;i < 16;i++){
            left = chunkString(plaintext,32)[0]
            right = chunkString(plaintext,32)[1]

            newRight = this.applyTable(right,'e')
            this.steps += `E(R) = ${bin2hex(newRight)}\n`
            newRight = stringXOR(newRight,keys[i])          
            this.steps += `E(R) xor K = A = ${bin2hex(newRight)}\n`
            newRight = this.performSubBox(newRight)
            this.steps += `S(A) = B = ${bin2hex(newRight)}\n`
            newRight = this.applyTable(newRight,'p')
            this.steps += `P(B) = ${bin2hex(newRight)}\n`
            newRight = stringXOR(left,newRight)
            this.steps += `P(B)xorL${i} = ${bin2hex(newRight)}\n`
            newLeft = right 
            plaintext = newLeft+newRight
            this.steps += `L${i}R${i}: ${bin2hex(plaintext)}\n`
        }
        this.steps += `Performing 32 bit rotation:\n${bin2hex(newRight+newLeft)}\n`
        plaintext = this.applyTable(newRight+newLeft,'invip')
        this.steps += `Performing inverse ip:\nFinal Result: ${bin2hex(plaintext)}` 
        return bin2hex(plaintext)
    }
}