import React from 'react';

export class TicketHistoryTable extends React.Component{


    render() {
        return (

            <div className='table-history'>
                <table>
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>User</th>
                        <th>Action</th>
                        <th>Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Jan 18, 2017 12:16:57</td>
                        <td>Stephen King</td>
                        <td>Ticked is created</td>
                        <td>Ticked is created</td>
                    </tr>

                    <tr>
                        <td>Jan 19, 2017 15:13:57</td>
                        <td>Stephen King</td>
                        <td>Ticked is edited</td>
                        <td>Ticked is edited</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}