export class TicketHistory {
    
    userID!: string;
    userName!: string;
    passengerDetails!: [
        {            
            name: string,
            gender: string,
            age: number,
            classType: string,
            optForMeal: string,
            seatNo: number
        }
    ];
    fromPlace!: string;
    toPlace!: string;
    doj!: Date;
    flightNumber!: string;   
}