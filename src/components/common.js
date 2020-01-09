import GlobalHeader from './GlobalHeader'
import GlobalFooter from './GlobalFooter'

function plugin (Vue){
    if (plugin.installed){
        return
    }
    Vue.component('GlobalHeader',GlobalHeader)
    Vue.component('GlobalFooter',GlobalFooter)
}

export default plugin