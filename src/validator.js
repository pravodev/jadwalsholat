import Schema from 'validate';

export default new Schema({
    name: {
        type: String,
        required: true,
        length: { min: 3 }
    },
    email: {
        type: String,
        required: true
    },
    phonenumber: {
        type: Number,
        length: { min: 10 }
    },
    message: {
        type: String,
        required: true
    }
})