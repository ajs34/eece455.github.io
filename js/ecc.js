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
const inverseMod = (a, m) => { 
    a = a % m
    for(let x = 1; x < m; x++){
        if((a*x)%m == 1)
            return x
    }
    return "No Inverse"
 }
const mod = (a,m)=>{
    if(a < 0)
        return (a%m) + m
    return a%m
}

const addPoints = (a,b,p,p1x,p1y,p2x,p2y) =>{
    let steps = ''
    let m = 0 
    if(p1x == p2x && p2y == p1y){
        let mUpper = mod(3*(p1x**2) + a,p)
        let mLower = mod(2*p1y,p)
        m = mod((mUpper*inverseMod(mLower,p)),p)
    }
    else{
        let mUpper = mod(p2y - p1y,p)
        let mLower = mod(p2x - p1x,p)
        m = mod((mUpper*inverseMod(mLower,p)),p)
    }
    let x3 = mod(m**2 - p1x - p2x,p)
    let y3  = mod(m*(p1x - x3) - p1y,p)
    return [x3,y3]
 }

 const addSelf = (a,b,p,p1x,p1y) =>  {
    return addPoints(a,b,p,p1x,p1y,p1x,p1y)
 }

 const addSelfNtimes = (a,b,p,p1x,p1y,n) =>{
    let x = p1x
    let y = p1y
    for(let i = 0; i < n; i++){
        let arr = addPoints(a,b,p,x,y,p1x,p1y)
        x = arr[0]
        y = arr[1]
    }
    return [x,y]
 }

const multiplyPoint = (a,b,p,x,y,n)=>{
    return addSelfNtimes(a,b,p,x,y,n-1)
}
const encrypt = (a,b,p,pmx,pmy,gx,gy,k,n)=>{
    let  kG = multiplyPoint(a,b,p,gx,gy,k) 
    let Pb = multiplyPoint(a,b,p,gx,gy,n)
    let kPb = multiplyPoint(a,b,p,Pb[0],Pb[1],k)
    let sum = addPoints(a,b,p,pmx,pmy,kPb[0],kPb[1])
    return [kG,sum]
}
const decrypt = (a,b,p,cmx1,cmy1,cmx2,cmy2,n)=>{
   let nC1 = multiplyPoint(a,b,p,cmx1,cmy1,n) 
   let sum = addPoints(a,b,p,cmx2,cmy2,nC1[0],-nC1[1])
   return sum
}
console.log(decrypt(2,3,67,35,1,21,44,4))