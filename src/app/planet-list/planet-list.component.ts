import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-planet-list',
  standalone: true,
  imports: [RouterModule,CommonModule,HttpClientModule],
  providers:[CommonService],
  templateUrl: './planet-list.component.html',
  styleUrl: './planet-list.component.scss'
})
export class PlanetListComponent implements OnInit {
  planets: any = [];
  nextPage: string = '';
  previousPage: string = '';
  constructor(private swapiService: CommonService) { }

  ngOnInit(): void {
    this.fetchPlanets();
  }

  fetchPlanets(url?: string): void {
    this.swapiService.getAllPlanets(url).subscribe((data: any) => {
      this.planets = data.results;
      this.nextPage = data.next;
      this.previousPage = data.previous;
    });
  }

  goToNextPage(): void {
    this.fetchPlanets(this.nextPage);
  }
  goToPreviousPage(): void {
    this.fetchPlanets(this.previousPage);
  }
}
