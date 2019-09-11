import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'notFound',
  templateUrl: './notFound.component.html',
  styleUrls: ['./notFound.component.sass']
})

export class NotFoundComponent {

  constructor( private router : Router ) { }

  backToLogin(){ this.router.navigate(['/login']); }

}
