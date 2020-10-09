var Controller = (function(UICtrl, appCtrl){

    data = {
        values: []
    };

    const minRange = 0;
    const maxRange = 200;
    const numOfValues = 200;

    let generateRandomizedGraph = function(){
        let line;
        let arr = [];
        // generate array of values
        for(let i = 1; i<= 200; i++){
            arr.push(i);
        }

        // shuffle the values
        const shuffled =  arr.sort(() => Math.random() - 0.5);
        data.values = [];

        // Draw the graphs on the canvas
        for(let i = 0; i < shuffled.length; i++){
            line = {
                index: i,
                value: shuffled[i]
            }
            data.values.push(line); // Update the data to  contain the values 
            UICtrl.drawLine(line);
        }

    
    };
    
    let setupEventListeners = function(){
        document.querySelector('.btn-bubble').addEventListener('click', bubbleSort);

        document.querySelector('.btn-quick').addEventListener('click', function(){
            quickSort(0, data.values.length - 1);
        });

        document.querySelector('.btn-insertion').addEventListener('click', insertionSort)
          
        document.querySelector('.btn-heap').addEventListener('click', heapSort); 
    
        document.querySelector('.btn-restart').addEventListener('click', function(){
            UICtrl.initCanvas(minRange, maxRange, numOfValues);
            generateRandomizedGraph();

        }); 

    };

    function swap(line1, line2){
        data.values[line1.index] = {
            index: line1.index,
            value: line2.value
        }
        data.values[line2.index] = {
            index: line2.index,
            value: line1.value
        }

        
    }
    bubbleSort = async function(){
        const length = data.values.length;
        
        for(let i = 0; i < length ; i++){
            for(let j = 0; j < length - 1; j++){
                if(data.values[j].value > data.values[j + 1].value){
                    await UICtrl.swap(data.values[j], data.values[j+1]);
                    swap(data.values[j], data.values[j+1]);
                }
            }
        }

    };

    quickSort = async function(start, end){
        if(start < end){
            partFulfilled = await partition(data.values, start, end);        
            await quickSort(start, partFulfilled - 1);
            await quickSort(partFulfilled + 1, end);
        }           
    }
    
    async function partition(arr, start, end){
        pivot = arr[end];
        i = start - 1 // Index of smallest element

        for(let j = start; j <= end - 1; j++){
            if(arr[j].value < pivot.value){
                i++;
                if(i !== j){
                    await UICtrl.swap(arr[i], arr[j]);
                    swap(arr[i], arr[j]);
                }
            }
        }
        
        await UICtrl.swap(arr[i + 1], arr[end]);
        swap(arr[i + 1], arr[end]);

        return i+1;
    } 

    insertionSort = async function(){
        const length = data.values.length;

        for(let i = 1; i< length; i++){
            let key = data.values[i];
            let j = i - 1;

            while(j >= 0 && data.values[j].value > key.value){
                await UICtrl.swap(data.values[j+1], data.values[j]);
                swap(data.values[j + 1], data.values[j])
                // data.values[j+1] = data.values[j]; 
                j = j-1;
            }
            // data.values[j + 1] = key;
        }

    }

    
    
    /**
     function merge(start, end, middle){
        const lengthLeft = middle - start + 1; 
        const lengthRight = end - middle ;
        console.log(`start ${start} middle ${middle} end ${end}`);
        // left = data.values.slice(0, middle);
        // right = data.values.slice(middle);
        left = [];
        right = [];
        mergeArr = [];

        // for (let i = 0; i < lengthLeft; i++){ 
        //     left[i] = data.values[start + i]; 
        // }
        // for (let j = 0; j < lengthRight; j++) {
        //     right[j] = data.values[end + 1 + j]; 
        // }
        // console.log(`right length ${right.length}`);
        // console.log(`left length ${left.length}`);

        let i = j = 0;
        let k = start;

        while(i < lengthLeft && j < lengthRight){
            if(data.values[start + i].value <= data.values[middle + j + 1].value){
                mergeArr[k] = left[i];
                i++;
            } else{
                mergeArr[k] = right[j];
                j++;
            }
            k++;
        }

        while(i < lengthLeft){
            mergeArr[k] = left[i];
            i++;
            k++;
        }
        
        while(j < lengthRight){
            mergeArr[k] = right[j];
            j++;
            k++;
        }

        for(let i= start; i< k; i++){
            data.values[i] = mergeArr[i];
        }

    }
*/

    let heapSort = async function(){
        const length = data.values.length;

        for(let i = Math.floor(length / 2) - 1; i >= 0; i-- ){
            await heapify(length, i);
        }

        for( let i = length -1; i > 0; i--){
            await UICtrl.swap(data.values[0], data.values[i]);
            swap(data.values[0], data.values[i]);
            await heapify(i, 0);
        }

    }

    async function heapify(length, i){
        let largest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;

        if(left < length && data.values[left].value > data.values[largest].value){
            largest = left;
        }

        if(right < length && data.values[right].value > data.values[largest].value){
            largest = right;
        }

        if(largest !== i){
            await UICtrl.swap(data.values[i], data.values[largest]);
            swap(data.values[i], data.values[largest]);
            await heapify(length, largest);
        }


    }

    return{
         init: function(){
            UICtrl.initCanvas(minRange, maxRange, numOfValues);
            
            generateRandomizedGraph();
            
            setupEventListeners();
        }
    }
    
})(UIController, AppController);

Controller.init();

// ctx.strokeStyle = 'rgb(255,255,255)';
// ctx.lineWidth = 10;
// ctx.beginPath();
// ctx.moveTo(500, height-100);
// ctx.lineTo(100, 200);
// ctx.stroke();

// const vals = [2, 2, 2, 4, 5, 6,5,3,2,1,7,0,  7 ,8, 9, 10];

// for(index in vals){
//     const x = parseInt((parseInt(index) + 1) / (vals.length + 1) * width ); 
//     const y = parseInt(vals[index] / 10 * height);
//     ctx.moveTo(x , height);
//     ctx.lineTo(x , height - y);
//     ctx.stroke();
// }


// // remove a line at index 
// ctx.beginPath();
// index = 4;
// ctx.strokeStyle = 'rgb(0,0,0)';
// const x = parseInt((parseInt(index) + 1) / (vals.length + 1) * width ); 
// const y = parseInt(vals[index] / 10 * height);
// ctx.moveTo(x , height);
// ctx.lineTo(x , height - y);
// ctx.stroke();
// console.log(x, y);