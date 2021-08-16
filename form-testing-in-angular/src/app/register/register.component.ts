import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

interface Team {
  id: number;
  name: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  teamList: Team[] = [
    {
      id: 1,
      name: 'Red Team'
    },
    {
      id: 2,
      name: 'Blue Team'
    },
    {
      id: 3,
      name: 'Yellow Team'
    }
  ];

  registerForm = this.fb.group({
    username: [null, [Validators.required, Validators.maxLength(10)]],
    password: [null, [Validators.required]],
    gender: ['M'],
    email: [null, [Validators.required]],
    team: [null, [Validators.required]],
    subscription: [true]
  });

  constructor(private fb: FormBuilder) { }

  // Determine if the form is valid
  isFormValid(): boolean {
    return this.registerForm.valid;
  }

  submitForm(): void {
    if (!this.isFormValid()) {
      window.alert('Please fill in all fields before submitting the form!');
      return;
    }
    const body = this.registerForm.getRawValue();
    const msg =
    `Your Registration Information:

    Username: ${body.username}
    Password: ******
    E-mail: ${body.email}
    Gender: ${body.gender === 'M' ? 'Male' : 'Female'}
    Team: ${this.teamList.find(team => team.id === body.team).name}

    Subscription: ${body.subscription ? 'YES' : 'NO'}
    `;
    window.confirm(msg);
  }
}
