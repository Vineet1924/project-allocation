import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginServiceService } from '../service/login-service.service';
import { ErrorMessageComponent } from '../../components/error-message/error-message.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  @ViewChild(ErrorMessageComponent)
  errorMessageComponent: ErrorMessageComponent;
  @ViewChild('lottieAnimation', { static: true })
  lottieAnimationContainer!: ElementRef;

  loginForm: FormGroup;
  customErrorMessage: string = '';
  loading: boolean = false;
  animation: any;
  public facultyId: string = '';
  constructor(
    private loginService: LoginServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  handleSubmit(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email').value;
      const password = this.loginForm.get('password').value;

      this.loginService
        .generateToken({ email: email, password: password })
        .subscribe(
          (response: any) => {
            console.log('Am i getting response');

            let id: any = 0;
            console.log('Response ' + response);
            console.log('TOKEN ' + response.jwtToken);
            console.log('ROLE ' + response.role);
            
            if (response.role === 'student') {
              this.router.navigate(['/student/home']);
            } else if (response.role === 'faculty') {
              this.facultyId = response.userName;
              this.router.navigate(['/faculty/home']);
            } else if (response.role === 'admin') {
              this.router.navigate(['/admin/home']);
            }
            this.loginService.login(response.jwtToken, response.role, email);
          },
          (error) => {
            console.log('ERROR');
            this.customErrorMessage = 'Email or password may be incorrect.';
            // this.errorMessageComponent.showErrorMessage();
          }
        );
    } else {
      if (this.loginForm.get('email').errors) {
        this.customErrorMessage = 'Email is required.';
      } else if (this.loginForm.get('password').errors) {
        this.customErrorMessage = 'Password is required.';
      } else {
        this.customErrorMessage = 'Email or password may be incorrect.';
      }

      // this.errorMessageComponent.showErrorMessage();
    }
  }
}
