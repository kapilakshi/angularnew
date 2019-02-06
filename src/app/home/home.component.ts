import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../get-data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public show : boolean = false;
  public searchText : string;
  nameinput:string;
  searchTerm: string;
  name:any;
  link:any=[];
  found:boolean;
  url:string;
  baseUrl = environment.baseUrl;
  path= environment.path;
  
  constructor(private http : HttpClient) { }
  updateSearch(e:any) {
    this.link = null;
    //this.url = "http://10.11.198.208:9200/investopedia/_doc/_search?pretty";
   // this.url = "http://ailab001.incedoinc.com:9200/investopedia/_doc/_search?pretty"
    this.url = this.baseUrl ;
    this.name = e.target.value;
    this.searchTerm = e.target.value;
    console.log(e.target.value);
    this.http.post(this.url,{
      "size":200,
      "_source": {
        
                  "includes": ["file.filename", "file.url", "_score","url" ]
              },
        "query": {
          "bool": {
            "must": [
              {
                "multi_match": {
            "fields":  ["title","description","sub_headings", "content"],
            "query":     this.name,
              "analyzer" : "synonym",
              "fuzziness": "auto",
              "prefix_length": 3,
            "slop": 5
              }
              }
            ],
            "should": [
              {
                "multi_match": {
            "fields":  [ "title^3","description^4","sub_headings^4","content"],
            "query":     this.name,
              "analyzer" : "no_synonym",
              "fuzziness": "auto",
              "prefix_length": 3,
            "slop": 5
              }
              }
            ]
      
          }
        },
        "highlight": {
            "order" : "score",
            "pre_tags" : ["<mark>"],
            "post_tags" : ["</mark>"],
            "fragment_size" : 180,
              "fields" : {
                  "content" : {}
              }
          }
      }
      
    )
    .subscribe(
      (data) => {
        this.link = data['hits']['hits'];
        console.log(this.link);
         
        }
        
        
    
     
    ) 
   
   /*  if(e.target.value)
    {
    this.show=true;
    }
    else{
      this.show=false;
    }
    console.log("inside updatesearch"+this.searchTerm);*/
    
  }
 
  ngOnInit() {
   
    console.log(this.name);
    }
    
  

}
