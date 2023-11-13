import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit{

  public country?:Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesSerive: CountriesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.countriesSerive.searchCountryByAlpha(id))
    )
    .subscribe( country => {
      if (!country) return this.router.navigateByUrl(''); //si no encuentra el pais, redirecciona al home
      return this.country = country;
    });
  }

}
