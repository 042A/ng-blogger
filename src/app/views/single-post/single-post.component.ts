import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router'


export interface Post { 
  post_title;
  post_desc;
  post_by;
  post_tags;
  post_image;
  post_content;
}

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
  
  postUid;
  title;
  desc;
  name;
  tags;
  image;
  htmlContent = '';

constructor ( private afs: AngularFirestore,  public router: Router, public route: ActivatedRoute ){}



  ngOnInit() {
    console.log('get the post');
    const storedUid = JSON.parse(localStorage.getItem('selectedPost'));
   
    const postDoc = this.afs.doc<Post>('db_posts/'+storedUid);
        const post = postDoc.valueChanges();
        post.subscribe(res=> { //converting oberv in array
            console.log('put post in da vars');
            this.title = res.post_title;
            this.desc = res.post_desc;
            this.name = res.post_by;
            this.tags = res.post_tags;
            this.image = res.post_image;
            this.htmlContent = res.post_content;
         });
        /* to dat */
  }

}
