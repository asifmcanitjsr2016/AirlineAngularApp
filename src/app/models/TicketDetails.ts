export interface TicketDetails {

    pnrNumber: string,
    userID: string,
    userName: string,
    passengerDetails: [
        {
            id: string,
            bookingHistoryPNRNumber: string,
            name: string,
            gender: string,
            age: number,            
            optForMeal: string,
            seatNo: number
        }
    ],
    fromPlace: string,
    toPlace: string,
    classType: string,
    doj: Date,
    flightNumber: string,
    appliedCoupon: string
}