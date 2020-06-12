module.exports = () => {
    console._log = console.log;
    console._error = console.error;

    console.log = (obj) => {
        console._log(`[Debug] ${obj}`)
    }
    console.debug = (obj) => {
        console._log(`[Debug] ${obj}`)
    }
    console.warn = (obj) => {
        console._error(`[Warn] ${obj}`)
    }
    console.error = (obj) => {
        console._error(`[Error] ${obj}`)
    }
}