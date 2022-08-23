import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import Link from "next/link"
import { useQuery, gql } from "@apollo/client";

import CustomerProfile from '../../libs/components/customerProfile'
import CustomerOpportunityList from '../../libs/components/customerOpportunityList'
import NewOpportunityForm from '../../libs/components/newOpportunityForm'
import LoadingScreen from '../../libs/components/loadingScreen';

import Customer from '../../libs/types/Customer'

interface GetCustomerInterface {
  getCustomer : Customer
}

const GET_CUSTOMER = gql`
query GetCustomer($queryCustomerID: ID!) {
  getCustomer(id: $queryCustomerID) {
    _id
    status
    creation_date
    name
    email
    mobile_number
    address
    opportunities {
      _id
      name
      status
    }
  }
}
`;
const CustomerPage: NextPage = () => {
    const router = useRouter()
    const { id } = router.query

    const { data, loading, error } = useQuery<GetCustomerInterface>(GET_CUSTOMER, {
      variables: { queryCustomerID: id },
    });
  
    if (loading) return <LoadingScreen />;
    if (error) return <>error</>
    if (!data) return <>query data udefiend</>;

    return (
      <div className="row align-items-start">
        <div className='row'>
          <Link href="/">
            {/* <div > */}
              <div className="custom-tooltip" style={{width:'55px'}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-arrow-left-square-fill" viewBox="0 0 16 16">
                  <path d="M16 14a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12zm-4.5-6.5H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5a.5.5 0 0 0 0-1z"/>
                </svg>

                <span className="custom-tooltiptext">Go back to Customers page</span>

              </div>

            {/* </div> */}
          </Link>

          <CustomerProfile customer={data.getCustomer} />

        </div>

        <div className="row">

          <div className='col-sm-4'>
            <NewOpportunityForm customerID={data.getCustomer._id} />
          </div>
          
          <div className='col-sm-8'>
            <CustomerOpportunityList opportunities={data.getCustomer.opportunities} customerName={data.getCustomer.name} />
          </div>

        </div>
      </div>
    )

  }

export default CustomerPage
