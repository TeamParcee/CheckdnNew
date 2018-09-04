import { Injectable } from '@angular/core';
import { ImageResizer, ImageResizerOptions } from '@ionic-native/image-resizer';


@Injectable()
export class ImageResizerProvider {

  constructor(
    private imageResizer: ImageResizer,
  ) {
  }


  
  resize(uri){
    console.log("made it here")
    let options = {
      uri: uri,
      quality: 100,
      width: 115,
      height: 115
     } as ImageResizerOptions;
     
     this.imageResizer
       .resize(options)
       .then((filePath: string) => console.log('FilePath', filePath))
       .catch(e => console.log(e));
  }
}
