export default {
    registerGlobal(globalName, globalValue) {
        window[globalName] = globalValue;
    }
}