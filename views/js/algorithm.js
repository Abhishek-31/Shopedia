function getAllIndexes(arr) {
    var final = [], i,j;
    console.log(arr.length)
    for(i=0;i<arr.length;i++)
    {
     
        val = arr[i];
        if (val === undefined || val === null || val.length <= 0)
        {
            continue;}
            else
{
   
    count=1;
    for (j = i+1; i < arr.length; i++)
        if (arr[j] === val)
            {
                arr[j]=null;
                count++;
            }

            final.push({
    value:val,
    count:count
});
    // return indexes;
}
    }
    // return value;
    console.log(final)
}

var a=["abhishek","utkarsh"];
getAllIndexes(a);