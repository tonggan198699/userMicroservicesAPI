// build my own async error handler by imitating the express-async-handler module
// the only difference is it resolves the promise by passing next() 
const asyncUtil = fn =>
function asyncUtilWrap(...args) {
  const fnReturn = fn(...args)
  const next = args[args.length-1]
  return Promise.resolve(fnReturn).then(()=>next()).catch(next)
}

module.exports = asyncUtil
