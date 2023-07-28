// 模块用es6，统一模块用的是cjs
// 懒加载
const MxUtill = {
    // 工具函数--提供两种使用方式（_ | UtillExt）
    get _() {
        return require('./util/UtilExt').default
    },
    get UtillExt() {
        return require('./util/UtilExt').default
    }
}

module.exports = MxUtill
