var UIController = (function(){

    const mainContent = document.querySelector('.container');
    const canvas = document.querySelector('.myCanvas');
    const canvasBGColor = 'rgb(0,0,0)';
    const lineColor = 'rgb(0, 255, 0)';
    const lineWidth = 5;
    

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
            let newLine;

            this.deleteLine(line1);
            this.deleteLine(line2);
            
            // move the line to different index
            newLine = { 
                index: line1.index,
                value: line2.value
            }
            this.drawLine(newLine);
            
            newLine = {
                index: line2.index,
                value: line1.value
            }
            this.drawLine(newLine);
        },
    }


})();