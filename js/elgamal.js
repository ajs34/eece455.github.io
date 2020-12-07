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
 const elGamal = (a,q,xa,r,m)=>{
    let steps = ``
    steps += `Sending message m steps:\n`
    let ya = modularExponentation(a,xa,q)
    steps += `ya = a^xa mod q = ${a}^${xa} mod ${q} = ${ya}\n`
    let k = modularExponentation(ya,r,q)
    steps += `K = ya^r mod q = ${ya}^${r} mod ${q} = ${k}\n`
    let c1 = modularExponentation(a,r,q)
    steps += `C1 = a^r mod q = ${a}^${r} mod ${q} = ${c1}\n`
    let c2 = modularExponentation(k*m,1,q)
    steps += `C2 = KM mod q = ${k*m} mod ${q} = ${c2}\n`
    steps += `In order to recover the message:\n`
    k = modularExponentation(c1,xa,q)
    let kInverse = inverseMod(k,q)
    steps += `Need to recover K:\n`
    steps += `K = C1^xa mod q = ${c1}^${xa} mod ${q} = ${k}\n`
    steps += `Kinverse = ${kInverse}\n`
    steps += `M = C2 K^-1 mod q = ${c2}.${kInverse} mod ${q} = ${modularExponentation(c2*kInverse,1,q)}\n`
    return steps
 }
 elGamal(10,19,5,6,17)