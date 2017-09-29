import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AzureCognitiveEmotionProvider } from '../../providers/azure-cognitive-emotion/azure-cognitive-emotion';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public title = 'Emotion Recognition';
  public imageUrl: string;
  public persons: string;
  public setURLStatus: boolean = false;
  public getPersonEmotionStatus: boolean = false;

  public scores: any;

  constructor(
    private _azureCognitiveEmotionProvider: AzureCognitiveEmotionProvider,
    public navCtrl: NavController
  ) {
    this.imageUrl = '';
  }

  public getPersonEmotion(imageUrl:string): any {
    this._azureCognitiveEmotionProvider.getPersonEmotion(imageUrl).subscribe(
      (data: any) =>{
        console.log(data);
        this.scores = data[0].scores;
        this.getPersonEmotionStatus = true;
        this.persons = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  public setImage() {
    if(this.imageUrl !== ''){
      this.setURLStatus = true;
    }
  }

  public resetImage() {
    this.scores = null;
    this.persons = '';
    this.setURLStatus = false;
    this.getPersonEmotionStatus = false;
  }
}
