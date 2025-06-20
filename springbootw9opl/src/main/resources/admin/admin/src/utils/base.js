const base = {
    get() {
        return {
            url : "http://localhost:8080/springbootw9opl/",
            name: "springbootw9opl",
            // 退出到首页链接
            indexUrl: ''
        };
    },
    getProjectName(){
        return {
            projectName: "基于Web的课程设计选题管理系统"
        } 
    }
}
export default base
