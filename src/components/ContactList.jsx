import React from 'react';
import data from '../contacts.json';

export default class ContactList extends React.Component {
    constructor() {
        super();
        this.state = {
            contacts: data.slice(0, 5),
        };
    }

    handleAddContact = () => {
        const contacts = this.state.contacts;
        if (contacts.length < data.length) {
            const randomIndex = Math.floor(Math.random() * data.length);
            const newContact = data[randomIndex];
            if (contacts.some((contact) => contact.id === newContact.id)) {
                this.handleAddContact();
            } else {
                this.setState({
                    ...this.state,
                    contacts: [...this.state.contacts, newContact],
                });
            }
        }
    };

    handleSort = (field) => {
        const contacts = [...this.state.contacts];
        const sortedContacts = contacts.sort((contactA, contactB) => {
            if (field === 'name') {
                return contactA.name.localeCompare(contactB.name);
            }
            if (field === 'popularity') {
                return contactB.popularity - contactA.popularity;
            }
            return 0;
        });
        this.setState({
            ...this.state,
            contacts: sortedContacts,
        });
    };

    handleDelete = (id) => {
        const contacts = this.state.contacts;
        const filteredContacts = contacts.filter((contact) => {
            return contact.id !== id;
        });
        this.setState({
            ...this.state,
            contacts: filteredContacts,
        });
    };

    render() {
        const tableRows = this.state.contacts.map((contact, index) => {
            const oscarTrophy = contact.wonOscar ? '🏆' : '';
            const emmyTrophy = contact.wonEmmy ? '🏆' : '';

            return (
                <tr
                    key={contact.id}
                    className={index % 2 === 0 ? 'dark-row' : ''}
                >
                    <td>
                        <img src={contact.pictureUrl} alt={contact.name} />
                    </td>
                    <td>{contact.name}</td>
                    <td>{contact.popularity.toFixed(2)}</td>
                    <td>{oscarTrophy}</td>
                    <td>{emmyTrophy}</td>
                    <td>
                        <button onClick={() => this.handleDelete(contact.id)}>
                            Delete
                        </button>
                    </td>
                </tr>
            );
        });

        return (
            <div className='ContactList'>
                <h1>IronContacts</h1>
                <div className='button-container'>
                    <button onClick={this.handleAddContact}>
                        Add random contact
                    </button>
                    <button onClick={() => this.handleSort('popularity')}>
                        Sort by popularity
                    </button>
                    <button onClick={() => this.handleSort('name')}>
                        Sort by name
                    </button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Popularity</th>
                            <th>Won Oscar</th>
                            <th>Won Emmy</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>{tableRows}</tbody>
                </table>
            </div>
        );
    }
}
