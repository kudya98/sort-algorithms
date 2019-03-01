

const algorithms={bubble_sort:(arr)=>{
        const len = arr.length;
        let timer = new Date();
        for (let i = 0; i < len ; i++) {
            for(let j = 0 ; j < len - i - 1; j++){
                if (arr[j] > arr[j + 1]) {
                    [ arr[j], arr[j+1] ] = [ arr[j+1], arr[j] ];
                }
            }
        }
        return(new Date()-timer);
    },insertion_sort:(arr)=>{

        let timer = new Date();
        for (let i = 0; i < arr.length; i++) {
            let value = arr[i];
            for (var j = i - 1; j > -1 && arr[j] > value; j--) {

                arr[j + 1] = arr[j]
            }
            arr[j + 1] = value
        }

        return(new Date()-timer);
    },selection_sort:(arr)=>{
        let timer = new Date();
        for(var i = 0; i < arr.length; i++){
            //set min to the current iteration of i
            var min = i;
            for(var j = i+1; j < arr.length; j++){
                if(arr[j] < arr[min]){
                    min = j;
                }
            }
            var temp = arr[i];
            arr[i] = arr[min];
            arr[min] = temp;
        }
        return(new Date()-timer);
    },
    js_sort:(arr)=>{
        let timer = new Date();
        arr.sort();
        return(new Date()-timer);
    }
};
module.exports = algorithms;