const path = require('path');
module.exports = {
    entry: {
        layout: "./src/scripts/layout.js",
        // Vendor: "./app/assets/scripts/Vendor.js"
    },
    output: {
        path: path.resolve(__dirname, "./public/scripts"),
        filename: "[name].js" // Vzima syotvwtnoto ime na App ili Vendor
    },
    module: {
        loaders: [{
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            },
            // in test we are saying to babel to look only for js files
            test: /\.js$/,
            // in exclude we are saying babel no to look in node_modules
            exclude: /node_modules/
        }]
    }
};