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
            classType: string,
            optForMeal: string,
            seatNo: number
        }
    ],
    fromPlace: string,
    toPlace: string,
    doj: Date,
    flightNumber: string,
    appliedCoupon: string
}