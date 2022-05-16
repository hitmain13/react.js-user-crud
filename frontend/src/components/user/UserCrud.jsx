import React, { Component } from 'react';
import axios from 'axios'
import Main from '../template/Main.jsx'
import RenderForm from './RenderForm.jsx'
import RenderTable from './RenderTable.jsx'
import CreateNotification from '../template/Notifications.jsx'
import { NotificationContainer } from 'react-notifications';

const baseURL = 'http://localhost:3001/users'

const initialState = {
    user: { name: '', email: '' },
    list: []
}

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: incluir, listar, alterar e excluir.'
}

class UserCrud extends Component {

    state = { ...initialState }

    componentDidMount = () => {
        axios(baseURL).then(resp => {
            this.setState({ list: resp.data })
        })
        .catch(() => CreateNotification({ type: 'error', title:"Server connection lost", message:"Unable to connect to the server"}))
    }

    getUpdatedList = (user, add = true) => {
        const list = this.state.list.filter(u => u.id !== user.id)
        if (add) list.unshift(user)
        return list
    }

    clear = () => {
        this.setState({ user: initialState.user })
    }

    // Create
    save = () => {
        if (this.state.user.name && this.state.user.email !== '') {
            const user = this.state.user
            const method = user.id ? 'put' : 'post'
            const url = user.id ? `${baseURL}/${user.id}` : baseURL
            axios[method](url, user)
                .then(resp => {
                    const list = this.getUpdatedList(resp.data)
                    this.setState({ user: initialState.user, list })
                    CreateNotification({ type: 'success', title:"Success", message:"User saved successfully"})
                })
                .catch(() => CreateNotification({ type: 'error', title:"Fault", message:"Unable to save user."}))
        } else CreateNotification({ type: 'warning', title:"Warning", message:"You must type the user and e-mail."})
    }

    // Read
    load = user => {
        this.setState({ user })
    }

    // Update
    updateField = event => {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    // Delete
    remove = user => {
        const URL = `${baseURL}/${user.id}`
        axios.delete(URL).then(() => {
            const list = this.getUpdatedList(user, false)
            this.setState({ list })
            CreateNotification({ type: 'warning', title: user.name, message:"User removed successfully"})
        })
            .catch(() => CreateNotification({ type: 'error', title:"Fault", message:"Unable to remove user."}))
    }

    render() {
        return (
            <Main {...headerProps}>

                <RenderForm {...this.state}
                    save={this.save}
                    clear={this.clear}
                    updateField={this.updateField} />

                <RenderTable {...this.state}
                    load={this.load}
                    remove={this.remove} />

                <NotificationContainer />

            </Main>
        )
    }
}

export default UserCrud;