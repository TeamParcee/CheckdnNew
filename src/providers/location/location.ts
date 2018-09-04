import { Injectable } from '@angular/core';
import { DatabaseProvider } from '../database/database';
import { Storage } from '../../../node_modules/@ionic/storage';
import * as firebase from 'firebase';
import 'firebase/firestore';

declare var google;
@Injectable()
export class LocationProvider {

  constructor(
    private ls: Storage,
    private db: DatabaseProvider,
  ) {
    console.log('Hello LocationProvider Provider');
  }


  allUsers;

  async getCurrentLocation(){
    return new Promise(async(resolve, reject)=>{
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((result)=>{
          let location = {
            lat: result.coords.latitude,
            lng: result.coords.longitude,
            acc: result.coords.accuracy,
          }
          return resolve(location)
        })
      } else {
        return reject("Checkdn does not work with this brower")
      }
    
    })
  }

  async getDistanceMatrix(checkdnPlaces2){
    let userLocation:any = await this.getCurrentLocation();
    let userLatLng = await new google.maps.LatLng(userLocation.lat, userLocation.lng)
    let origins = []
    let placesLocation = [];


    let checkdnPlaces:any = await this.getObjsClose();
    var half_length = Math.ceil(checkdnPlaces.length / 2);    
    checkdnPlaces = checkdnPlaces.splice(0,half_length);

  checkdnPlaces.forEach(async (place)=>{
      placesLocation.push(place.address);
        origins.push(userLatLng)
    })
    
    return new Promise((resolve)=>{
      var service = new google.maps.DistanceMatrixService();
      let that = this;
      service.getDistanceMatrix(
        {
          origins: origins,
          destinations: placesLocation,
          travelMode: 'WALKING',
          unitSystem: google.maps.UnitSystem.IMPERIAL,
        }, callback);
        
      function callback(response, status) {
        let nearPlaces = [];
        let rows;
        if(response.rows[0]){
          rows = response.rows[0].elements;
        }
        if(rows){
          let i;
          
        for ( i = 0; i < rows.length; i++) {
          let distance = rows[i].distance;
          if(distance.value < 150){
            
            let place = {
              name:  checkdnPlaces[i].name,
              address: checkdnPlaces[i].address,
              placeid: checkdnPlaces[i].placeid,
            }
            nearPlaces.push(place);
            
          }   
        }
        
    }
      // nearPlaces.push(that.checkdnPlaces);
        nearPlaces.push(that.defaultCheckdn);
        nearPlaces.push(that.defaultCheckdn2);
        return resolve(nearPlaces)
     }
    })
  
  }

  async getObjsClose(){
    let currentLocation = await this.getCurrentLocation();
    let map = new google.maps.Map(document.getElementById('map'), {
      center: currentLocation,
      zoom: 20
    });
  
    let service =   new google.maps.places.PlacesService(map);
    return new Promise((res)=>{
      service.nearbySearch({
        location: currentLocation,
        // radius: '10',
        rankBy: google.maps.places.RankBy.DISTANCE,
        type: 'school',
      }, (response:any[])=>{
        let objs = [];
        response.forEach((obj)=>{
          let o = {
            name: obj.name,
            address: obj.vicinity,
            placeid: obj.place_id,
          }
          objs.push(o);
        })
        return res(objs);
      })
    })
  }
 
  defaultCheckdn =   {
    name: "Checkdn Support",
    address: "Checkdn HQ", 
    placeid: "666",
}
defaultCheckdn2 =   {
  name: "Checkdn Support 2",
  address: "Checkdn HQ", 
  placeid: "6667",
}


}
