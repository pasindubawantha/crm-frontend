import { useState } from "react";
import { gql, useMutation } from '@apollo/client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";

import OpportunityStatus from './opportunityStatus'

import Opportunity from '../types/Opportunity';

import oppotunityStatusEnum from '../types/enums/oppotunityStatusEnum';
import LoadingScreen from "./loadingScreen";

export const UPDATE_OPPORTUNITY = gql`
  mutation EditOpportunity($opportunityId: ID!, $updatedOpportunity: updatedOpportunity) {
    editOpportunity(id: $opportunityId, updatedOpportunity: $updatedOpportunity) {
      _id
    }
  }
`;

export const DELETE_OPPORTUNITY = gql`
  mutation DeleteOpportunity($deleteOpportunityId: ID!) {
  deleteOpportunity(id: $deleteOpportunityId) {
    _id
  }
}
`;

const formStatses = {
	READ_ONLY: "READ_ONLY",
	UPDATE: "UPDATE"
}

interface OpportunityListItemProps {
  opportunity: Opportunity
}

export default function OpportunityListItem({ opportunity }: OpportunityListItemProps) {
  const [formState, setFormState] = useState(formStatses.READ_ONLY)

  const [updatedOpportunity, { loading }] = useMutation(UPDATE_OPPORTUNITY,
  {
    refetchQueries:['GetCustomer'],
    onCompleted: () => {
      setFormState(formStatses.READ_ONLY)
    },
    onError: () => {alert('Failed to update opportunity ' + opportunity.name)}
  });

  const [deletedOpportunity, deleteOpportunityOperations] = useMutation(DELETE_OPPORTUNITY,
  {
    refetchQueries:['GetCustomer'],
    onCompleted: () => {
      setFormState(formStatses.READ_ONLY)
    },
    onError: () => {alert('Failed to update delete ' + opportunity.name)}
  });

  
  if (loading) return <>Updating opportunity  <LoadingScreen /></>
  if (deleteOpportunityOperations.loading) return <>Deleting opportunity {opportunity.name}  <LoadingScreen /></>

  if (formState === formStatses.READ_ONLY) {
    return (
      <tr>
        {/* <td>
          {opportunity._id}
        </td> */}
        <td>
          {opportunity.name}
        </td>
        <td>
          <OpportunityStatus status={opportunity.status} />        
        </td>
        <td>
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-outline-primary" 
              onClick={() => setFormState(formStatses.UPDATE)}
            >
              Edit
            </button>
            <button type="button" className="btn btn-outline-danger" 
              onClick={() => {
                deletedOpportunity({variables: {deleteOpportunityId: opportunity._id} })
              }}
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    )
  }

  return (
      <Formik
        initialValues={{ name: opportunity.name, status: opportunity.status }}
        validationSchema={Yup.object().shape({
          name: Yup.string().required("Required"),
          status: Yup.string().required("Required")
        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          updatedOpportunity({ variables: { 
            opportunityId: opportunity._id,  
            updatedOpportunity: { 
              name: values.name, 
              status: values.status
            }
          }}).finally(()=>{
            resetForm()
            setSubmitting(false)
          });   
        }}
      >
        {({ isSubmitting }) => (
          <tr>
            {/* <td>
              {opportunity._id}
            </td> */}
            <td>
              <Field type="text" name="name" form={'edit-form-' + opportunity._id} className="form-control"/>
              <ErrorMessage name="name" className="custom-invalid-feedback" component="div" />
            </td>
            <td>
              <Field name="status"  as="select"  form={'edit-form-' + opportunity._id} className="form-control">
                <option value={oppotunityStatusEnum.NEW}>{oppotunityStatusEnum.NEW}</option>
                <option value={oppotunityStatusEnum.CLOSED_WON}>{oppotunityStatusEnum.CLOSED_WON}</option>
                <option value={oppotunityStatusEnum.CLOSED_LOST}>{oppotunityStatusEnum.CLOSED_LOST}</option>
              </Field>
              <ErrorMessage name="status" className="custom-invalid-feedback" component="div" />
            </td>
            <td>
            <div className="btn-group" role="group">
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}  form={'edit-form-' + opportunity._id}>
                Save
              </button>
              <button type="button" className="btn btn-danger" disabled={isSubmitting} onClick={() => setFormState(formStatses.READ_ONLY)}>
                Cancel
              </button>
              </div>
              <Form id={'edit-form-' + opportunity._id}></Form>
            </td>
          </tr>
        )}
      </Formik>
  )
}