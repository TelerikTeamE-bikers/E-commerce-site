const { MongoClient, ObectId } = require('mongodb');
const constants = require('../common/constants');

// module.exports = {
//     // update(model) {
//     //     return new Promise((resolve, reject) => {
//     //         model.save(err => {
//     //             if (err) {
//     //                 return reject(err);
//     //             }

//     //             return resolve(model);
//     //         });
//     //     });
//     // },
//     // save(model) {
//     //     return new Promise((resolve, reject) => {
//     //         model.save(err => {
//     //             if (err) {
//     //                 return reject(err);
//     //             }

//     //             return resolve(model);
//     //         });
//     //     });
//     // }
//     get(collection) {
//         console.log(2)

//         MongoClient.connect(constants.DB_URL, (err, db) => {
//             if (err) {
//                 return console.log("Failed to connect to db!!" + "\n" + err)
//             }
//             return db;
//             //db.collection()
//             //db.close();
//         });
//         // )
//         //     .then((db) => {
//         //         console.log(3)

//         //         var d = db.collection(collection);
//         //         console.log(4)
//         //         //db.close();
//         //         return d;
//         //     })
//         //     .catch((err) => {
//         //         console.log('Unable to connect to the Server', err);
//         //     });
//     }
// };

let _db;

module.exports = {
    connectToServer: function (callback) {
        MongoClient.connect(constants.DB_URL, function (err, db) {
            _db = db;
            return callback(err);
        });
    },
    getDb: function () {
        return _db;
    }
};