var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;

var hlp = require('../helpers.js');

var MetalsmithFake = function(metadata){
    this.md = metadata || {};
};
MetalsmithFake.prototype.metadata = function(){
    return this.md;
}

describe('metalsmith-rssfeed helpers', function() {
    describe('ensurefunc', function() {
        it('should return a function', function(done){
            expect(hlp.ensureFunc()).to.be.a("function");

            expect(hlp.ensureFunc("")).to.be.a("function");

            expect(hlp.ensureFunc({})).to.be.a("function");

            expect(hlp.ensureFunc([])).to.be.a("function");

            expect(hlp.ensureFunc(() => {})).to.be.a("function");

            done();
        });

        it('should evaluate a value to itself', function(done){
            expect(hlp.ensureFunc()()).to.equal(undefined);

            expect(hlp.ensureFunc(null)()).to.equal(null);

            expect(hlp.ensureFunc("A String")()).to.equal("A String");

            expect(hlp.ensureFunc([1 ,2, 3])()).to.deep.equal([1, 2, 3]);

            expect(hlp.ensureFunc({a: 1, b:"text"})()).to.deep.equal({a: 1, b:"text"});

            done();
        });

        it('should evaluate a function to the result of the function', function(done){
            expect(hlp.ensureFunc(() => {})()).to.equal(undefined);

            expect(hlp.ensureFunc(() => null)()).to.equal(null);

            expect(hlp.ensureFunc(() => "text")()).to.equal("text");

            expect(hlp.ensureFunc(() => [1, 2, 3])()).to.deep.equal([1, 2, 3]);

            expect(hlp.ensureFunc(() => ({a: 1, b:"text"}))()).to.deep.equal({a: 1, b:"text"});

            done();
        });

        it('should pass arguments to the nested function', function(done){
            expect(hlp.ensureFunc((a) => a)("x")).to.equal("x");
            done();
        });
    });

    describe('ensureArray', function() {
        it('should Return an Array', function(done){
            expect(hlp.ensureArray()).to.be.a("Array");

            expect(hlp.ensureArray("")).to.be.a("Array");

            expect(hlp.ensureArray({})).to.be.a("Array");

            expect(hlp.ensureArray([])).to.be.a("Array");

            expect(hlp.ensureArray(() => {})).to.be.a("Array");
            done();
        });

        it('should contain a value', function(done){
            expect(hlp.ensureArray()).to.deep.equal([]);

            expect(hlp.ensureArray(null)).to.deep.equal([null]);

            expect(hlp.ensureArray("A string")).to.deep.equal(["A string"]);

            expect(hlp.ensureArray({a: 1, b:"text"})).to.deep.equal([{a: 1, b:"text"}]);

            var f = () => "wow";
            expect(hlp.ensureArray(f)).to.deep.equal([f]);

            done();
        });
    });
});