import { addNewContact, 
        getContacts, 
        getContactWithId, 
        updateContact, 
        deleteContact
    } from '../controllers/crmController'

const routes = (app) => {
    app.route('/contact')
        .get((req, res, next) => {
            console.log(req.originalUrl)
            next();   
        },getContacts)

        .post(addNewContact)

    app.route('/contact/:contactId')
        // update contact
        .put(updateContact)

        // get specific contact
        .get(getContactWithId)

        // delete a contact
        .delete(deleteContact)
}

export default routes;