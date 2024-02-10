import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LatLng, LatLngExpression, LatLngTuple, LeafletMouseEvent, Map, Marker, icon, map, marker, tileLayer } from 'leaflet';
import { Order } from '../../../shared/models/Order';
import { LocationService } from '../../../services/location.service';

@Component({
	selector: 'map',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './map.component.html',
	styleUrl: './map.component.css'
})
export class MapComponent {

	@Input()
	order!: Order;
	private readonly MARKER_ZOOM_LEVEL = 16;
	private readonly MARKER_ICON = icon({
		iconUrl:
			'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
		iconSize: [42, 42],
		iconAnchor: [21, 42],
	});
	private readonly DEFAULT_LATLNG: LatLngTuple = [13.75, 21.62];

	@ViewChild('map', { static: true })
	mapRef!: ElementRef;
	map!: Map;
	currentMarker!: Marker;
	
	

	constructor(private locationService: LocationService) { }

	ngOnInit(): void {

		this.initializeMap();
	}

	/** 
	 * Метод инициализации карты
	*/
	initializeMap() {

		if (this.map) return;

		this.map = map(this.mapRef.nativeElement, {

			attributionControl: false
		}).setView(this.DEFAULT_LATLNG, 1);

		tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);

		// добавим возможость установки положения маркера щелчком на определённой точке карты
		this.map.on('click', (e: LeafletMouseEvent) => {
			this.setMarker(e.latlng);
		})
	}

	findMyLocation() {
		this.locationService.getCurrentLocation().subscribe({
			next: (latlng) => {
				/* console.log(latlng); */
				this.map.setView(latlng, this.MARKER_ZOOM_LEVEL)
				this.setMarker(latlng)
			}
		})
	}

	setMarker(latlng: LatLngExpression) {
		this.addressLatLng = latlng as LatLng;
		if (this.currentMarker) {
			this.currentMarker.setLatLng(latlng);
			return;
		}

		this.currentMarker = marker(latlng, {
			draggable: true,
			icon: this.MARKER_ICON
		}).addTo(this.map);

		this.currentMarker.on('dragend', () => {
			this.addressLatLng = this.currentMarker.getLatLng();
		})
	}

	set addressLatLng(latlng: LatLng) {
		latlng.lat = parseFloat(latlng.lat.toFixed(8));
		latlng.lng = parseFloat(latlng.lng.toFixed(8));
		this.order.addressLatLng = latlng;
		console.log(this.order.addressLatLng);
	}
}
