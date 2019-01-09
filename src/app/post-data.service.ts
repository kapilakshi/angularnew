import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostDataService {

  constructor(private http: HttpClient) { }
  postRequest(searchTerm) {
    
    var body = {
      "_source": {
                "includes": ["file.filename", "file.url", "_score" ]
            },
    "query": {
            "multi_match": {
          "fields":  [ "content"],
          "query":     "What is the smallest unit of bitcoin",
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
    
    var api = 'http://10.11.198.208:9200/investopedia/_doc/_search?pretty';

    this.http
      .post(api,body).subscribe(data => {
              console.log(api);
        });
}
}
