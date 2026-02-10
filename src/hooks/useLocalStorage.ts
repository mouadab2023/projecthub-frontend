const useLocalStorage = <T>() => {
    const set =(item:string,val:T) => localStorage.setItem(item, JSON.stringify(val));
    const get = (item:string):T|null =>{
        const value = localStorage.getItem(item);
        if (!value) return null;
        try {
            return JSON.parse(value) as T;
        } catch {
            return null;
        }
    }
    return {
        get,
        set
    }
}
export default useLocalStorage;