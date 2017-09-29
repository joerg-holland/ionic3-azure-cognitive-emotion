# Tutorial
Ionic-Azure-Cognitive-Emotion Template

Last Update: 27. September 2017

## How to create this template?

1. Open the folder where the project should be created and run the command below. 
If you are in folder 'c:\projects\' the folder 'c:\projects\ionic-azure-cognitive-emotion' will be created with all necessary files of the ionic project.
  ```bash
  $ ionic start ionic-azure-cognitive-emotion blank
  ```
2. Open the folder, which you created the step before and run the command below.
If everything was installed successfully a web browser will be open and show you the Ionic blank page of the project.
  ```bash
  $ ionic serve
  ```
3. Create the folder '/src/environments':
  ```bash
  /src/environments/
  ```
4. Add the file '/src/environments/environment.ts' with your Azure credentials to the folder '/src/environments':
  ```ts
  export const environment = {
    production: false,
    azure: {
      apiKey: "yourApiKey"
    }
  };
  ```
5. Create the folder '/src/providers/':
  ```bash
  /src/providers/
  ```
6. Create the folder '/src/providers/azure-cognitive-emotion':
  ```bash
  /src/providers/azure-cognitive-emotion/
  ```
7. Add the file '/src/providers/azure-cognitive-emotion/azure-cognitive-emotion.ts':
  ```ts
  import { Injectable } from '@angular/core';
  import { Http, Headers, RequestOptions } from '@angular/http';
  import { environment } from '../../environments/environment';
  import 'rxjs/add/operator/map';
  import 'rxjs/add/operator/do';
  
  @Injectable()
  export class AzureCognitiveEmotionProvider {
  
    private _url: string = 'https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize';
  
    constructor(
      private _http: Http
    ) {}
  
    public getPersonEmotion(imageUrl: string){
  
      const headers = new Headers({
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': environment.azure.apiKey
      });
      const options = new RequestOptions({ headers });
  
      return this._http.post(this._url, { url: imageUrl }, options)
        .map(data => data.json())
        .do(result => console.log(result));
    }
  }
  ```
8. Add the service 'HttpModule' to the app's module /src/app/app.module.ts':
  ```ts
  import { HttpModule } from '@angular/http';
  imports: [ ... HttpModule ... ]
  ```
9. Add the service 'azure-cognitive-emotion' to the app's module /src/app/app.module.ts':
  ```ts
  import { AzureCognitiveEmotionProvider } from '../providers/azure-cognitive-emotion/azure-cognitive-emotion';
  providers: [ ... AzureCognitiveEmotionProvider ... ]
  ```
10. Add the following code to the component '/src/pages/home/home.ts'
  ```ts
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
  ```
11. Add the following code to the page '/src/pages/home/home.html'
  ```html
  <ion-content padding>
    <h2>{{title}}</h2>
    <ion-item>
      <ion-label>URL of image</ion-label>
      <ion-input floating type="text" [(ngModel)]="imageUrl"></ion-input>
    </ion-item>
    <button ion-button *ngIf="!setURLStatus" (click)="setImage()">Set Image</button>
    <button ion-button *ngIf="getPersonEmotionStatus" (click)="resetImage()">Reset Image</button>
    <ion-item *ngIf="setURLStatus">
      <img [src]="imageUrl" height="300"/>
    </ion-item>
    <button ion-button *ngIf="setURLStatus && !getPersonEmotionStatus" (click)="getPersonEmotion(imageUrl)">Get Person Emotion</button>
    <!-- Result -->
    <h2 *ngIf="getPersonEmotionStatus">Emotion:</h2>
    <ion-list *ngIf="scores">
      <ion-item>
        <h2>{{scores.anger}}</h2>
        <p>Anger</p>
      </ion-item>
      <ion-item>
        <h2>{{scores.contempt}}</h2>
        <p>Contempt</p>
      </ion-item>
      <ion-item>
        <h2>{{scores.disgust}}</h2>
        <p>Disgust</p>
      </ion-item>
      <ion-item>
        <h2>{{scores.fear}}</h2>
        <p>Fear</p>
      </ion-item>
      <ion-item>
        <h2>{{scores.happiness}}</h2>
        <p>Happiness</p>
      </ion-item>
      <ion-item>
        <h2>{{scores.neutral}}</h2>
        <p>Neutral</p>
      </ion-item>
      <ion-item>
        <h2>{{scores.sadness}}</h2>
        <p>Sadness</p>
      </ion-item>
      <ion-item>
        <h2>{{scores.surprise}}</h2>
        <p>Surprise</p>
      </ion-item>
    </ion-list>
    <!-- Details -->
    <p *ngIf="persons">{{persons | json}}</p>
  </ion-content>
  ```
12. Build the project:
  ```bash
  $ npm run build
  ```
