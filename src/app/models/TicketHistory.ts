export class TicketHistory {
    
    userID!: string;
    userName!: string;
    passengerDetails!: [
        {            
            name: string,
            gender: string,
            age: number,            
            optForMeal: string,
            seatNo: number
        }
    ];
    fromPlace!: string;
    toPlace!: string;
    classType!: string;
    doj!: Date;
    flightNumber!: string;   
}