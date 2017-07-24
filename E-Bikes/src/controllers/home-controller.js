module.exports = function(data) {
    return {
        loadHome(req, res) {
            res.render('home', {});
        },
    };
};