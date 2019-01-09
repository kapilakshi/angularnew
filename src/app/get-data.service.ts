import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  name:any;
  link:any=[];
  private url: string = "http://10.11.198.208:9200/investopedia/_doc/_search?pretty";

  constructor(private http: HttpClient) { }

  getJson(){
    this.http.post(this.url, {
      "_source": {
                "includes": ["file.filename", "file.url", "_score" ]
            },
    "query": {
            "multi_match": {
          "fields":  [ "content"],
          "query":   this.name,
            "analyzer" : "synonym",
            "fuzziness": "auto",
          "slop": 10
            }
        },
        "highlight": {
          "order" : "score",
          "fragment_size" : 150,
            "fields" : {
                "content" : {}
            }
        }
    }
    )
    .subscribe(
      (data) => {
        this.link = data['hits']['hits'];
          console.log(data['hits']['hits']);
        
      }
     
    )
  }
}
