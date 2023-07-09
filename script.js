



let array = [0, 0, 0, 0];
let finalResult = []
let matA = []
let matB = []


let matrix = document.getElementById('matrix')
let trigger
function board(){
    let rows = document.getElementById("rows").value
    let columns = document.getElementById("columns").value
    

    function display(){
    matrix.innerHTML = ''
    order = 0
    array = []
        for (let i = 0; i < rows; i++) {
            
            for (let j = 0; j < columns; j++) {
                index = "a" + (i + 1) + (j + 1);
                order++;
                let item = `<div><input type=\"text\" id="${index}" onblur="arrayPush(${order}, ${index}); checkItems(${index})" autocomplete="off"></div>`
                array.push(0)
                matrix.innerHTML += item ;
                
            
            }
        
        }
        

        matrix.style.gridTemplateRows = `repeat(${rows}, 30px)`
        matrix.style.gridTemplateColumns = `repeat(${columns}, 30px)`

    }

    function check(){
        if (rows > 5) {
            alert("Too many rows")
            rows = 0
            document.getElementById("rows").value = ""

        }
        if (columns > 5) {
            alert("Too many columns")
            columns = 0
            document.getElementById("columns").value = ""
        }


    }

    function sideOperation(){
        let square = document.getElementsByClassName('square')
        for (let i = 0; i < square.length; i++) {
            if (rows != columns || rows > 3) {
                square[i].style.display = 'none'
            }
            else{
                square[i].style.display = 'block'
            }
            
        }

        if (rows == 2 && columns == 2) {
            document.querySelector(".cofactor").style.display = 'none'
        }else if (rows == 3 && columns == 3) {
            
        
            document.querySelector(".cofactor").style.display = 'block'
        }

        if (rows == 0 || columns == 0) {
            document.querySelector(".scalar").style.display = "none" 
        }else{
            document.querySelector(".scalar").style.display = "block" 
        }
    }





    sideOperation()
    check()
    display()

    
}


function checkItems(e){
    
    let box = e.value;
    
    if (Number.isInteger(parseInt(box*1)) == false) {
        alert("Enter a number")
        e.value = ""
    }

}

function arrayPush(order, index){
    array[order-1] = index.value * 1
    
}

function result(){
    matrix.innerHTML= ""
    for (let i = 0; i < array.length; i++) {
        item = `<div><div class="item">${array[i]}</div></div>`;
        matrix.innerHTML += item;
    }
    document.getElementById('sideOperation').style.display = 'none'
}

function scalar(){
    let multiplier = prompt("Enter a multiplier: ")
    for (let i = 0; i < array.length; i++) {
        array[i] *= multiplier
        
    }
    result()
    console.log(array)
}

function transpose(){
    let rows = document.getElementById("rows").value
    let columns = document.getElementById("columns").value
    
    function change(from, to){
        let element1 = array.splice(from, 1)[0];
        let element2 = array.splice((to - 1), 1)[0];


        array.splice((to - 1), 0, element1);
        array.splice(from, 0, element2);
    }

    if (rows == 2 && columns == 2) {
        change(1, 2)
        result()
    }
    else if (rows == 3 && columns == 3){
        change(1, 3)
        change(2, 6)
        change(5, 7)
        result()
    }
    else{
        alert("Not Proportional")
    }

}

function det2(arr) {
    let det = (arr[0] * arr[3]) - (arr[1] * arr[2])
    return det
}

function factor(e){
    let factor = array[e]
    let array2 = [...array]
    if(e < 3){
        array2.splice(0, 3)
        array2.splice((e), 1)
        array2.splice((e + 2), 1)
    }
    else if (e < 6) {
        array2.splice(3, 3)
        array2.splice((e), 1)
        array2.splice((e - 3), 1)
    }
    else{
        array2.splice(6, 3)
        array2.splice((e - 3), 1)
        array2.splice((e - 6), 1)
    }

    

    return factor * det2(array2)
}

function determinant(){
    let rows = document.getElementById("rows").value
    let columns = document.getElementById("columns").value
    let answer

    if (rows == 2 && columns == 2) {
        
        answer = det2(array)

        
    }

    if (rows == 3 && columns == 3) {
        let A = factor(0)
        let B = factor(1)
        let C = factor(2)

        answer = A - B + C

        
    }


    matrix.style.gridTemplateRows = `repeat(1, 30px)`
    matrix.style.gridTemplateColumns = `repeat(1, 30px)`
    array = []
    array[0] = answer
    result()
}

function cofactorElements(){
    let array2 = []
    for (let i = 0; i < array.length; i++) {
        if (i % 2 == 0 || i == 0) {
            array2[i] = factor(i)
        }
        else{
            array2[i] = -1 * (factor(i))
        }
        
    }

    array = []
    array = array2
}

function by2Adjoint(){
    array[1] *= -1
    array[2] *= -1

    let element1 = array.splice(0, 1);
    let element2 = array.splice(-1, 1);
    
    array.splice(0, 0, element2);
    array.splice(3, 0, element1);

    result()
}

function cofactor(){
    cofactorElements()
    result()
}

function adjoint() {
    let rows = document.getElementById("rows").value
    let columns = document.getElementById("columns").value


    if (rows == 2 && columns == 2) {
        by2Adjoint()
    }
    if (rows == 3 && columns == 3) {
        cofactorElements()
        transpose() 
    }

    
}


function multiplication1() {
    let rows = document.getElementById("rows").value
    let columns = document.getElementById("columns").value


    document.getElementById("rows").value = columns
    document.getElementById("rows").readOnly = true
    document.getElementById("columns").readOnly = false

    document.getElementById('multiplication').remove()
    document.getElementById('addition').remove()
    document.getElementById('subtraction').remove()
    
    function splitArray(arr, chunkSize){
        let result = [];

        for(let i = 0; i < arr.length; i += chunkSize) {
            let chunk = array.slice(i, i + chunkSize)

            result.push(chunk)
            
        }
        return result;
    }

    matA = splitArray(array, parseInt(columns))


    console.log(matA)
    
    

}

function multiplication2() {
    let rows = parseInt(document.getElementById("rows").value)
    let columns = parseInt(document.getElementById("columns").value)
    let a = -1
    let chunk = []

    for (let i = 0; i < columns; i++) {
        a++
        for (let j = a; j < rows*columns; j += columns) {
            
            chunk.push(array[j])
            
            
        }
       matB.push(chunk)
       chunk = []
    }

    console.log(matB)
}

function multiplicationResult() {
        let rows = parseInt(document.getElementById("rows").value)
        let columns = parseInt(document.getElementById("columns").value)
        let sth = []
        
        for (let i = 0; i < matA.length; i++) {
            for (let j = 0; j < matB.length; j++) {
                for (let k = 0; k < rows; k++) {
                    
                    chunk = matA[i][k] * matB[j][k]
                    sth.push(chunk)
                }
                
                
            }
            
        }

        for (let i = 0; i < sth.length; i+= rows) {
           finalResult.push(sth.slice(i, i + rows))
        }

        function summation(array, num) {
            let sum = 0
        

            for (let i = 0; i < rows; i++) {
                sum += array[num][i]
                
            }
            return sum
        }

        for (let i = 0; i < finalResult.length; i++) {
            finalResult[i] = summation(finalResult, i)
            
        }
    
    console.log(finalResult)
}

 function test() {
    document.getElementById("result").style.display = "block"
    document.getElementById("resultButton").style.display = "block"
 } 

function step1(e){
    let operationSign = ['+', '-', 'x']
    let element = document.createElement('div')
    let sign = document.createElement('div')
    let node = document.createTextNode(`${operationSign[e]}`)
    let operation = document.getElementById('operation')
    let rows = document.getElementById("rows").value
    let columns = document.getElementById("columns").value

    trigger = e

   


    document.getElementById('sideOperation').style.display = 'block'

    sign.appendChild(node)

    element.classList.add("box")
    sign.classList.add('sign')

    for (let i = 0; i < array.length; i++) {
        item = `<div><div class="item">${array[i]}</div></div>`;
        element.innerHTML += item;
    }

    element.style.gridTemplateRows = `repeat(${rows}, 30px)`
    element.style.gridTemplateColumns = `repeat(${columns}, 30px)`

    operation.appendChild(element)
    operation.appendChild(sign)

    document.getElementById("rows").readOnly = true
    document.getElementById("columns").readOnly = true
    document.getElementById('multiplication').style.display = 'none'

    if (e == 2) {
        multiplication1()
    }else{

        if (finalResult.length == 0) {
            finalResult = array
        }
        
        else{
            
            for (let i = 0; i < finalResult.length; i++) {
                if (e == 0) {
                    finalResult[i] += array[i]

                }
                if (e == 1) {
                    finalResult[i] -= array[i]
                }
            }   
            
            
        }
    }




    

   

   
}



function step2(){
    let sign = document.createElement('div')
    let element = document.createElement('div')
    let node = document.createTextNode('=')
    sign.appendChild(node)
    let rows = document.getElementById("rows").value
    let columns = document.getElementById("columns").value
    

    sign.classList.add('sign')
    element.classList.add("box", "answer")
    
    let lastChild = document.createElement('div')
    lastChild.classList.add("box")

    for (let i = 0; i < array.length; i++) {
        item = `<div><div class="item">${array[i]}</div></div>`;
        lastChild.innerHTML += item;
    }



    lastChild.style.gridTemplateRows = `repeat(${rows}, 30px)`
    lastChild.style.gridTemplateColumns = `repeat(${columns}, 30px)`

    document.getElementById('answer').appendChild(sign)
    document.getElementById('operation').appendChild(lastChild)
    document.getElementById('answer').appendChild(element)

    let buttons = document.getElementsByTagName('button')
    
  

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.display = 'none' 

        if (buttons[i].id == 'clear') {
            buttons[i].style.display = 'block'
        }
    }

    
    for (let i = 0; i < finalResult.length; i++) {
        if (trigger == 0) {
            finalResult[i] += array[i]
        }
        if (trigger == 1) {
            finalResult[i] -= array[i]
        }
        
    }

    if (trigger == 2) {
        multiplication2()
        multiplicationResult()
    }
    

    for (let i = 0; i < finalResult.length; i++) {
        item = `<div><div class="item">${finalResult[i]}</div></div>`;
        element.innerHTML += item;
    }

    
    element.style.gridTemplateColumns = `repeat(${columns}, 30px)`

}
 
function fine(e){
    

    test()
    step1(e)
    document.getElementById('sideOperation').style.display = 'inline-block'
    board()
    
}
