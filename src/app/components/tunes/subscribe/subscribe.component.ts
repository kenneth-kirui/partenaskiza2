import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SendSMSService } from '../../../services/send-sms.service';
import { SubscribeService } from '../../../services/subscribe.service';


@Component({
  selector: 'app-subscribe',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './subscribe.component.html',
  styleUrl: './subscribe.component.css'
})
export class SubscribeComponent {
  constructor(private sendSms:SendSMSService, private subscribe:SubscribeService){}
  otp: string = "";
  isBtnActive: boolean = false;
  skiza_code: string = ''
  @Input() tune!: { id: number;  name:string}
  @Output() back = new EventEmitter<boolean>();
  
  subscribeForm = new FormGroup({
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^254[7-9][0-9]{8}$')]),
    code: new FormControl('',  [
      Validators.required,
      Validators.pattern('^[0-9]{4}$')
    ])
  });

  get phoneNumber() {
    return this.subscribeForm.get('phoneNumber')
  }

  get code() {
    return this.subscribeForm.get("code")
  }

  generateCode() {
    const phoneNumber = this.subscribeForm.get('phoneNumber')
    if (phoneNumber?.valid) {
      this.isBtnActive = true;
      alert(`Code has been sent to ${phoneNumber.value}`)
      this.sendSms.sendSms(phoneNumber.value as string).subscribe(
      response => {
         this.otp = response.message;
      },
      error => {
        console.error('Error sending SMS:', error);
      }
    );
    }
    
  }
  onSubmit() {
    if (this.subscribeForm.invalid) {
      this.subscribeForm.markAllAsTouched()
      return
    }
    if (this.otp === this.subscribeForm.get('code')?.value) {

      this.skiza_code = localStorage.getItem("skiza_code") || ''
      console.log(`Skiza: ${this.skiza_code}`)
      let phone_number = this.subscribeForm.get('phoneNumber')?.value as string;
       this.subscribe.subscribeTune(phone_number, this.skiza_code).subscribe(
      response => {
           const redirectURL = response.body.redirectURL;
           console.log(`Redirect link:${redirectURL}`)
        if (redirectURL) { 
          window.open(redirectURL, '_blank');
        } else {
          console.log(`The response: ${response.body}`)
          console.error('Redirect URL not found in response');
        }
      },
      error => {
        console.error('Error sending SMS:', error);
      }
       );
      
        
      } else {
        console.log("otp not matched")
      }
    
  }
  
}
