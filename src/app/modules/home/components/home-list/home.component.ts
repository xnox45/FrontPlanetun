import { HttpErrorResponse } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, catchError, takeUntil, throwError, timeout } from 'rxjs';

import { HomeService } from 'src/app/services/home.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeListComponent implements OnInit {
  public angForm: FormGroup;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  protected isLoading = false;

  public resultado: string[] = [];

  public isCollapsed: boolean = true;

  constructor(private router: Router, private homeService: HomeService, private fb: FormBuilder) {
    this.angForm = this.fb.group({
      numbers: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    if (value.startsWith(',')) {
      value = value.substring(1);
    }

    const filteredValue = value.replace(/[^\d,]|(?<=,)\D+/g, '');

    const normalizedValue = filteredValue.replace(/,+/g, (match, offset) => (offset >= 0 ? match : ''));

    this.angForm?.controls['numbers']?.setValue(normalizedValue);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  async pocessarDados() {
    if (!this.angForm.invalid) {
      this.isLoading = true;
      const data = this.angForm.getRawValue();
      const arrayDeNumeros: number[] = data.numbers.split(',').map(Number);
      this.homeService
        .ProcessarDados(arrayDeNumeros)
        .pipe(
          takeUntil(this.ngUnsubscribe),
          timeout(30000),
          catchError((error: any) => {
            return throwError(() => error);
          })
        )
        .subscribe({
          next: (res) => {
            this.resultado = res.objeto;
          },
          error: (err: HttpErrorResponse) => {
            if (err.message == 'Timeout has occurred')
              console.error(
                'Desculpe, ocorreu um problema temporário durante a solicitação. Por favor, tente novamente mais tarde.'
              );
            else console.error(err.message);
          },
          complete: () => {
            this.isLoading = false;
          },
        });
    }
    else {
      const numbersControl = this.angForm.get('numbers');
      if (numbersControl) {
        numbersControl.markAsTouched(); 
      }
    }
  }
}
