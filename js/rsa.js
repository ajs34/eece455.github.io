const modularExponentation = (a,n,m)=>{
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

const inverseMod = (a, m) => { 
    a = a % m
    for(let x = 1; x < m; x++){
        if((a*x)%m == 1)
            return x
    }
    return "No Inverse"
 }

const rsaEncrypt = (p,q,e,m)=>{
    let steps = ''
    let n = p*q
    steps += `n = p*q = ${p}*${q} = ${n}\n`
    eulerN = (p-1)*(q-1)
    steps += `euler(n) = (p-1)*(q-1) = ${p-1} * ${q-1} = ${eulerN}\n`
    let d = inverseMod(e,eulerN)
    steps += `e.d = 1 mod ${n} => d = ${d}\n`
    let c = modularExponentation(m,e,n)
    steps += `C = M^e mod n = ${m}^${e} mod ${n} = ${c}`
    return steps
}
const rsaDecrypt = (p,q,d,c) =>{
    let steps = ''
    let n = p*q
    steps += `n = p*q = ${p}*${q} = ${n}\n`
    eulerN = (p-1)*(q-1)
    steps += `euler(n) = (p-1)*(q-1) = ${p-1} * ${q-1} = ${eulerN}\n`
    let e = inverseMod(d,eulerN)
    steps += `e.d = 1 mod ${n} => e = ${e}\n`
    let m = modularExponentation(c,d,n)
    steps += `C = C^d mod n = ${c}^${d} mod ${n} = ${m}`
    return steps
}