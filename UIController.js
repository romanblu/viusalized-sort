var UIController = (function(){

    const mainContent = document.querySelector('.container');
    const canvas = document.querySelector('.myCanvas');
    const canvasBGColor = 'rgb(0,0,0)';
    const lineColor = 'rgb(0, 255, 0)';
    const markedLineColor = 'rgb(255, 0, 0)';
    const lineWidth = 5;

    const delayTime = 500;


    return {
        initCanvas: function(minRange, maxRange, numOfValues){ // TODO: Add optional size of the canvas
            mainContent.style.height = '500px';
            mainContent.style.marginTop = '50px';

            canvas.width = canvas.parentNode.clientWidth;
            canvas.height = canvas.parentNode.clientHeight;
            this.width = canvas.width;
            this.height = canvas.height;
            
            this.context = canvas.getContext('2d');
            this.context.fillStyle = canvasBGColor;
            this.context.fillRect(0, 0, this.width, this.height);

            // Gives us padding on the sides
            this.width -= 20;
            
            this.minRange = minRange;
            this.maxRange = maxRange;
            this.numOfValues = numOfValues;
            
        },
        drawLine: function(line){
            this.context.beginPath();
            this.context.lineWidth = lineWidth;
            this.context.strokeStyle = lineColor;
            const x = parseInt((parseInt(line.index) + 1) / (this.numOfValues + 1) * this.width ); 
            const y = parseInt(line.value / this.maxRange * this.height);
            this.context.moveTo(x , this.height);
            this.context.lineTo(x , this.height - y);
            this.context.stroke();
        },
        drawMarkedLine: function(line){
            this.context.beginPath();
            this.context.lineWidth = lineWidth;
            this.context.strokeStyle = markedLineColor;
            const x = parseInt((parseInt(line.index) + 1) / (this.numOfValues + 1) * this.width ); 
            const y = parseInt(line.value / this.maxRange * this.height);
            this.context.moveTo(x , this.height);
            this.context.lineTo(x , this.height - y);
            this.context.stroke();
        },

        deleteLine: function(line){ 
            this.context.beginPath();
            this.context.lineWidth = lineWidth + 2;
            this.context.strokeStyle = canvasBGColor;
            const x = parseInt((parseInt(line.index) + 1) / (this.numOfValues + 1) * this.width ); 
            const y = parseInt(line.value / this.maxRange * this.height);
            this.context.moveTo(x , this.height);
            this.context.lineTo(x , this.height - y);
            this.context.stroke();
        },
        swap: function(line1, line2){

            return new Promise((resolve) => {
                this.drawMarkedLine(line1);
                this.drawMarkedLine(line2);
            
                setTimeout(() =>{
                    this.deleteLine(line1);
                    this.deleteLine(line2);
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

                        this.drawMarkedLine(newLine1);

                        newLine2 = {
                            index: line2.index,
                            value: line1.value
                        }
                        this.drawMarkedLine(newLine2);
                        resolve();
                    }, delayTime )
                });
            }).then(()=>{
                return new Promise((resolve) => {
                    setTimeout(() => {
                        this.drawLine(newLine1);
                        this.drawLine(newLine2);
                        console.log('FINISHED');

                    }, delayTime );
                    console.log('FINISHED');

                });
            });
        
        },
    }


})();