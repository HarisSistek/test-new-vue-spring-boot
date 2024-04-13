module.exports = {
  transpileDependencies: true,
  devServer: {
   // '/': {
   //   target: 'http://localhost:8080/',
   //   secure: false,
    //  changeOrigin: true
    // },
    proxy: 'http://localhost:8080/'
  }
}
