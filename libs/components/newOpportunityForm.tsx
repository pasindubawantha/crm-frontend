import { Formik, Form, Field, ErrorMessage } from 'formik';
import { gql, useMutation } from '@apollo/client';
import * as Yup from "yup";
import LoadingScreen from './loadingScreen';

import oppotunityStatusEnum from '../types/enums/oppotunityStatusEnum'

export const CREATE_OPPORTUNITY = gql`
  mutation CreateOpportunity($status: OpportunityStatus!, $name: String!, $customerId: String!) {
  createOpportunity(status: $status, name: $name, customer_id: $customerId) {
    _id
  }
}
`;

interface NewOpportunityFormProps {
  customerID: string
}

export default function NewOpportunityForm({ customerID }: NewOpportunityFormProps) {

  const [createOpportunity, { loading }] = useMutation(CREATE_OPPORTUNITY,
  {
    refetchQueries:['GetCustomer'],
    onCompleted: () => {
      console.log('Added new opportunity')
    },
    onError: () => {alert('Error adding new opportunity')}

  });

  if (loading) return (<>
    Adding new opportunity 
    <LoadingScreen />
    </>)

  return (
    <div className='row'>
      <div className="card mb-4 mt-4 rounded-3 shadow-sm p-0">
        <div className="card-header py-3">
            <h4 className="my-0 fw-normal">Add new opportunity</h4>
        </div>
        <div className="card-body">
          <Formik
            initialValues={{ customerID: customerID, name: '', status: 'NEW' }}
            validationSchema={Yup.object().shape({
              name: Yup.string().required("Required"),
              status: Yup.string().required("Required"),
              customerID: Yup.string().required("Required")
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              createOpportunity({variables:{
                status: values.status,
                name: values.name,
                customerId: values.customerID
              }}).finally(()=>{
                resetForm()
                setSubmitting(false)
              });                
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className='col-12'>
                  <label className="form-label">Customer ID</label>
                  <Field type="text" name="customerID" disabled={true} className="form-control"/>
                </div>
                <div className='col-12'>
                  <label className="form-label">Opportunity Name</label>
                  <Field type="text" name="name" className="form-control"/>
                  <ErrorMessage name="name"  className="custom-invalid-feedback" component="div" />
                </div>
                <div className='col-12'>
                  <label className="form-label">Opportunity Status</label>
                  <Field name="status"  as="select" className="form-control">
                    <option value={oppotunityStatusEnum.NEW}>{oppotunityStatusEnum.NEW}</option>
                    <option value={oppotunityStatusEnum.CLOSED_WON}>{oppotunityStatusEnum.CLOSED_WON}</option>
                    <option value={oppotunityStatusEnum.CLOSED_LOST}>{oppotunityStatusEnum.CLOSED_LOST}</option>
                  </Field>
                  <ErrorMessage name="status" className="custom-invalid-feedback" component="div" />
                </div>
                <div className='col-12'>
                  <button className="btn btn-primary form-control mt-2" type="submit" disabled={isSubmitting}>
                    Add Opportunity
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}
