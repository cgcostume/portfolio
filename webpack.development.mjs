
export default (env, __dirname) => {

    return {
        mode: 'development',
        cache: true,
        devServer: {
            hot: false
        },
        optimization: {
            minimize: true,
        },
    };
}
