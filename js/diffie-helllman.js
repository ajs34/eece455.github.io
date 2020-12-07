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

const diffieHellman = (q,a,xa,xb) =>{
    let steps = ''
    let ya = modularExponentation(a,xa,q)
    let yb = modularExponentation(a,xb,q)
    steps += `ya = a^xa mod q = ${a}^${xa} mod ${q} = ${ya}\n`
    steps += `yb = a^xb mod q = ${a}^${xb} mod ${q} = ${yb}\n`
    kab = modularExponentation(yb,xa,q)
    steps += `KAB = yb^xa mod q = ya^xb mod q = ${kab}\n`
    return steps
}