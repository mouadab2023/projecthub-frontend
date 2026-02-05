const useLocalStorage = () => {
    const set =(item,val) => localStorage.setItem(item, JSON.stringify(val));
    const get = (item) =>JSON.parse(localStorage.getItem((item)));
    return {
        get,
        set
    }
}
export default useLocalStorage;