import OpportunityListItem from './opportunityListItem'

import Opportunity from '../types/Opportunity'

interface CustomerOpportunityListProps {
  opportunities: [Opportunity],
  customerName: string 
}

export default function CustomerOpportunityList({ opportunities, customerName }: CustomerOpportunityListProps) {

  return (
    <div className="card mb-4 mt-4 rounded-3 shadow-sm p-0">
        <div className="card-header py-3">
            <h4 className="my-0 fw-normal">Sales opportunities for {customerName}</h4>
        </div>
        <div className="card-body">
          <div className="table-responsive">
          <table className="table text-center">
            <thead>
              <tr>
                <th>Opportunity Name</th>
                <th>Opportunity Status</th>
              </tr>
            </thead>
            <tbody>
              {
                // Should be optimized using virtualization (windowing) https://react-window.vercel.app/#/examples/list/variable-size 
                opportunities.map((opportunity: Opportunity) => (
                  <OpportunityListItem key={opportunity._id} opportunity={opportunity}></OpportunityListItem>
                ))
              }
            </tbody>
          </table>
          </div>
        </div>
    </div>
  )

}
