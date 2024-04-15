export class RefinementService {
    public refinePersonName() {
        return {
            refine: (value?: string | null) => {
                const regex = /^[A-Za-z]+(\s[A-Za-z]+){0,2}$/;
                return value !== null && value !== undefined && regex.test(value);
            },
            message: "Please enter a valid name"
        }
    }

    public refinePhoneNumber() {
        return {
            refine: (value?: string | null) => {
                // (123) 456 7899
                const regex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
                return value !== null && value !== undefined && regex.test(value);
            },
            message: "Please enter a valid phone number"
        }
    }
}
