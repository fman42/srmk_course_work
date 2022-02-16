const uuidv4 = require("uuid")

export default {
    /* user */
    checkUserExists(email) {
        const users = JSON.parse(localStorage.getItem('users'));
        const has = users.filter(x => {
            return x.email == email;
        });

        return has.length != 0;
    },

    createUser(email, password, name = "") {
        const user = {
            email: email,
            password: password,
            name: name
        }

        let current = localStorage.getItem('users') != null ? JSON.parse(localStorage.getItem('users')) : [];
        current.push(user);

        localStorage.setItem('users', JSON.stringify(current));
    },

    login(email, password) {
        const users = JSON.parse(localStorage.getItem('users'));
        const user = users.filter(x => {
            return x.email == email && x.password == password;
        });

        return user.length == 0 ? null : user[0];
    },

    changeField(email, field, fieldVal) {
        const users = JSON.parse(localStorage.getItem('users'));
        const user = users.findIndex(x => {
            return x.email == email;
        });

        if (user != -1) {
            users[user][field] = fieldVal;
        }

        localStorage.setItem('users', JSON.stringify(users));
    },

    /* words */
    getWords(email) {
        const words = JSON.parse(localStorage.getItem('words')) ?? [];
        const user_words = words.filter(x => {
            return x.email == email;
        });

        return user_words;
    },

    addWord(email, word, description) {
        const word_item = {
            id: uuidv4.v4(),
            title: word,
            description: description,
            email: email
        }   

        const elements = JSON.parse(localStorage.getItem('words')) ?? [];
        elements.push(word_item);

        localStorage.setItem('words', JSON.stringify(elements));
    },

    deleteWord(email, id) {
        const elements = JSON.parse(localStorage.getItem('words'));
        const find_word_index = elements.findIndex(x => {
            return x.email == email && x.id == id;
        });

        elements.splice(find_word_index, 1);
        localStorage.setItem('words', JSON.stringify(elements));
    },

    editWord(email, id, word, description) {
        const elements = JSON.parse(localStorage.getItem('words'));
        const find_word = elements.findIndex(x => {
            return x.email == email && x.id == id;
        });

        elements[find_word].title = word;
        elements[find_word].description = description;

        localStorage.setItem('words', JSON.stringify(elements));
    },

    /* tickets */
    getTickets(email) {
        const elements = JSON.parse(localStorage.getItem('tickets'));
        const user_words = elements.filter(x => {
            return x.email == email;
        });

        return user_words;
    },

    getTicket(id) {
        const elements = JSON.parse(localStorage.getItem('tickets'));
        const ticket = elements.filter(x => {
            return x.id == id;
        });

        return ticket.length == 0 ? null : ticket[0];
    },

    createTicket(email, name, body) {
        const elements = JSON.parse(localStorage.getItem('tickets')) ?? [];
        elements.push({
            id: uuidv4.v4(),
            email: email,
            name: name,
            body: body,
            completed: 0
        });

        localStorage.setItem('tickets', JSON.stringify(elements));
    },

    completeTicket(id) {
        const elements = JSON.parse(localStorage.getItem('tickets'));
        const find_word_index = elements.findIndex(x => {
            return x.id == id;
        });

        elements[find_word_index].completed = 1;
        localStorage.setItem('tickets', JSON.stringify(elements));
    },

    getTicketMessasges(ticket_id) {
        const elements = JSON.parse(localStorage.getItem('ticket_messages')) ?? [];
        const messages = elements.filter(x => {
            return x.ticket_id == ticket_id;
        });

        return messages;
    },

    addTicketMessage(ticket_id, email, message) {
        const elements = JSON.parse(localStorage.getItem('ticket_messages')) ?? [];
        elements.push({
            id: uuidv4.v4(),
            email: email,
            ticket_id: ticket_id,
            message: message
        });
        console.log(elements);

        localStorage.setItem('ticket_messages', JSON.stringify(elements));
    }
}