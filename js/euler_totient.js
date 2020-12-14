const eulerTotient = (n,arr=false)=>{
    let phi = new Array(n+1).fill(0)
    for (let i = 1; i <=n; i++){
        phi[i] = i
    }
    for(let p = 2; p <= n; p++){
        if(phi[p] == p){
            phi[p] = p-1
            for(let i = 2*p;i<=n; i+=p){
                phi[i] = (phi[i]/p)*(p-1)
            }
        }
    }
    return phi[phi.length-1]
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
const gcd = (a,b)=>{
    if(b == 0)
        return a
    return gcd(b,a % b)
}
const eulerArr = (n)=>{
    let euler = []
   for(let i = 1;i<n;i++) {
       if(gcd(n,i) == 1)
            euler.push(i)
   }
   return euler
}
const isPrimtive= (a,n)=>{
    let euler = eulerArr(n)
    if(modularExponentation(a,n-1,n) != 1)
        return false
    for(let i = 0; i < euler.length-1;i++){
        if(modularExponentation(a,euler[i],n) == 1)
            return false
    }
    return true
}
const findPrimitive = (n)=>{
    let arr = []
    for(let i = 0;i<n;i++){
       if(isPrimtive(i,n)) 
            arr.push(i)
    }
    return arr
}