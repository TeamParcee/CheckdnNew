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

  async getDistanceMatrix(checkdnPlaces){
    let userLocation:any = await this.getCurrentLocation();
    let userLatLng = await new google.maps.LatLng(userLocation.lat, userLocation.lng)
    let origins = []
    let placesLocation = [];


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
        nearPlaces.push(that.defaultPlace);
        nearPlaces.push(that.defaultPlace2);
        return resolve(nearPlaces)
     }
    })
  
  }

  getCheckdnPlaces(){
    return new Promise((resolve)=>{
     return firebase.firestore().collection("checkdnPlaces").get().then(async(checkdnPlaceSnap)=>{
        let places = []
        checkdnPlaceSnap.forEach((place)=>{
          places.push(place.data())
        })
        let checkdnPlaces = await this.getDistanceMatrix(places);
        return resolve(checkdnPlaces)
      })
    })
    
  }
 defaultPlace = 
    {
      name: "Checkdn Support",
      address: "Checkdn HQ", 
      placeid: "666"
    }
  
  defaultPlace2 = 
    {
      name: "Checkdn Support",
      address: "Checkdn HQ", 
      placeid: "777"
    }
  
}
