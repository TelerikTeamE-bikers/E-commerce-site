// const request = require('supertest');
// const expect = require('chai').expect;
// const express = require('express');

// const app = require('../../app').app;

// it('should return Page not found', (done) => {
//     request(app)
//         .get('/404')
//         .expect(404)
//         .expect((res) => {
//             expect(res.body).to.include({
//                 error: 'Page not found.'
//             });
//         })
//         .end(done);
// });