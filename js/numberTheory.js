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

const chineseRemainderTheorem = (M,m)=>{
    mArr = m.split(',')
    MArr = []
    mArr.forEach(m => {

    })
    console.log(mArr)
}