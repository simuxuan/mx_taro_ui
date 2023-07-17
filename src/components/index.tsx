

const MxTaroUi = {
    // 动态加载
    get TaroSafeAreaView() {
        return require('./safe-area-view').default // cjs引入esm暴露
    }
}

// cjs暴露，外面可以使用esm：import导入 
module.exports = MxTaroUi