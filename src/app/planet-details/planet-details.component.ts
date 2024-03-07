import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../services/common.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-planet-details',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  providers:[CommonService],
  templateUrl: './planet-details.component.html',
  styleUrl: './planet-details.component.scss'
})
export class PlanetDetailsComponent implements OnInit {
  planet: any;
  residents: any[] = []; // Initialize residents array

  constructor(private route: ActivatedRoute, private swapiService: CommonService) { }

  ngOnInit(): void {
    const id:any = this.route.snapshot.paramMap.get('id');
    this.swapiService.getPlanetDetails(id).subscribe((data: any) => {
      this.planet = data;
      this.getResidents();
    });
  }

  getResidents(): void {
    const residentPromises = this.planet.residents.map((residentUrl: string) => {
      return this.swapiService.getResidentDetails(residentUrl).toPromise(); // Convert to Promise
    });

    Promise.all(residentPromises).then((residents: any[]) => { // Specify the resolved type
      this.residents = residents;
    }).catch(error => {
      console.error('Error fetching resident details:', error);
    });
  }

}
