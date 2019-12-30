let ary = ["012","345","678","036","258","678","048","147"]
export const checkWinner = (board) =>{
    for(let i of ary){
        let joint = `${board[i[0]]}${board[i[1]]}${board[i[2]]}`
        if(joint === "xxx" || joint ==="ooo"){
            return true
        }
        else{
            console.log(false)
        }
    }
}