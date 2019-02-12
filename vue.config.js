module.exports = {
    css: {
        loaderOptions: {
            sass: {
                data: `
                    @import "@/styles/main.scss";
                    @import "@/styles/utils/_variable.scss";
                `
            }
        }
    }
};