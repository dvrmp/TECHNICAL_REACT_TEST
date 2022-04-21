export default class RandomAttribute {

    public static instance: RandomAttribute;

    public static getInstance(): RandomAttribute {

        if (this.instance === null) {
            this.instance = new RandomAttribute();
            return this.instance;
        }
    }

    private static generateRandomInt(max: number, min: number): number {
        return Math.floor(Math.random() * (Math.ceil(max) - Math.floor(min) + 1));
    }

    public static generateJob(): string {
        const availiablesJobs = ['Doctor', 'RRHH', 'Teacher', 'Programmer', 'Boxer'];
        return availiablesJobs[this.generateRandomInt(availiablesJobs.length, 1)];
    }

    public static generateCreatedAt(): string {
        return new Date(2022, this.generateRandomInt(12, 1)).toDateString();
    }

    private constructor() { }
}