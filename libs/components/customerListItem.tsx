import Link from 'next/link'
import CustomerStatus from './customerStatus'
import Customer from '../types/Customer'

interface CustomerListItemProps {
  customer: Customer
}

export default function CustomerListItem({ customer }: CustomerListItemProps) {
  const creation_date = new Date(customer.creation_date).toLocaleString('en-NZ')

  return (
    <tr>
      <td>
        <Link href={`/customer/${customer._id}`}>
          <div className="custom-tooltip">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-arrow-up-right-square-fill" viewBox="0 0 16 16">
              <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707z"/>
            </svg>

            <span className="custom-tooltiptext">Open {customer.name}'s profile</span>
          </div>
        </Link>
      </td>
      <td>
        {customer.name}
      </td>
      <td>
        <CustomerStatus status={customer.status}/>
      </td>
      <td>
        <a href={"tel:" + customer.mobile_number}>{customer.mobile_number}</a>
      </td>
      <td>
        <a href={"mailto:" + customer.email}>{customer.email}</a>
      </td>
      <td>
        {creation_date}
      </td>
      <td>
        {customer.address}
      </td>
      <td>
        {customer._id}
      </td>
    </tr>
  )
}
