// class HomeController {
//     // constructor(asd){
//     //     this.asd=asd;
//     // };

//     loadHome(req, res) {
//         res.send(this.asd);
//     };
// }

// const homeController = new HomeController();

// module.exports = { homeController };

const loadHome = (req, res) => {
    res.send("1");
};

const loadHome2 = (req, res) => {
    res.send('2');
};


module.exports = {
    loadHome,
    loadHome2
};

// module.exports = function ({ data }) {
//     return {
//         home(req, res) {
//             res.send(data);
//         }
//     };
// };