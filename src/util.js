export const sortByData = (data, key, type, direction) => {
    switch(type) {
        case 'number':
            return sortByNumber(data, key, direction);
        case 'currency':
            return sortByNumber(data, key, direction);
        case 'date':
            return sortByDate(data, key, direction);
        default :
            return sortByString(data, key, direction);
    }
}

const sortByString = (data, key, direction) => data.sort(function(a,b){
    return (direction === 'asc' ? (a[key] !== b[key] ? a[key] < b[key] ? -1 : 1 : 0) : (b[key] !== a[key] ? b[key] < a[key] ? -1 : 1 : 0))
});

const sortByNumber = (data, key, direction) => data.sort(function(a,b){
    return (direction === 'asc' ? b[key]-a[key] : a[key]-b[key])
});

const sortByDate = (data, key, direction) => data.sort(function(a,b){
    return (direction === 'asc' ? new Date(b[key]) - new Date(a[key]) : new Date(a[key]) - new Date(b[key]));
});