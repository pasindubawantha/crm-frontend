import type { NextPage } from 'next'
import { ChangeEvent, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Select from "react-select";
import DatePicker from "react-datepicker";

import FilterStringInput from '../libs/components/filterStringInput'
import FilterAnyInput from '../libs/components/filterAnyInput'
import CustomerList from '../libs/components/customerList'
import LoadingScreen from '../libs/components/loadingScreen'

import Customer from '../libs/types/Customer'
import CustomersQueryInterface from '../libs/types/CustomersQueryInterface'

import customerStatusEnum from '../libs/types/enums/customerStatusEnum';

import "react-datepicker/dist/react-datepicker.css";

const GET_CUSTOMER_IDS = gql`
query getCustomers($customerQueryInput: CustomerInput) {
  getCustomers(input: $customerQueryInput) {
    _id
  }
}
`;

function useCustomersFiltersAndSortBy() {
  const [filters, _updateFilter] = useState<any>({})

  const updateFilter = (fieldName: string, value: any) => {
    _updateFilter((previousState: any) => {
      if(value === "") {
        let newState = {...previousState}
        delete newState[fieldName]
        return newState
      }
      
      if(Array.isArray(value) && value.length === 0) {
        let newState = {...previousState}
        delete newState[fieldName]
        return newState
      }

      return { 
        ...previousState,
        [fieldName]: value,
      }
      });
  };

  return {
    models: { filters },
    operations: { updateFilter },
  };
}


const Home: NextPage = () => {
  const [filterStartCreationDate, setFilterStartCreationDate] = useState<any>(null);
  const [filterEndCreationDate, setFilterEndCreationDate] = useState<any>(null);
  const { models, operations } = useCustomersFiltersAndSortBy();
  const { data, loading, error } = useQuery<CustomersQueryInterface>(GET_CUSTOMER_IDS, {
    variables: { customerQueryInput: 
      {
        filters: {},
        sort_by: []
      } 
    },
  });

  if (error) return <>error!</>;
  if (loading) return <LoadingScreen />;
  if (!data) return <>query data udefiend</>;

  const customerIDsOptionList = data.getCustomers.map((customer: Customer) => {
    return {value: customer._id, label: customer._id}
  })

  const statusOptionList = [
    {value: customerStatusEnum.ACTIVE, label: customerStatusEnum.ACTIVE},
    {value: customerStatusEnum.NON_ACTIVE, label: customerStatusEnum.NON_ACTIVE},
    {value: customerStatusEnum.LEAD, label: customerStatusEnum.LEAD},
  ]
  
  return(
    <div className="row">
      <div className="col-sm-3">
        <div className="card mb-4 rounded-3 shadow-sm p-0">
          <div className="card-header py-3">
              <h4 className="my-0 fw-normal">Search & Filter Customers</h4>
          </div>
          <div className="card-body">

            <FilterStringInput 
              value={models.filters.name} 
              label='Name' 
              onChange={(e: ChangeEvent<HTMLInputElement>) => {operations.updateFilter("name", e.target.value)}}
              placeHolder='Filter by name'
            />
            
            <FilterAnyInput label="Customer ID">
              <Select
                options={customerIDsOptionList}
                placeholder="Filter by IDs"
                  onChange={(data) => {
                    operations.updateFilter("_id", data.map((entry: any)=>{return entry.value}))
                  }}
                isSearchable={true}
                isMulti
              />
            </FilterAnyInput>

            <FilterStringInput 
              value={models.filters.email} 
              label='E-mail' 
              onChange={(e: ChangeEvent<HTMLInputElement>) => {operations.updateFilter("email", e.target.value)}}
              placeHolder='Filter by e-mail'
            />

            <FilterAnyInput label="Status">
              <Select
                  options={statusOptionList}
                  placeholder="Filter by Statuses"
                    onChange={(data) => {
                      operations.updateFilter("status", data.map((entry: any)=>{return entry.value}))
                    }}
                  isMulti
                />
            </FilterAnyInput>

            <FilterAnyInput label="Creation Date">
              <div className="input-group">
                <span className="input-group-text">From</span>
                <div className='form-control'>
                  <DatePicker
                    selected={filterStartCreationDate}
                    onChange={(date:Date)=> {
                      if(date) {
                        operations.updateFilter("creation_date_start", date.valueOf())
                      } else {
                        operations.updateFilter("creation_date_start", "")
                      }
                      setFilterStartCreationDate(date)
                    }}
                    showTimeInput
                    isClearable
                    placeholderText="Select start date time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="form-control"
                  />
                </div>
              </div>
              
              <div className="input-group">
                <span className="input-group-text">To</span>
                <div className='form-control'>
                  <DatePicker
                    selected={filterEndCreationDate}
                    onChange={(date:Date)=> {
                      if(date) {
                        operations.updateFilter("creation_date_end", date.valueOf())
                      } else {
                        operations.updateFilter("creation_date_end", "")
                      }
                      setFilterEndCreationDate(date)
                    }}
                    showTimeInput
                    isClearable
                    placeholderText="Select end date time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    className="form-control"
                  />
                </div>
              </div>
            </FilterAnyInput>
            
            <FilterStringInput 
              value={models.filters.mobile_number} 
              label='Mobile Number' 
              onChange={(e: ChangeEvent<HTMLInputElement>) => {operations.updateFilter("mobile_number", e.target.value)}}
              placeHolder='Filter by mobile number'
            />

            <FilterStringInput 
              value={models.filters.address} 
              label='Address' 
              onChange={(e: ChangeEvent<HTMLInputElement>) => {operations.updateFilter("address", e.target.value)}}
              placeHolder='Filter by address'
            />

          </div>
        </div>
      </div>

      <div className="col-sm-9">
        <CustomerList filters={models.filters} />
      </div>
    </div>

  )
}

export default Home
