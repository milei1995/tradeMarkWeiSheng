//去除underfind项
export const filterUnderfind=(arr)=>{
      for (let i=0;i<arr.length;i++){
          if(arr[i]===undefined){
              arr.splice(i,1)
              i=i-1
          }
      }
}