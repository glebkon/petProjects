const sinon = require('sinon');
const noteDAO = require('../app/dao/note.dao');
var noteService = require('../app/service/note.service')

describe("Testing Note service layer", () => {
    it("Should retreive all notes", function (done) {
        const notes = [{
            "note_title": "Agile Meeting",
            "note_content": "Get document ready for meeting",
            "note_status": "Yet to start",
            "note_creation_date": "2022-03-12",
            "category_id": 1,
            "reminder_id": 2
        }];
        const getAllStub = sinon.stub(noteDAO, "getAll");
        const doneCallback = (err, results) => results;

        const successCallback = (err, res) => doneCallback(null, res);

        getAllStub.withArgs(successCallback).returns(doneCallback(null, notes));

        noteService.getAll(doneCallback);
        sinon.assert.calledWithMatch(getAllStub, (err, res) => {
            sinon.assert.match(getAllStub(successCallback), notes);
            done();
        });
        getAllStub.restore();
    });
    it('should save note data and return saved object', (done) => {
        const noteReq = {
            "note_title": "Agile Meeting",
            "note_content": "Get document ready for meeting",
            "note_status": "Yet to start",
            "note_creation_date": "2022-03-12",
            "category_id": 1,
            "reminder_id": 2
        }
        const createStub = sinon.stub(noteDAO, "create");
        const doneCallback = (err, results) => results;

        const successCallback = (err, noteReq) => doneCallback(null, noteReq);

        createStub.withArgs(noteReq, successCallback).returns(doneCallback(null, noteReq));

        noteService.create(noteReq, doneCallback);

        sinon.assert.calledWithMatch(createStub, noteReq, (err, savedNote) => {
            sinon.assert.match(createStub(noteReq, successCallback), noteReq);
            done();
        });
     createStub.restore();

    });
})