var Controller = (function(UICtrl, appCtrl){
    // Initialize a canvas and the range of values for the size of the lines

    let generateRandomizedGraph = function(){
        let line;
        let arr = [];
        // generate array of values
        for(let i = 0; i<100; i++){
            arr.push(i);
            // UICtrl.drawLine(line);
        }

        // shuffle the values
        const shuffled =  arr.sort(() => Math.random() - 0.5);
        
        // Draw the graphs on the canvas
        for(let i = 0; i < shuffled.length; i++){
            line = {
                index: i,
                value: shuffled[i]
            }
            UICtrl.drawLine(line);
        }
    }

    
    return{
        init: function(){
            UICtrl.initCanvas(0, 100, 100);
            
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