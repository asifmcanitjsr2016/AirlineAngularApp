export interface FlightsDetails{

        fromPlace: string,
        toPlace: string,
        flightNumber: string,
        flightName: string,
        price: number,
        journeyDate: Date,
        totalAvaiability: number,
        discounts: [
            {
                id: string,
                couponCode: string,
                amount: number,
                flightDetailsFlightNumber: string
            }
        ]
}