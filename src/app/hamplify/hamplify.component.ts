import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { environment } from '../../environments/environment';
import * as html2canvas from "html2canvas";

import {ImageService} from '../image.service';

@Component({
  selector: 'app-app-hamplify',
  templateUrl: './hamplify.component.html',
  styleUrls: ['./hamplify.component.css']
})

export class HamplifyComponent implements OnInit {
  authors = [
    { id: 'SociologPetrHam', name: 'Petr Hampl' },
    { id: 'PrezidentMluvci', name: 'Jiří Ovčáček' },
    { id: 'VaclavKlaus_ml', name: 'Václav Klaus ml.' },
    { id: 'konva333', name: 'Martin Konvička'},
    { id: 'lubomir_volny', name: 'Lubomír Volný'},
    { id: 'FalkonWN', name: 'Komodor'},
    { id: 'ehrindova', name: 'Eva Hrindová'},
  ];

  // { id: '', name: ''},

  author = 'SociologPetrHam';
  randomtweet = '';
  showTweet = false;
  showImage = false;

  tweetorigin = 'XXX';
  user_image = '';
  isImageLoading = false;
  user_image_data: any;
  user_name = '';
  tweetsdata;
  show_user_name = '';
  show_author = '';

  constructor(private http: HttpClient, private sanitization: DomSanitizer, private imageService: ImageService) { }

  private getRandom(arr, n) {
    const result = new Array(n);
    let len = arr.length;
    const taken = new Array(len);

    if (n > len) {
        throw new RangeError('getRandom: more elements taken than available');
    }
    while (n--) {
        const x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  ngOnInit() {

  }

  saveTweet() {
    const data = document.getElementById('tweet'); // { allowTaint: true }
    html2canvas(data, { allowTaint: true }).then(canvas => {
        this.showImage = true;
        document.getElementById("imagetosave").appendChild(canvas);
    });
  }

  searchcall(): void {
    interface TwResponse {
      success: boolean;
      data: Object;
      user_image: string;
      user_name: string;
    }

    const headers = new HttpHeaders();

    const searchterm = 'query=' + this.author;

    if (!this.author) {
      return;
    }

    headers.append('Content-Type', 'application/json');

    this.http.post<TwResponse>(environment.apiEndpoint, { query: this.author }, { headers: headers })
      .toPromise().then(
        (res) => {
          const localres = res;
          this.tweetsdata = localres.data;
          this.user_image = localres.user_image;
          this.user_name = localres.user_name;
          this.randomtweet = '';

          const newTa = this.getRandom(this.tweetsdata, 5);
          let newT = '';

          const baseT = 'https://twitter.com/status/id/';
          let newC = '';

          newTa.forEach(function(item) {
              newT += item.text;
              newT += ' ';

              if (newC.indexOf(item.id) === -1) {
                 newC += baseT + item.id + '\r\n';
              }


          });

          this.randomtweet = newT;
          this.tweetorigin = newC;
          this.show_author = this.author + '_hAmplified';
          this.show_user_name = this.user_name;
          this.getImageFromService(this.user_image);
     });
  }

  private getImageFromService(url: string) {
      this.isImageLoading = true;
      this.imageService.getImageBlob(url).subscribe(data => {
        this.createImageFromBlob(data);
        this.isImageLoading = false;
        this.showTweet = true;
      }, error => {
        this.isImageLoading = false;
      });
  }

  private createImageFromBlob(image: Blob) {
       let reader = new FileReader();
       reader.addEventListener("load", () => {
          this.user_image_data = reader.result;
       }, false);

       if (image) {
          reader.readAsDataURL(image);
       }
}

}
