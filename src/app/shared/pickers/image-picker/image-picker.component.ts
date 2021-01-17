import { Platform } from '@ionic/angular';
import { Plugins, Capacitor, CameraSource, CameraResultType } from '@capacitor/core';
import { Component, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {
  @ViewChild('filePicker') filePickerRef: ElementRef<HTMLInputElement>;
  @Output() imagePick = new EventEmitter<string | File>();
  @Input() showPreview = false;
  selectedImage: string;
  usePicker = true;

  constructor(private platform: Platform) { }

  ngOnInit() {
    if (this.platform.is('mobile') || this.platform.is('desktop'))
  {
    this.usePicker = false;
  }
  }

  onPickImage() {
    if (!Capacitor.isPluginAvailable('Camera') || this.usePicker){
      this.filePickerRef.nativeElement.click();
      return;
    }

    Plugins.Camera.getPhoto({
    quality: 50,
    source: CameraSource.Prompt,
    correctOrientation: true,
    height: 320,
    width: 200,
    resultType: CameraResultType.DataUrl
  }).then(image => {
    this.selectedImage = image.dataUrl;
    this.imagePick.emit(image.dataUrl);
    // console.log(image.dataUrl);


  }).catch(error => {
    //  console.log('test: ', error);
    if (this.usePicker){
      this.filePickerRef.nativeElement.click();
    }
    return false;
  });
}
 onFileChosen(event: Event) {
   const pickedFile = (event.target as HTMLInputElement).files[0];
   if (!pickedFile) {
     return;
   }
   const fr = new FileReader();
   fr.onload = () => {
     const dataUrl = fr.result.toString();
     this.selectedImage = dataUrl;
     this.imagePick.emit(pickedFile);
    //  console.log('using file reader');
   };
   fr.readAsDataURL(pickedFile);
 }
}
