var chai = require('chai');
var expect = chai.expect;
var noteDAO = require('../app/dao/note.dao');

describe('Testing Note DAO layer', () => {

    it('should contain create() function to save note data', () => {
        expect(typeof (noteDAO.create)).to.equal("function");
    });

    it('should contain getAll() function to retreive notes', () => {
        expect(typeof (noteDAO.getAll)).to.equal("function");
    });

    it('should contain findById() function to search note by id', () => {
        expect(typeof (noteDAO.findById)).to.equal("function");
    });

    it('should contain updateById() function to update note\'s details', () => {
        expect(typeof (noteDAO.updateById)).to.equal("function");
    });

    it('should contain remove() function to delete a specific note\'s details', () => {
        expect(typeof (noteDAO.remove)).to.equal("function");
    });
});
