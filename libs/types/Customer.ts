import Opportunity from "./Opportunity"

export default interface Customer {
    _id: string
    status: string,
    creation_date: number,
    name: string,
    email: string,
    mobile_number: string,
    address: string
    opportunities: [Opportunity]

}