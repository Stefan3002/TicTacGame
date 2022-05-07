function play(cells,weapon) {
    console.log(weapon)
    cells.forEach(cell => {
        cell.addEventListener('click', function cellClickHandler(e) {
            const clickedCell = e.target
            console.log(clickedCell.classList)
            if (!clickedCell.classList.contains("clicked") && !clickedCell.classList.contains("clickedAI")) {
                clickedCell.innerHTML = "<i class=\"icon clicked fa-xl fa-solid fa-" + weapon + " \"></i>"
                clickedCell.classList.add("clicked")
                checkValid(cells)
                playAI(cells, weapon)
            }
            // else
                // alert("Already clicked!")

        })
    })
}

function checkValidAI(cells){
    const clickedCellsAI = []
    cells.forEach((cell,index) => {
       if(cell.classList.contains("clickedAI"))
            clickedCellsAI.push(index + 1)
    })
    const aux = clickedCellsAI.join('')
    console.log(aux)
    if(aux.includes('123') || aux.includes('456') || aux.includes('789') || aux.includes('147') ||
        aux.includes('258') || aux.includes('369') || aux.includes('159') || aux.includes('357')) {
        //CPU WINS
        document.querySelector(".CPUalert").classList.add("CPUalertVisible")
        // cells.forEach(cell => {
        //     cell.removeEventListener('click',cellClickHandler)
        // })
    }
}


function checkValid(cells){
    const clickedCells = []
    cells.forEach((cell,index) => {
        if(cell.classList.contains("clicked"))
                clickedCells.push(index + 1)
    })
    const aux = clickedCells.join('')
    console.log(aux)
    if(aux.includes('123') || aux.includes('456') || aux.includes('789') || aux.includes('147') ||
        aux.includes('258') || aux.includes('369') || aux.includes('159') || aux.includes('357'))
            document.querySelector(".YOUalert").classList.add("YOUalertVisible")
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
    if(available === 0)
        document.querySelector(".DRAWalert").classList.add("DRAWalertVisible")
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