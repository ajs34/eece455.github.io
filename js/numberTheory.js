const gcd = (a,b)=>{
    if(b == 0)
        return a
    return gcd(b,a % b)
}

const modularExponentation = (a,n,m)=>{
    //computes a^n mod m
    let b = n.toString(2)
    let f = 1
    b.split('').forEach(bit=> {
        f = (f*f) % m
        if(bit == 1){
            f = (f*a) % m
        }
    });
    return f
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const millerRabin = (n) => {
    if(n == 1 || n % 2 == 0)
        return "not prime"

    if(n == 2 || n == 3)
        return "prime"

    let r = 0,s = n-1
    let steps = ''
    while(s % 2 == 0){
        r++
        s = s/2
    }
    steps += `${n-1} = (2^(${r}))*(${s})\n`
    let a = getRandomInt(2,n-2)
    console.log(a)
    if(modularExponentation(a,s,n) == 1){
        steps += `${a}^(${r}) mod ${n}\n`
        steps += "maybe prime"
        return steps
    }
    for(let j = 0;j < r;j++){
        steps += `${a}^((${2**j})*(${s})) mod ${n} == ${modularExponentation(a,(2**j)*s,n)}\n`
        if(modularExponentation(a,(2**j)*s,n) == n-1){
            steps += "maybe prime"
            return steps
        }
    }
    steps += "\n composite"
    return steps
}

const inverseMod = (a, m) => { 
    a = a % m
    for(let x = 1; x < m; x++){
        if((a*x)%m == 1)
            return x
    }
    return "No Inverse"
 }

const chineseRemainderTheorem = (a,b)=>{
   let steps = '' 
   a = a.split(',').map(x => +x)
   b = b.split(',').map(x => +x)
   let M = b.reduce((product,num)=>{
        return product*num
   })
   for(let i = 0; i < a.length;i++){
       steps += `M${i} = ${M}/${b[i]}\n`
   }
   let mArr = []
   let mInverseArr = []
   let cArr = []
   let x = 0
   b.forEach(elem =>{
       mArr.push(M/elem)
   })
   mArr.forEach((elem,idx)=>{
       mInverseArr.push(inverseMod(elem,b[idx]))
   })
   mInverseArr.forEach((elem,idx)=>{
       cArr.push(elem*mArr[idx])
   })
   for(let i = 0; i < a.length;i++){
       steps += `M^(-1)${i} = ${mArr[i]}^(-1) mod ${b[i]} = ${mInverseArr[i]} \n`
   }
   for(let i = 0; i < a.length;i++){
       steps += `C${i} = ${mInverseArr[i]} * ${b[i]} = ${cArr[i]}\n`
   }
   steps += 'X = '
   a.forEach((elem,idx)=>{
      steps += `${elem}*${cArr[idx]} + ` 
      x += elem*cArr[idx] 
   })
   steps = steps.slice(0,-2)
   steps += `mod ${M} = ${x%M}\n`
   return steps
}
const discreeteLog = (a,b,m) =>{
    if(a >= m)
        return "Does not exist"
    for(let i = 0; i <= m; i++){
        if(modularExponentation(b,i,m) == a)
            return i
    }
    return "Does not exist"
}