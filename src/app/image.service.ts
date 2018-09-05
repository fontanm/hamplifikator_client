import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  getImageBlob(imageUrl: string): Observable<Blob> {
        return this.http.get(imageUrl, { responseType: "blob"});
    }
}

