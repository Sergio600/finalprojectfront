import React from "react";
import sc from "./EditTicketPage.module.css";
import axios from "axios";
import history from "../../history";

export class EditTicket extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            category: {
                id: 1
            },
            name: '',
            description: '',
            urgency: '',
            createdOn: new Date().getTime(),
            desiredResolutionDate: new Date().getTime(),
            comments: {},
            comment: '',
            files: [],
            urgencies: [
                {
                    name: 'Critical',
                    id: 'CRITICAL'
                },
                {
                    name: 'High',
                    id: 'HIGH'
                },
                {
                    name: 'Medium',
                    id: 'MEDIUM'
                },
                {
                    name: 'Low',
                    id: 'LOW'
                }
            ],
            action: 'create',
            ticket: {},
            userOwner: {}
        }

        // this.toAllTicketsPage = this.toAllTicketsPage.bind(this);
        this.updateTicket = this.updateTicket.bind(this);
        this.updateTicketDraft = this.updateTicketDraft.bind(this);
        this.updateTicketCategory = this.updateTicketCategory.bind(this);
        this.updateTicketName = this.updateTicketName.bind(this);
        this.updateTicketDescription = this.updateTicketDescription.bind(this);
        this.updateTicketUrgency = this.updateTicketUrgency.bind(this);
        this.updateTicketDesiredDate = this.updateTicketDesiredDate.bind(this);
        this.updateTicketAttachments = this.updateTicketAttachments.bind(this);
        this.updateTicketComment = this.updateTicketComment.bind(this);
        this.setActionCreate = this.setActionCreate.bind(this);
        this.setActionDraft = this.setActionDraft.bind(this);
        this.setData = this.setData.bind(this);
        this.setComment = this.setComment.bind(this);
        this.convertToDate = this.convertToDate.bind(this);
        this.toTicketOverview = this.toTicketOverview.bind(this);

    }

    componentDidMount() {
        console.log(this.props);
        this.setCategories();
        this.setData();
        this.setComment();
    }

    setData() {
        axios.get('http://localhost:8080/finalproject/tickets/' + this.props.match.params.id, JSON.parse(localStorage.getItem('AuthHeader')))
            .then((response) => {
                this.setState({
                    ticket: response.data,
                    userOwner: response.data.userOwner,
                    category: response.data.category,
                    name: response.data.name,
                    description: response.data.description,
                    urgency: response.data.urgency,
                    desiredResolutionDate: response.data.desiredResolutionDate,


                })
                console.log(response.data.urgency);
                console.log(response.data.category);
            })
            .catch(error => {
                history.push("/all-tickets")
            });
    }

    setComment(){
        axios.get('http://localhost:8080/finalproject/tickets/'+ this.props.match.params.id + '/comments',
            JSON.parse(localStorage.getItem('AuthHeader')))
            .then((response) => {
                this.setState({
                    comment: response.data[0].text,
                })
            }).catch(error => {console.log(error)})
    }



    setCategories() {
        axios.get('http://localhost:8080/finalproject/categories', JSON.parse(localStorage.getItem('AuthHeader'))).then((responce) => {
            this.setState({
                categories: responce.data,
            })
        }).catch(error => {
            console.log(error)
        });
    }

    convertToDate(date) {
        return new Date(date).toLocaleDateString().split(".").join("/");
    }

    setActionCreate(e) {
        this.setState({
            action: 'create'
        })
    }


    setActionDraft(e) {
        this.setState({
            action: 'draft'
        })
    }


    toTicketOverview() {
        console.log(this.props.match.params.id);
        history.push('/ticket-overview/' + this.props.match.params.id);
    }

    updateTicketCategory(e) {
        this.setState({
            category: {
                id: e.target.value,
            }
        });
    }

    updateTicketName(e) {
        this.setState({
            name: e.target.value,
        });
    }

    updateTicketDescription(e) {
        this.setState({
            description: e.target.value,
        });
    }

    updateTicketUrgency(e) {
        this.setState({
            urgency: e.target.value,
        });
    }

    updateTicketDesiredDate(e) {
        this.setState({
            desiredDate: e.target.value,
        });
    }

    updateTicketAttachments(e) {
        let array = [];
        for (let i = 0; i < e.targets.files.length; i++) {
            array[i] = e.target.files[i];
        }

        this.setState({
            files: array,
        });
        console.log(this.state.files);
    }


    updateTicketComment(e) {
        this.setState({
            comment: e.target.value,
        });
    }


    updateTicketDraft(e) {
        e.preventDefault();

        var description = this.state.description === '' ? null : this.state.description;
        var comment = this.state.comment === '' ? null : this.state.comment;

        let ticketDto = {

            name: this.state.name,
            category: this.state.category,
            description: description,
            urgency: this.state.urgency,
            createdOn: this.state.createdOn,
            desiredResolutionDate: this.state.desiredResolutionDate,
            comment: comment,

        }

        const formData = new FormData();

        formData.append("ticketDto", JSON.stringify(ticketDto));

        for (let file of this.state.files) {
            formData.append('files', file);
        }

        console.log(ticketDto);

        axios.put('http://localhost:8080/finalproject/tickets/draft',
            formData,
            JSON.parse(localStorage.getItem('AuthHeader')))
            .then((response) => {
                history.push('/all-tickets');
            }).catch(error => {
            console.log(error);
        })
    }


    updateTicket(e) {
        e.preventDefault();

        var description = this.state.description === '' ? null : this.state.description;
        var comment = this.state.comment === '' ? null : this.state.comment;
        let id = this.state.ticket.id;

        let ticketDto = {
            name: this.state.name,
            category: this.state.category,
            description: description,
            urgency: this.state.urgency,
            createdOn: this.state.createdOn,
            desiredResolutionDate: this.state.desiredResolutionDate,
            comment: comment,
        }

        const formData = new FormData();

        formData.append("ticketDto", JSON.stringify(ticketDto));

        for (let file of this.state.files) {
            formData.append('files', file);
        }

        console.log(ticketDto);

        axios.put('http://localhost:8080/finalproject/tickets/'+ id,
            ticketDto,
            JSON.parse(localStorage.getItem('AuthHeader')))
            .then((response) => {
                history.push('/all-tickets');
            }).catch(error => {
            console.log(error);
        })


    }

    render() {
        return (
            <div className={sc.formCreateTicket}>

                <button onClick={this.toTicketOverview}>Ticket overview</button>


                <form className={sc.formCenter}
                      onSubmit={this.state.action === 'create' ? this.updateTicket : this.updateTicketDraft}>

                    <div className={sc.formGroup}>
                        <label htmlFor="category">Category</label>
                        <select name="category"
                                id="category"
                                onChange={this.updateTicketCategory}
                                value={this.state.category.id}
                        >
                            {
                                this.state.categories.map((item, index) => {
                                    return <option key={index} value={item.id}>{item.name}</option>
                                })}
                        </select>
                    </div>

                    <div className={sc.formGroup}>
                        <label htmlFor="ticketName">Name</label>
                        <input type="text" name="ticketName"
                               value={this.state.name}
                               onChange={this.updateTicketName}
                        />
                    </div>


                    <div className={sc.formGroup}>
                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="description" cols="30" rows="10"
                                  value={this.state.description}
                                  onChange={this.updateTicketDescription}
                        />
                    </div>

                    <div className={sc.formGroup}>

                        <label htmlFor="urgency">Urgency</label>
                        <select name="urgency" id="urgency"
                                onChange={this.updateTicketUrgency}
                                value={this.state.urgency}
                        >
                            {
                                this.state.urgencies.map((item, index) => {
                                    return <option key={index} value={item.id}>{item.name}</option>
                                })}
                        </select>
                    </div>

                    <div className={sc.formGroup}>
                        <label htmlFor="desiredDate">Desired resolution date</label>
                        <input type="date" name="desiredDate"
                               onChange={this.updateTicketDesiredDate}
                        value={this.convertToDate(this.state.desiredResolutionDate)}
                        />
                    </div>

                    <div className={sc.formGroup}>
                        <label htmlFor="attachments">Add atachments</label>
                        <input type="file" name="attachments"
                               onChange={this.updateTicketAttachments}
                               multiple
                               accept=".pdf,.jpeg,.doc"
                        />
                    </div>

                    <div className={sc.formGroup}>
                        <label htmlFor="comment">Comment</label>
                        <textarea name="comment" id="comment" cols="30" rows="10"
                                  value={this.state.comment}
                                  onChange={this.updateTicketComment}
                        />
                    </div>

                    <div>
                        <button type="submit" onClick={this.setActionCreate}>Submit</button>
                    </div>

                    <div>
                        <button type="submit" onClick={this.setActionDraft}>Save as Draft</button>
                    </div>

                </form>
            </div>
        )
    }
}