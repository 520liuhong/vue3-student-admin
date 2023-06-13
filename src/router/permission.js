import Layout from '@/layouts/Index'

export const filterAsyncRouter = (routers, lastRouter = false, type = false) => { // 遍历后台传来的路由字符串，转换为组件对象
  return routers.filter(router => {
    if (type && router.children) {
      router.children = filterChildren(router.children)
    }

    if (router.component) {
      // Layout组件特殊处理
      router.component = router.component === 'Layout' ? Layout : loadView(router.component)
    }

    if (router.children != null && router.children && router.children.length) {
      router.children = filterAsyncRouter(router.children, router, type)
    } else {
      delete router['children']
      delete router['redirect']
    }
    return true
  })
}

function filterChildren(childrenMap, lastRouter = false) {
  let children = []
  childrenMap.forEach((el, index) => {
    if (el.children && el.children.length) {
      if (el.component === 'ParentView') {
        el.children.forEach(c => {
          c.path = el.path + '/' + c.path
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c))
            return
          }
          children.push(c)
        })
        return
      }
    }
    if (lastRouter) {
      el.path = lastRouter.path + '/' + el.path
    }
    children = children.concat(el)
  })
  return children
}

export const loadView = (view) => {
  return () => import(`@/views${view}`)
}

