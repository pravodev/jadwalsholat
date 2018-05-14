<template>
    <article>
        <dtitle title="Kontak - Jadwal Sholat"/>        
        <div class="content__title">
            Hubungi Kami
        </div>
        <div class="content__body container">
            <div class="contact__container">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label for="exampleInputEmail1">Name</label>
                            <input type="text" v-model="name" class="form-control" :class="errors['name'] && 'is-invalid'" aria-describedby="emailHelp" placeholder="Enter Full Name">
                            <div v-if="errors['name']" class="invalid-feedback">
                                {{errors['name'].message}}
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" v-model="email" class="form-control" :class="errors['email'] && 'is-invalid'" aria-describedby="emailHelp" placeholder="Enter email">
                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                            <div v-if="errors['email']" class="invalid-feedback">
                                {{errors['email'].message}}
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <label>Phone Number</label>
                            <input type="text" v-model="phone_number" class="form-control" :class="errors['phone_number'] && 'is-invalid'" aria-describedby="emailHelp" placeholder="Enter Phone Number">
                            <small id="emailHelp" class="form-text text-muted">We'll never share your phone number with anyone else.</small>
                            <div v-if="errors['phone_number']" class="invalid-feedback">
                                {{errors['phone_number'].message}}
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group is-invalid">
                            <label for="exampleFormControlTextarea1">Message</label>
                            <textarea v-model="message" class="form-control" :class="errors['message'] && 'is-invalid'" id="exampleFormControlTextarea1" rows="5"></textarea>
                            <div v-if="errors['message']" class="invalid-feedback">
                                {{errors['message'].message}}
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="">
                            <button class="btn btn-primary" @click="sendEmail">
                                - Kirim -
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </article>
</template>

<script>
import validator from '../../validator'
import _ from 'lodash';

const emailjs = require('emailjs-com')

emailjs.init("user_cJOHpnBO8NrenEyn1ZhcW")

export default {
    name: 'contact',
    data(){
        return {
            name: '',
            email: '',
            phone_number: '',
            message: '',
            errors: []
        }
    },
    watch: {
        name: val => {
            console.log('val: ', val);
            this.name = val
        },
        email: val => {
            this.email = val
        },
        phone_number: val => {
            this.phone_number = val
        },
        message: val => {
            this.message = val
        }
    },
    methods: {
        sendEmail(){
            const { name, email, phone_number, message } = this;
            const check = validator.validate({
                name, email, phone_number, message
            })

            if(_.isEmpty(check)){
                emailjs.send('contactjsholat', 'template_contact', {
                    from_name: this.name,
                    from_email: this.email,
                    phone_number: this.phone_number,
                    message: this.message
                })
            }
            this.errors = _.keyBy(check, 'path');
        }
    }
}
</script>
