import React from 'react'
import '../assets/css/w3.css'
import axios from 'axios'

class AdminLayout extends React.Component {
  state = {
    quotes: null,
  }
  componentDidMount() {
    axios.get('http://localhost:3001/quotes').then(res => {
      this.setState({ quotes: res.data })
    })
  }
  render() {
    const quotesData = this.state.quotes
    if (quotesData === null) return <div />
    return (
      <div className="col-md-12 admin-table">
        <table className="w3-table-all w3-card-4">
          <thead>
            <tr>
              <th>No</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Delivery ZipCode</th>
              <th>Subject</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {quotesData.map((quote, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{quote.name}</td>
                  <td>{quote.email}</td>
                  <td>{quote.phone}</td>
                  <td>{quote.zipcode}</td>
                  <td>{quote.subject}</td>
                  <td>{quote.message}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export default AdminLayout
