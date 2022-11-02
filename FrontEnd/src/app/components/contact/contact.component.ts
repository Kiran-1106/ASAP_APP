import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  private emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  // @ts-ignore
  contactMessage: string;

  constructor(private http: HttpClient,
              private fb: FormBuilder) {
    this.contactForm = fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      message: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  get formControls() {
    return this.contactForm.controls;
  }


  ngOnInit(): void {
  }

  contact() {

    if(this.contactForm.invalid) {
      return;
    }

    this.contactMessage = 'We will get back to you'
    this.contactForm.reset();
  }
}
