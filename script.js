function play(cells,weapon) {
    cells.forEach(cell => {cell.classList.add('startedGame')})
    cells.forEach(cell => {
        cell.addEventListener('click', function cellClickHandler(e) {
            const clickedCell = e.target
            console.log(clickedCell.classList)
            if (!clickedCell.classList.contains("clicked") && !clickedCell.classList.contains("clickedAI")) {
                clickedCell.innerHTML = "<i class=\"icon clicked fa-xl fa-solid fa-" + weapon + " \"></i>"
                clickedCell.classList.add("clicked")
                if(checkValid(cells))
                    playAI(cells, weapon)
            }
            // else
                // alert("Already clicked!")

        })
    })
}
function endGame(cells,frecv,user){
    cells.forEach(cell => {
        if(!cell.classList.contains("clicked"))
            cell.classList.add("clicked")
    })
    let color = user === 'user' ? 'greenFinish' : 'redFinish'
    if(user === 'draw')
       color = 'neutralFinish'


    if((frecv[1] && frecv[2] && frecv[3])){
        cells.forEach(cell => {
            if(cell.classList.contains('1'))
                cell.classList.add('finishGame', color)
            if(cell.classList.contains('2'))
                cell.classList.add('finishGame', color)
            if(cell.classList.contains('3'))
                cell.classList.add('finishGame', color)
        })
    }
    if((frecv[4] && frecv[5] && frecv[6])){
        cells.forEach(cell => {
            if(cell.classList.contains('4'))
                cell.classList.add('finishGame', color)
            if(cell.classList.contains('5'))
                cell.classList.add('finishGame', color)
            if(cell.classList.contains('6'))
                cell.classList.add('finishGame', color)
        })
    }
    if((frecv[7] && frecv[8] && frecv[9])){
        cells.forEach(cell => {
            if(cell.classList.contains('7'))
                cell.classList.add('finishGame', color)
            if(cell.classList.contains('8'))
                cell.classList.add('finishGame', color)
            if(cell.classList.contains('9'))
                cell.classList.add('finishGame', color)
        })
    }
    if((frecv[1] && frecv[4] && frecv[7])){
        cells.forEach(cell => {
            if(cell.classList.contains('1'))
                cell.classList.add('finishGame', color)
            if(cell.classList.contains('4'))
                cell.classList.add('finishGame', color)
            if(cell.classList.contains('7'))
                cell.classList.add('finishGame', color)
        })
    }
    if((frecv[2] && frecv[5] && frecv[8])){
        cells.forEach(cell => {
            if(cell.classList.contains('2'))
                cell.classList.add('finishGame', color)
            if(cell.classList.contains('5'))
                cell.classList.add('finishGame', color)
            if(cell.classList.contains('8'))
                cell.classList.add('finishGame', color)
        })
    }
    if((frecv[3] && frecv[6] && frecv[9])){
        cells.forEach(cell => {
            if(cell.classList.contains('3'))
                cell.classList.add('finishGame', color)
            if(cell.classList.contains('6'))
                cell.classList.add('finishGame', color)
            if(cell.classList.contains('9'))
                cell.classList.add('finishGame', color)
        })
    }
    if((frecv[1] && frecv[5] && frecv[9])){
        cells.forEach(cell => {
            if(cell.classList.contains('1'))
                cell.classList.add('finishGame', color)
            if(cell.classList.contains('5'))
                cell.classList.add('finishGame', color)
            if(cell.classList.contains('9'))
                cell.classList.add('finishGame', color)
        })
    }
    if((frecv[3] && frecv[5] && frecv[7])){
        cells.forEach(cell => {
            if(cell.classList.contains('3'))
                cell.classList.add('finishGame', color)
            if(cell.classList.contains('5'))
                cell.classList.add('finishGame', color)
            if(cell.classList.contains('7'))
                cell.classList.add('finishGame', color)
        })
    }

}

function checkValidAI(cells){
    const clickedCellsAI = []
    cells.forEach((cell,index) => {
       if(cell.classList.contains("clickedAI"))
            clickedCellsAI.push(index + 1)
    })
    const aux = clickedCellsAI.join('')
    const frecv = [0,0,0,0,0,0,0,0,0,0]
    for(let i = 0; i < aux.length; i++)
        frecv[parseInt(aux[i])]++
    if((frecv[1] && frecv[2] && frecv[3]) || (frecv[4] && frecv[5] && frecv[6]) ||
        (frecv[7] && frecv[8] && frecv[9]) || (frecv[1] && frecv[4] && frecv[7]) ||
        (frecv[2] && frecv[5] && frecv[8]) || (frecv[3] && frecv[6] && frecv[9]) ||
        (frecv[1] && frecv[5] && frecv[9]) || (frecv[3] && frecv[5] && frecv[7])) {
        //CPU WINS
        document.querySelector(".CPUalert").classList.add("CPUalertVisible")
        endGame(cells,frecv,'CPU')
        return 0
    }
    return 1
}


function checkValid(cells){
    const clickedCells = []
    cells.forEach((cell,index) => {
        if(cell.classList.contains("clicked"))
                clickedCells.push(index + 1)
    })
    const aux = clickedCells.join('')
    console.log("USER- ",aux)
    const frecv = [0,0,0,0,0,0,0,0,0,0]
    for(let i = 0; i < aux.length; i++)
        frecv[parseInt(aux[i])]++
        if((frecv[1] && frecv[2] && frecv[3]) || (frecv[4] && frecv[5] && frecv[6]) ||
            (frecv[7] && frecv[8] && frecv[9]) || (frecv[1] && frecv[4] && frecv[7]) ||
            (frecv[2] && frecv[5] && frecv[8]) || (frecv[3] && frecv[6] && frecv[9]) ||
            (frecv[1] && frecv[5] && frecv[9]) || (frecv[3] && frecv[5] && frecv[7])) {
            //USER WINS
            document.querySelector(".YOUalert").classList.add("YOUalertVisible")
            endGame(cells,frecv,'user');
            return 0
        }
    return 1
}

function playAI(cells,userWeapon){
    let weapon = ''
    userWeapon === 'x' ? weapon = '0' : weapon = 'x'

    let num = 0
    //Check how many cells are left
    let available = 9
    cells.forEach(cell => {
        if(cell.classList.contains("clicked") || cell.classList.contains("clickedAI"))
            available--
    })
    if(available > 1) {
        do {
            num = Math.floor(Math.random() * 9) + 1
        } while (cells[num - 1].classList.contains("clicked") || cells[num - 1].classList.contains("clickedAI"))

        cells[num - 1].classList.add("clickedAI")
        cells[num - 1].innerHTML = "<i class=\"icon clickedAI fa-xl fa-solid fa-" + weapon + " \"></i>"
    }

    checkValidAI(cells)
    if(available === 0) {
        //DRAW
        document.querySelector(".DRAWalert").classList.add("DRAWalertVisible")
        endGame(cells,[0,1,1,1,1,1,1,1,1,1], 'draw')
    }
}



let userWeapon = ''

const cells = document.querySelectorAll(".cell")
const playBtn = document.querySelector(".playBtn")
const weapons = document.querySelectorAll(".weapon")
weapons.forEach(weapon => {
    console.log(weapon)
    weapon.addEventListener("click", e => {
        const clickedWeapon = e.target
        //Check if there is another weapons elected to deselect it
        weapons.forEach(weapon => {
            if(weapon.classList.contains("selectedWeapon"))
                weapon.classList.remove("selectedWeapon")
        })
        clickedWeapon.classList.add("selectedWeapon")
        //Remove the alert popup
        const alertWeapon = document.querySelector(".alertWeapon")
        alertWeapon.classList.remove("alertWeaponVisible")
        if(clickedWeapon.classList.contains("fa-x"))
            userWeapon = "x"
        else
            userWeapon = "0"
    })
})
playBtn.addEventListener("click", () => {
    if(userWeapon === '') {
        //Add the alert popup
        const alertWeapon = document.querySelector(".alertWeapon")
        alertWeapon.classList.add("alertWeaponVisible")
    }
    else
        play(cells,userWeapon)})
