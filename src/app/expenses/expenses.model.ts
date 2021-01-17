export class Expense {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public cost: number,
        public imageLoc: string,
        public expenseDate: Date,
        public userId: string
        ) {}

}
