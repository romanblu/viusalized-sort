var Controller = (function(UICtrl, appCtrl){
    // Initialize a canvas and the range of values for the size of the lines

    data = {
        values: []
    };

    let delayTime = 5;

    let generateRandomizedGraph = function(){
        let line;
        let arr = [];
        // generate array of values
        for(let i = 0; i<=50; i++){
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
        document.querySelector('.btn').addEventListener('click', bubbleSort);
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

        return new Promise((resolve) => {
            UICtrl.drawMarkedLine(line1);
            UICtrl.drawMarkedLine(line2);
        
            setTimeout(() =>{
                UICtrl.deleteLine(line1);
                UICtrl.deleteLine(line2);
                resolve();
            }, delayTime)
        })
        .then(()=>{
            return new Promise((resolve)=>{
                setTimeout(()=>{
                    // move the line to different index
                    newLine1 = { 
                        index: line1.index,
                        value: line2.value
                    }

                    UICtrl.drawMarkedLine(newLine1);

                    newLine2 = {
                        index: line2.index,
                        value: line1.value
                    }
                    UICtrl.drawMarkedLine(newLine2);
                    resolve();
                }, delayTime )
            });
        }).then(()=>{
            return new Promise((resolve) => {
                setTimeout(() => {
                    UICtrl.drawLine(newLine1);
                    UICtrl.drawLine(newLine2);
                    console.log('FINISHED');
                    resolve();
                }, delayTime );
                console.log('FINISHED');

            });
        });

        
    }
    let bubbleSort = async function(){
        const length = data.values.length;
        
        
        for(let i = 0; i < length ; i++){
            for(let j = 0; j < length - 1; j++){
                if(data.values[j].value > data.values[j + 1].value){
                    console.log(j);
                    await swap(data.values[j], data.values[j+1]);
                    console.log('PASSED CHECKPOINT');
                }
            }
        }

        console.log(data.values);
    };

    return{
        init: function(){
            UICtrl.initCanvas(0, 50, 50);
            
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