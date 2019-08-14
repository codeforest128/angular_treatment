import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class AutocompleteService {

    constructor(private http: HttpClient) {

    }

    getMedic(request) {
        return this.http.get(`${environment.apiEndpoint}/autocomp/medication/${request}`);
    }

    getPathology(request, type) {
        return this.http.get(`${environment.apiEndpoint}/autocomp/pathology/${type}/${request}`);
    }

    getDefaultPathologies(category) {
        return this.http.get(`${environment.apiEndpoint}/autocomp/defaultpathology/${category}`);
    }
}
