import CustomerListItem from './customerListItem'
import { useQuery, gql } from "@apollo/client";
import { useState } from 'react'

import SortButton from './sortButton';
import LoadingScreen from './loadingScreen';

import Customer from '../types/Customer'
import CustomersQueryInterface from '../types/CustomersQueryInterface'

const GET_CUSTOMERS = gql`
query getCustomers($customerQueryInput: CustomerInput) {
  getCustomers(input: $customerQueryInput) {
    _id
    creation_date
    status
    name
    email
    mobile_number
    address
  }
}
`;

interface CustomerListProps {
  filters: any
}

export default function CustomerList({ filters }: CustomerListProps) {
  const [sortBy, setSortBy] = useState<any>([])

  const { data, loading, error } = useQuery<CustomersQueryInterface>(GET_CUSTOMERS, {
    variables: { customerQueryInput: 
      {
        filters: filters,
        sort_by: sortBy
      } 
    },
  });

  if (loading) return <LoadingScreen />;
  if (error) return <>error</>
  if (!data) return <>query data udefiend</>;

  return (
    <>
      <h2 className="display-6 text-center mb-4">Customers</h2>
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table text-center">
              <thead>
                <tr>
                  <th />
                  <th>Name <SortButton sortByArray={sortBy} onClick={setSortBy} field={'name'} fieldLabel="name"/></th>
                  <th>Status <SortButton sortByArray={sortBy} onClick={setSortBy} field={'status'} fieldLabel="status"/></th>
                  <th>Mobile Number <SortButton sortByArray={sortBy} onClick={setSortBy} field={'mobile_number'} fieldLabel="mobile number"/></th>
                  <th>E-mail <SortButton sortByArray={sortBy} onClick={setSortBy} field={'email'} fieldLabel="e-mail"/></th>
                  <th>Creation Date <SortButton sortByArray={sortBy} onClick={setSortBy} field={'creation_date'} fieldLabel="creation date"/></th>
                  <th>Address <SortButton sortByArray={sortBy} onClick={setSortBy} field={'address'} fieldLabel="address"/></th>
                  <th>Customer ID <SortButton sortByArray={sortBy} onClick={setSortBy} field={'_id'} fieldLabel="customer id"/></th>
                </tr>
              </thead>
              <tbody>
                {
                  // Should be optimized using virtualization (windowing) https://react-window.vercel.app/#/examples/list/variable-size 
                  data.getCustomers.map((customer : Customer) => (
                    <CustomerListItem key={customer._id} customer={customer}></CustomerListItem>
                  ))          
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )

}
