
function Abs(val = 0){
    return val >= 0 ? val : -val;
}

function Max(val1 = 0, val2 = 0){
    return val1 > val2 ? val1 : val2;
}

function Min(val1 = 0, val2 = 0){
    return val1 < val2 ? val1 : val2;
}

export{
    Abs, Max, Min
}