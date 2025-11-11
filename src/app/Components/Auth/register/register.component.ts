import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { ApiService } from 'src/app/Services/api.service';
import { AuthService } from 'src/app/Services/Auth/auth.service';
import { TokenService } from 'src/app/Services/token.service';


type PasswordPolicy = {
  requireDigit: boolean;
  requireLowercase: boolean;
  requireUppercase: boolean;
  requireNonAlphanumeric: boolean;
  requiredLength: number;
  // RequiredUniqueChars = 1 في السيرفر (شرط بديهي)، فمش هنضيفه هنا
};

function passwordPolicyValidator(policy: PasswordPolicy): ValidatorFn {
  return (control: AbstractControl) => {
    const value = (control.value || '') as string;

    const hasMinLength = value.length >= policy.requiredLength;
    const hasDigit = /\d/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasNonAlnum = /[^a-zA-Z0-9]/.test(value);

    // نجمع الأخطاء فقط لو الشرط مطلوب ومش متحقق
    const errors: Record<string, boolean> = {};
    if (policy.requireDigit && !hasDigit) errors['requireDigit'] = true;
    if (policy.requireLowercase && !hasLower) errors['requireLowercase'] = true;
    if (policy.requireUppercase && !hasUpper) errors['requireUppercase'] = true;
    if (policy.requireNonAlphanumeric && !hasNonAlnum) errors['requireNonAlphanumeric'] = true;
    if (!hasMinLength) errors['minLengthPolicy'] = true;

    return Object.keys(errors).length ? errors : null;
  };
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  showPwd = false; // 👈 علشان زرار Show/Hide يشتغل

  errorMessage = '';
  successMessage = '';

  // نفس إعدادات السيرفر:
  private passwordPolicy: PasswordPolicy = {
    requireDigit: true,
    requireLowercase: true,
    requireUppercase: true,
    requireNonAlphanumeric: true,
    requiredLength: 8
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService,

  ) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.email,
        (c: any) => c.value?.toLowerCase().endsWith('@gmail.com') ? null : { gmailOnly: true }
      ]],
      password: [
        '',
        [
          Validators.required,
          passwordPolicyValidator(this.passwordPolicy)
        ]
      ]
    });
  }

  ngOnInit() {
    // this.loadings.hideNow();
    // this.seoService.updateTitleAndDescription(
    //   `Register | Bubble Hope`,
    //   `Bubble Hope - نكهة مميزة ومحبوبة في فرع حدائق الأهرام.`
    // );
  }

  // حالات الشيك ليست (علشان الواجهة)
  get pwd() {
    return this.registerForm.get('password');
  }
  get pwdVal(): string {
    return (this.pwd?.value || '') as string;
  }
  get rule_hasMinLength() { return this.pwdVal.length >= this.passwordPolicy.requiredLength; }
  get rule_hasDigit() { return /\d/.test(this.pwdVal); }
  get rule_hasLower() { return /[a-z]/.test(this.pwdVal); }
  get rule_hasUpper() { return /[A-Z]/.test(this.pwdVal); }
  get rule_hasNonAlnum() { return /[^a-zA-Z0-9]/.test(this.pwdVal); }

  onSubmit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.registerForm.invalid) {
      this.errorMessage = 'Please fill out all fields correctly';
      this.registerForm.markAllAsTouched();
      return;
    }

    const data = this.registerForm.value;
    this.loading = true;

    this.authService.register(data)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (res) => {
          if (res?.success && res?.needEmailConfirmation) {
            this.successMessage =
              res.messageAr || res.message || 'تم التسجيل بنجاح. من فضلك أكّدي بريدك الإلكتروني من الرسالة المرسلة.';
            setTimeout(() => this.router.navigate(['/auth/login']), 2000);
            return;
          }

          if (res?.token) {
            this.tokenService.storeEncryptedToken(res.token);
            localStorage.setItem('fullName', data.fullName);
            this.router.navigate(['/']);
            return;
          }

          this.successMessage =
            res?.messageAr || res?.message || 'تم التسجيل بنجاح، برجاء تسجيل الدخول.';
          setTimeout(() => this.router.navigate(['/auth/login']), 1500);
        },
        error: (err) => {
          if (err?.error?.errors) {
            const all = (Object.values(err.error.errors).flat() as string[]);
            this.errorMessage = all?.[0] || 'Registration failed, please try again';
            return;
          }
          this.errorMessage =
            err?.error?.messageAr || err?.error?.message || 'Registration failed, please try again';
        }
      });
  }
}
