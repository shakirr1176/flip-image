let lostMsg1 = 'Reload for play again'
let lostMsg2 = 'Tomare diye hobe na'
let winMsg = 'Congratuilation!'
let dope = document.querySelector('.dope')
let msgTime = document.querySelector('.msgTime')
let flipCount = document.querySelector('.flipCount')
let playTime = document.querySelector('.playTime')
let dopeCard = dope.querySelectorAll('.nai')
let targetDiv = []
let count = 0
let tranTime = 200  /*time in ms*/
let shakeAnimationTime = 300 /*time in ms*/
let gamestart = 6   /*time in second*/
let startAfter = gamestart
let remainingTime = 60 /*time in second*/
let isprossecing = false
let allClass = ['yellow','red','violet','pink','black','green','orange','gray','blue','deep','deepLight','light']
let newAllClass = []
let k = -1
let FlipNum = 50


flipCount.innerHTML = FlipNum
msgTime.innerHTML = gamestart + 's'
playTime.innerHTML = remainingTime + 's'


let shuffle = allClass.map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value)
for (let i = 0; i < dopeCard.length; i++) {

    k++

    if(k  == allClass.length){
        k = 0
    }

    newAllClass.push(shuffle[k])

}


for(let i=0; i<dopeCard.length; i++){
    dopeCard[i].className = `nai ${newAllClass[i]}`
    dopeCard[i].dataset['col'] = newAllClass[i]
}


document.querySelectorAll('.nai').forEach(el=>{
    el.children[0].style.transform = 'rotateY(90deg)'
    setTimeout(()=>{
        el.children[0].style.transition = `all ${tranTime}ms linear`;
        el.children[0].style.transform = 'rotateY(0deg)'
        isprossecing = true
    },startAfter*1000)
})

let gameStartTime = setInterval(()=>{
    gamestart--
    msgTime.innerHTML = gamestart + 's' 
    if(gamestart == 0){
        clearInterval(gameStartTime)
        msgTime.innerHTML = "Match the images"
    }
},1000)

setTimeout(()=>{
    let gameStartTime2 = setInterval(()=>{
        remainingTime--
        playTime.innerHTML = remainingTime + 's'
        if(remainingTime == 0 || FlipNum == 0){
            clearInterval(gameStartTime2)
            setTimeout(()=>{
                isprossecing = false
                document.querySelectorAll('.nai').forEach(el=>{
                    setTimeout(()=>{
                        el.children[0].style.transition = `all ${tranTime+1000}ms linear`;
                        el.children[0].style.opacity = '0'
                    },500)
                    
                })

            },tranTime+shakeAnimationTime)
            if(FlipNum > 0 && remainingTime == 0){
                msgTime.innerHTML = lostMsg2
            }
        }
    },1000)
},startAfter*1000)

dope.addEventListener('click',(e)=>{
    if(e.target.classList.contains('nai') && isprossecing){
         if(targetDiv[0] == undefined || targetDiv[0].dataset['col'] == e.target.dataset['col']){
            targetDiv.push(e.target)
            count++
            e.target.classList.remove('nai')
            e.target.children[0].style.transform = 'rotateY(90deg)'
        }

        else{
            isprossecing = false
            e.target.classList.remove('nai')
            e.target.children[0].style.transform = 'rotateY(90deg)'
            let ko = document.querySelectorAll(`.${targetDiv[0].dataset['col']}`)
            
            for(let i=0; i<targetDiv.length; i++){
                if(targetDiv.length != ko.length){
                    targetDiv[i].classList.add('shake')
                }
            }

            setTimeout(()=>{
                for(let i=0; i<targetDiv.length; i++){
                    if(targetDiv.length != ko.length){
                        targetDiv[i].classList.add('nai')
                        targetDiv[i].children[0].style.transform = 'rotateY(0deg)'
                        targetDiv[i].classList.remove('shake')
                        count--
                    }
            }

            targetDiv = [e.target]
            count++
            isprossecing = true
            },tranTime+shakeAnimationTime)
        }

        FlipNum--
        flipCount.innerHTML = FlipNum

        if(FlipNum == 0){
            if(remainingTime>0){
                msgTime.innerHTML = lostMsg1
            }

            document.querySelectorAll('.nai').forEach(el=>{
                setTimeout(()=>{
                    el.children[0].style.transition = `all ${tranTime+1000}ms linear`;
                    el.children[0].style.opacity = '0'
                },500)
                
            })

            setTimeout(()=>{
                isprossecing = false
            },tranTime+shakeAnimationTime)
        }
        console.log(targetDiv);
    }            

    setTimeout(()=>{
        if(count == 25){
            msgTime.innerHTML = winMsg
            isprossecing = false
    }
    },tranTime)
})



