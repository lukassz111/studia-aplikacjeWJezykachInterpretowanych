import { AuthService } from '@/services/AuthService'
import { Subscription } from 'rxjs'
import Vue from 'vue'
import { VNode } from 'vue'
import { DirectiveBinding } from 'vue/types/options'
import { StoreDirectivesService } from './../services/StoreDirectivesService'

const display_only_id_attrib_name = "display_only_id"
const display_only_get_id = (el: HTMLElement): string => {
    if(el.hasAttribute(display_only_id_attrib_name)) {
        return el.getAttribute(display_only_id_attrib_name) as string
    } else {
        let id = StoreDirectivesService.createStore()
        el.setAttribute(display_only_id_attrib_name,id)
        return id
    }
}

const directive = Vue.directive('display-only',{
    bind(el: HTMLElement, binding: DirectiveBinding, vnode: VNode, oldVnode: VNode)  {
        let id = display_only_get_id(el)
        let store = StoreDirectivesService.getStore(id)
        store.s = AuthService.OnUserStateChanged.subscribe(()=>{
            let v = binding.value
            let loggedAs = AuthService.user()
            if(loggedAs == null) {
                el.style.display = 'none'
            }
            else if(loggedAs.userType == v) {
                el.style.display = ''
            }
            else if(v == 'all') {
                el.style.display = ''
            }
            else {
                el.style.display = 'none'
            }
        }) as Subscription
        StoreDirectivesService.setStore(id,store)      
    },
    unbind(el: HTMLElement, binding: DirectiveBinding, vnode: VNode, oldVnode: VNode) {
        let id = display_only_get_id(el)
        let store = StoreDirectivesService.getStore(id)
        if(store.s != undefined && store.s != null) {
            (store.s as Subscription).unsubscribe()
            store.s = null
        }
        StoreDirectivesService.setStore(id,store)
        StoreDirectivesService.removeStore(id)
        el.removeAttribute(display_only_id_attrib_name)
    }
})
export default directive;