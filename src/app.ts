import { Component, PropsWithChildren } from 'react'
import './app.scss'

import _ from './utills/util/UtilExt'

let arr = [1,2]

arr = _.filter(arr, (item)=> {
  console.log(item);
  return item == 2
})
console.log(arr);


class App extends Component<PropsWithChildren> {

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  // this.props.children 是将要会渲染的页面
  render () {
    return this.props.children
  }
}
export default App
