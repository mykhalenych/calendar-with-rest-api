export const generateNumbersRange = (from, to) => {
        const result = [];

        for (let i = from; i <= to; i++) {
            result.push(i)
        }
        return result;
    }
    //export let events = [];

export const check = (elem) => {

    let num = elem
    num < 10 ? num = `0${num}` : num;
    return num
}


export const setItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getItem = key => JSON.parse(localStorage.getItem(key));


// export const baseUrl = "https://crudcrud.com/api/6431ea82448e47559b801a747cc51d34/users"
export const baseUrl = "https://crudcrud.com/api/641861a403ea45c5af05e27f8275b417/users"


export const updateStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}