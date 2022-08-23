import { useState } from 'react'
import { gql, useMutation } from '@apollo/client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";

import CustomerStatus from './customerStatus'
import Customer from '../types/Customer'
import customerStatusEnum from '../types/enums/customerStatusEnum';

export const UPDATE_CUSTOMER = gql`
  mutation Mutation($customerId: ID!, $updatedCustomer: updatedCustomer) {
    editCustomer(id: $customerId, updatedCustomer: $updatedCustomer) {
      _id
    }
  }
`;

interface CustomerProfileProps {
  customer: Customer
}

const formStatses = {
	READ_ONLY: "READ_ONLY",
	UPDATE: "UPDATE"
}

export default function CustomerProfile({ customer }: CustomerProfileProps) {
  const [formState, setFormState] = useState(formStatses.READ_ONLY)
  const [updatedCustomer, { loading }] = useMutation(UPDATE_CUSTOMER,
    {
      refetchQueries:['GetCustomer'],
      onCompleted: () => {
        setFormState(formStatses.READ_ONLY)
      },
      onError: () => {alert('Error on updating '+ customer.name +'\' status')}
    });

  const creation_date = new Date(customer.creation_date).toLocaleString('en-NZ')


  if(loading) return <>Updating customer status</>

  return (
    <>
    <h2 className="display-6 text-center mb-4">Customer Profile</h2>
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col">

                <h3>
                {customer.name}
                </h3>

                <dl className="row" >

                  <dt className="col-sm-3">Customer ID</dt>
                  <dd className="col-sm-9">{customer._id}</dd>

                  <dt className="col-sm-3">Status</dt>
                    {(formState == formStatses.READ_ONLY) && 
                      <dd className="col-sm-9">
                        <CustomerStatus status={customer.status}/> 
                        <button className="btn btn-outline-primary" type="button" 
                          onClick={()=>{setFormState(formStatses.UPDATE)}}>
                            Change
                        </button>
                      </dd>}

                    {(formState == formStatses.UPDATE) && 
                      <Formik
                        initialValues={{ status: customer.status }}
                        validationSchema={Yup.object().shape({
                          status: Yup.string().required("Required")
                        })}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                          
                          updatedCustomer({variables:{
                            customerId: customer._id,
                            updatedCustomer: {status: values.status}
                          }}).finally(()=>{
                            setFormState(formStatses.READ_ONLY)
                            resetForm()
                            setSubmitting(false)
                          });           

                        }}
                      >
                        {({ isSubmitting }) => (
                          <dd className="col-sm-9">
                            <Form>
                              <div className="input-group">
                                <div className="btn-group" role="group">
                    
                                  <Field name="status" as="select" className="form-control col-sm-6">
                                    <option value={customerStatusEnum.ACTIVE}>{customerStatusEnum.ACTIVE}</option>
                                    <option value={customerStatusEnum.NON_ACTIVE}>{customerStatusEnum.NON_ACTIVE}</option>
                                    <option value={customerStatusEnum.LEAD}>{customerStatusEnum.LEAD}</option>
                                  </Field>
                                  <ErrorMessage name="status" component="div" />
                        
                                  <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                                    Save
                                  </button>
                                  <button className="btn btn-danger" type="button"
                                    onClick={()=>{setFormState(formStatses.READ_ONLY)}}
                                  >
                                    Cancel
                                  </button>
                              
                                </div>
                              </div>
                            </Form>
                          </dd>
                        )}
                      </Formik>
                    }

                  <dt className="col-sm-3">Creation Date</dt>
                  <dd className="col-sm-9">{creation_date}</dd>
                </dl>

                <hr/>

                <h5>Contact Details</h5>

                <dl className="row" >
                  <dt className="col-sm-3">E-mail</dt>
                  <dd className="col-sm-9"><a href={"mailto:" + customer.email}>{customer.email}</a></dd>

                  <dt className="col-sm-3">Mobile Number</dt>
                  <dd className="col-sm-9"><a href={"tel:" + customer.mobile_number}>{customer.mobile_number}</a></dd>

                  <dt className="col-sm-3">Address</dt>
                  <dd className="col-sm-9">{customer.address}</dd>
                </dl>
          </div>
        </div>
      </div>
   </div>
   </>
  )

}
