const eulerTotient = (n)=>{
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