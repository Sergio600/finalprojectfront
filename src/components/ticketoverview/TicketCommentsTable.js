import React from 'react';

export class TicketCommentsTable extends React.Component{
    render() {
        return (
            <div className="table-comments">
                <table>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>User</th>
                        <th>Comment</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr>
                        <td>Jan 18, 2017 12:16:57</td>
                        <td>Stephen King</td>
                        <td>Comment 1</td>
                    </tr>

                    <tr>
                        <td>Jan 19, 2017 15:13:57</td>
                        <td>Manager 1</td>
                        <td>Comment 2</td>
                    </tr>
                    </tbody>
                </table>
            </div>

    );
    }
    }