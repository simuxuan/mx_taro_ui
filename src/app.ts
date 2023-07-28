import { Component, PropsWithChildren } from 'react'
import './app.scss'

import _ from './utills/util/UtilExt'

let arr = [1,2,1]
let arr1 = [2,3]
// console.log(_.union<number>(arr,arr1));
console.log(_.uuid(10));

// void不是没有返回值，是可以没返回值
let fn : (...args: any[])=> void = function(name) {
  return name
}

console.log(fn(123));



class App extends Component<PropsWithChildren> {

  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children
  }
}
export default App
