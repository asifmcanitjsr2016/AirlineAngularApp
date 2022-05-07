export interface Flights
{
    flightNumber: string,
      airline: string,
      price: number,
      toPlace: string,
      fromPlace: string,
      scheduledDays: string,
      startDateTime: Date,
      endDateTime: Date,
      instrumentUsed: string,
      totalBusinessClassSeat: number,
      totalNonBusinessClassSeat: number,
      airlineStatus: string,
      noOfRows: number,
      meal: any,
      Discounts:[
          {
              CouponCode: string,
              Amount: number,
              FlightDetailsFlightNumber: string
          }
      ]
  }