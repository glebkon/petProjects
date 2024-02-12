const sinon = require('sinon');
const noteController = require('../app/controllers/note.controller');
const noteService = require('../app/service/note.service');

describe('Test Note controller layer', () => {
    it('should save note and return that object', (done) => {
        let note = {
            "note_id": 1,
            "note_title": "Agile Meeting",
            "note_content": "Get document ready for meeting",
            "note_status":"Yet to start",
            "note_creation_date": "2022-03-12",
            "category_id":1,
            "reminder_id":2
        };
        var create = sinon.stub(noteService, 'create');
        noteController.create(note, (err, results) => { });
        sinon.assert.calledOnceWithMatch(create, note);
        done();
        create.restore();
    });

    it('should return all notes', (done) => {
        var getAll = sinon.stub(noteService, 'getAll');
        noteController.findAll((err, results) => { });
        sinon.assert.calledOnce(getAll);
        done();
        getAll.restore();
    });

    it('should return note given the note id', (done) => {
        var findById = sinon.stub(noteService, 'findById');
        noteController.findOne((err, results) => { });
        sinon.assert.calledOnce(findById);
        done();
        findById.restore();
    });

    it('should update note given the note id', (done) => {
        var updateById = sinon.stub(noteService, 'updateById');
        let upNote = {
            "note_id": 1,
            "note_title": "Agile Meeting updated",
            "note_content": "Get documents ready for meeting",
            "note_status":"Yet to start",
            "note_creation_date": "2022-03-12",
            "category_id":1,
            "reminder_id":2
        };
        noteController.update(upNote.note_id,upNote,(err, results) => { });
        sinon.assert.calledOnceWithMatch(updateById, upNote.note_id,upNote);
        done();
        updateById.restore();
    });

    it('should delete note given the note id', (done) => {
        const note_id=1;
        var remove = sinon.stub(noteService, 'remove');
        noteController.delete(note_id,(err, results) => { });
        sinon.assert.calledOnceWithMatch(remove,note_id);
        done();
        remove.restore();
    });

    it('should delete all notes', (done) => {
        var removeAll = sinon.stub(noteService, 'removeAll');
        noteController.deleteAll((err, results) => { });
        sinon.assert.calledOnce(removeAll);
        done();
        removeAll.restore();
    });
})

