const { expect } = require('chai');

describe('Test sum', () => {
    it('should return 4', () => { // 1 test
        const x = 2;
        const y = 2;
        const expected = x + y;

        expect(expected).to.eq(4).to.be.a('number'); // some chaining
    });
});

describe('Examples of using chai with mocha', () => {
    it('should expect sme values', () => { // 2 test
        expect(14).to.not.equal(13);
        expect({ a: 1 }).to.not.have.property('b');
        expect([1, 2]).to.be.an('array').that.does.not.include(3);
        expect('foobar').to.include('foo');
    });
});

const asyncAdd = (a, b, callback) => {
    setTimeout(() => {
        callback(a + b);
    }, 1000);
};

it('should asyncAdd two numbers', (done) => {
    // using parameter done to execute async test
    asyncAdd(4, 3, (sum) => {
        expect(sum).to.equal(7).to.be.a('number');
        done();
    });
}); // eslint-disable-line