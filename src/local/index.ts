import defaultLang from './lang/zh-CN'
// import Vue from 'vue'
// import deepmerge from 'deepmerge';
// import Format from './format';
const RE_NARGS = /(%|)\{([0-9a-zA-Z_]+)\}/g
// const format = Format(Vue)
let lang = defaultLang
// let merged = false
// let i18nHandler = function() {
//   const vuei18n = Object.getPrototypeOf(Vue).$t
//   if (typeof vuei18n === 'function' && !!Vue.locale) {
//     if (!merged) {
//       merged = true
//       Vue.locale(
//         Vue.config.lang,
//         deepmerge(lang, Vue.locale(Vue.config.lang) || {}, { clone: true })
//       )
//     }
//     return vuei18n.apply(this, arguments)
//   }
// }
const hasOwnProperty = Object.prototype.hasOwnProperty
function format(string: any, ...args: any[]) {
  if (args.length === 1 && typeof args[0] === 'object') {
    args = args[0]
  }

  if (!args || !args.hasOwnProperty) {
    args = []
  }

  return string.replace(
    RE_NARGS,
    (match: any, prefix: string, i: number, index: number) => {
      let result

      if (string[index - 1] === '{' && string[index + match.length] === '}') {
        return i
      } else {
        debugger
        result = hasOwnProperty.call(args, i) ? args[i] : null
        if (result === null || result === undefined) {
          return ''
        }

        return result
      }
    }
  )
}

export function t(path: any, ...options: any[]) {
  //   let value = i18nHandler.apply(this, arguments)
  //   if (value !== null && value !== undefined) return value
  let value = ''
  const array = path.split('.')
  let current: any = lang

  for (let i = 0, j = array.length; i < j; i++) {
    const property = array[i]
    value = current[property]
    if (i === j - 1) return format(value, options)
    if (!value) return ''
    current = value
  }
  return ''
}
